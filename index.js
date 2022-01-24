const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const axios = require('axios')

const config = require('./config/key')

const { Summoner } = require("./models/Summoner")

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

//riot 서버에서 소환사 정보 갱신받기
app.post('/updateSummoner', (req, res) => {
  //영문, 숫자 이외의 문자를 uri로 받기 위해 uft8로 인코딩
  const uri = `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${req.body.name}`
  const encoded = encodeURI(uri)

  //Riot API를 사용하여 소환사 이름으로 검색해서 소환사 정보 가져오기
  riotAxios.get(encoded)
  .then(axiosRes => {
    const summoner = new Summoner(axiosRes.data)

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
      if (err) return res.json({ success: false, err })
      return res.status(200).send({
        success: true
      })
    });
  })
  .catch(err => {
    if(err.hasOwnProperty('response')) {
      if(err.response.hasOwnProperty('status')) {
        return res.status(err.response.status).json(err.response.data)
      }
    }
    else
    return res.send(err)
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})