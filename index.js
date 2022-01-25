const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const axios = require('axios')

const config = require('./config/key')

const { Summoner } = require("./models/Summoner")
const { LeagueEntry } = require("./models/LeagueEntry")
const { Match } = require("./models/Match")

var matchList = new Array()

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}))
//application/json
app.use(bodyParser.json());

//riot api로 데이터를 받을 axios
const riotAxios = axios.create({
  headers: {
    'X-Riot-Token': config.riotAPIKey
  }
})

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true
}).then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//riot 서버에서 소환사 정보, 전적 갱신받기
app.post('/updateSummoner', async (req, res) => {

  console.log('')
  console.log('-----------------')
  console.log('Updating Summoner')
  console.log('-----------------')

  //영문, 숫자 이외의 문자를 uri로 받기 위해 uft8로 인코딩
  const summonerURI = `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${req.body.name}`
  const encodedSummoner = encodeURI(summonerURI)

  var id
  var puuid
  var matchList = new Array()
  
  //Riot API를 사용하여 소환사 이름으로 검색해서 소환사 정보 가져오기
  await riotAxios.get(encodedSummoner)
  .then(axiosRes => {

    const summoner = new Summoner(axiosRes.data)
    id = summoner.id
    puuid = summoner.puuid

    //summoner가 새로운 Summoner document이므로
    //findOneAndUpdate에 수정 파라미터로 summoner을 넣을경우 _id도 변경하려 시도해서
    //code: 66 ImmutableField가 발생한다
    var summoner_updated = JSON.parse(JSON.stringify(summoner))
    //_id를 제거하기위해 summoner를 스트링으로 변환하고 다시 JSON으로 변환한뒤 _id를 지우는 꼼수
    delete summoner_updated._id

    Summoner.findOneAndUpdate({ accountId: summoner.accountId }, summoner_updated, {
      upsert: true, //없으면 생성
      overwrite: true //기존 다큐먼트 덮어쓰기
    }, (err, doc) => {
      if (err) return res.json({ 'Summoner success': false, err })
    });
    console.log('Summoner success : true')

  })
  .catch(err => {
    if(err.hasOwnProperty('response')) {
      if(err.response.hasOwnProperty('status')) {
        console.log(err.response.status)
        console.log(err.response.data)
      }
      else return console.log(err)
    }
    else
    return console.log(err)
  })

  //LeagueEntry 받아오기
  riotAxios.get(`https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}`)
  .then(entryRes => {//json 배열로 값이 넘어옴
    if(entryRes.data.length !== 0) {
      entryRes.data.forEach(element => {

        var leagueEntry = new LeagueEntry(element)
        var leagueEntry_updated = JSON.parse(JSON.stringify(leagueEntry))
        delete leagueEntry_updated._id

        LeagueEntry.findOneAndUpdate({ summonerId: id, queueType: leagueEntry_updated.queueType }, leagueEntry_updated, {
          upsert: true,
          overwrite: true
        }, (err, doc) => {
          if (err) return res.json({ 'LeagueEntry success': false, err })
        })

      });
      console.log('LeagueEntry success : true')
    }
    else {
      console.log('LeagueEntry success : Unranked')
    }
    
  })
  .catch(err => {
    if(err.hasOwnProperty('response')) {
      if(err.response.hasOwnProperty('status')) {
        console.log(err.response.status)
        console.log(err.response.data)
      }
      else return console.log(err)
    }
    else
    return console.log(err)
  })

  //MatchList 받기 start = 0, count = 100 (0<100, def = 20)
  await riotAxios.get(`https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=20`)
  .then(listRes => {
    matchList = listRes.data
    console.log('matchList success : true')

    //return res.status(200).json({ success: true })

  })
  .catch(err => {
    if(err.hasOwnProperty('response')) {
      if(err.response.hasOwnProperty('status')) {
        console.log(err.response.status)
        console.log(err.response.data)
      }
      else return console.log(err)
    }
    else
    return console.log(err)
  })

  //전적 받아오기
  matchList.forEach((element, index, array) => {
    riotAxios.get(`https://asia.api.riotgames.com/lol/match/v5/matches/${element}`)
    .then(matchRes => {

      const match = new Match(matchRes.data)
      var match_updated = JSON.parse(JSON.stringify(match))
      delete match_updated._id

      Match.findOneAndReplace({ 'metadata.matchId': match.metadata.matchId }, match_updated, {
        upsert: true
      }, (err, doc) => {
        if (err) {
          const temp = `${index} th match success : false`
          console.log(temp)
          console.log(err)
        }
        else {
          const temp = `${index} th match success : true`
          console.log(temp)
        }
      })

    })
    .catch(err => {
      if(err.hasOwnProperty('response')) {
        if(err.response.hasOwnProperty('status')) {
          console.log(err.response.status)
          console.log(err.response.data)
        }
        else return console.log(err)
      }
      else
      return console.log(err)
    })
  })

  return res.status(200).json({ success: true })
})

//riot 서버에서 인게임 정보 받기
app.get('/inGameInfo', (req, res) => {

  const summonerIdURI = `https://kr.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${req.body.id}`
  const encodedSummonerId = encodeURI(summonerIdURI)

  riotAxios.get(encodedSummonerId)
  .then(inGameRes => {
    return res.status(200).json(inGameRes.data)
  })
  .catch(err => {
    if(err.hasOwnProperty('response')) {
      if(err.response.hasOwnProperty('status')) {
        return res.status(err.response.status).json(err.response.data)
      }
      else return res.send(err)
    }
    else
    return res.send(err)
  })

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})