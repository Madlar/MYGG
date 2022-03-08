import { useState, useEffect } from 'react';
import { Tabs, Button } from 'antd'
import { useLocation } from 'react-router-dom';
import axios from 'axios'

import LeagueEntry from './LeagueEntry';
import Record from './Record';
import NoRecord from './NoRecord';
import Loading from './Loading';

const config = require('../../../config')
const { TabPane } = Tabs;

function SummonerPage(props) {

  const count = 20 //한번에 표시할 전적 수

  const summoner = props.summoner
  const name = useLocation().pathname.split('=').reverse()[0]
  const [soloRank, setSoloRank] = useState(-1)
  const [flexRank, setFlexRank] = useState(-1)
  const [records, setRecords] = useState(<Loading />)
  const [pivot, setPivot] = useState(0)
  const [initialLoading, setInitialLoading] = useState(true)
  const [moreLoading, setMoreLoading] = useState(false)
  const [recordList, setRecordList] = useState([])
  const [updateLoading, setUpdateLoading] = useState(false)

  const onUpdateHandler = (event) => {
    setUpdateLoading(true)
    let body = {
      name: name
    }
    axios.post('/api/updateSummoner', body)
      .then(res => {
        window.location.reload()
      })
      .catch(err => {
        console.log(err.response.data)
      })
  }

  const onLoadMore = (event) => {
    setMoreLoading(true)
    setPivot(pivot+count)
  }

  useEffect(() => {
    axios.get(`/api/getLeagueEntry?name=${summoner.name}`).then(res => {
      var soloTemp = 'UNRANKED'
      var flexTemp = 'UNRANKED'
      
      for (let i of res.data) {
        if (i.queueType == 'RANKED_SOLO_5x5') {
          soloTemp = i
        }
        else if (i.queueType == 'RANKED_FLEX_SR') {
          flexTemp = i
        }
      }
      setSoloRank(soloTemp)
      setFlexRank(flexTemp)
    })

  }, [])

  useEffect(() => {
    if(initialLoading) {
      setInitialLoading(false)
      axios.get(`/api/getMatch?name=${summoner.name}&start=${pivot}&count=${count}`)
      .then(res => {
        if(res.status == 204) {
          setRecords(
            records.concat(<NoRecord key={'noRecord'}/>)
          )
        }
        else {
          setRecordList(recordList.concat(res.data))
          setRecords(
            res.data.map( (record) => 
              <Record key={record.info.gameId} record={record} summonerName={summoner.name}/>
            )
          )
        }
        
      })
    }

    else {
      axios.get(`/api/getMatch?name=${summoner.name}&start=${pivot}&count=${count}`)
      .then(res => {
        if(res.status == 204) {
          setRecords(
            records.concat(<NoRecord key={'noRecord'}/>)
          )
          setMoreLoading(false)
        }
        else {
          setRecordList(recordList.concat(res.data))
          setRecords(
            recordList.concat(res.data).map( (record) => 
              <Record key={record.info.gameId} record={record} summonerName={summoner.name}/>
            )
          )
          setMoreLoading(false)
        }
      })
    }
    

  }, [pivot])
  

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>

      <div style={{ display: 'flex', justifyContent: 'center' }}>{/*상단부*/}
        <div style={{ width: '1000px' }}>
          <div style={{ float: 'left', padding: '10px' }}>{/* 소환사 아이콘, 레벨 */}
            <div>
              <img width="100" height="100"
                src={`http://ddragon.leagueoflegends.com/cdn/${config.gameVersion}/img/profileicon/${summoner.profileIconId}.png`} />
            </div>
            <div>
              {summoner.summonerLevel}
            </div>
          </div>
          <div style={{ float: 'left', padding: '10px' }}>{/* 소환사 이름, 전적갱신버튼 */}
            <h2 style={{}}>{summoner.name}</h2>
            <div style={{}}>
              <Button type="primary" loading={updateLoading} onClick={onUpdateHandler}>전적갱신</Button>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>{/*하단부 */}
        <div style={{ width: '1000px' }}>
          <Tabs onChange={callback} >
            <TabPane tab="종합" key="1">
              <div style={{ display: 'flex'}}>
                <div>{/*티어, 시즌 통계*/}
                  <LeagueEntry queueType={'솔로랭크'} leagueEntry={soloRank} />{/*솔로랭크*/}
                  <LeagueEntry queueType={'자유랭크'} leagueEntry={flexRank} />{/*자유랭크*/}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', width: '700px', marginBottom: '100px'}}>{/*매치 세부내용*/}
                  {records}
                    <Button loading={moreLoading} onClick={onLoadMore}>더 보기</Button>
                </div>
              </div>
            </TabPane>
            <TabPane tab="챔피언" key="2">
              Content of Tab Pane 2
            </TabPane>
            <TabPane tab="인게임 정보" key="3">
              Content of Tab Pane 3
            </TabPane>
          </Tabs>
        </div>
      </div>

    </div>
  )
}

function callback(key) {
  //console.log(key);
}

export default SummonerPage