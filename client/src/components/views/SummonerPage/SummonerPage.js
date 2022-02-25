import React, { useState, useEffect } from 'react';
import { Tabs, Button } from 'antd'
import { useLocation } from 'react-router-dom';
import axios from 'axios'

import LeagueEntry from './LeagueEntry';

const { TabPane } = Tabs;

function SummonerPage(props) {

  const summoner = props.summoner
  const name = useLocation().pathname.split('=').reverse()[0]
  const [soloRank, setSoloRank] = useState(-1)
  const [flexRank, setFlexRank] = useState(-1)

  const onUpdateHandler = (event) => {
    let body = {
      name: name
    }
    axios.post('/api/updateSummoner', body)
    .then(res => {
      //window.location.reload()
      console.log(res.data)
    })
    .catch(err => {
      console.log(err.response.data)
    })
  }

  useEffect(() => {
    axios.get(`/api/getLeagueEntry?name=${summoner.name}`).then(res => {
      setSoloRank("UNRANKED")
      setFlexRank("UNRANKED")
      for(let i of res.data) {
        if(i.queueType == 'RANKED_SOLO_5x5') {
          setSoloRank(i)
        }
        else if(i.queueType == 'RANKED_FLEX_SR') {
          setFlexRank(i)
        }
      }
    })
  }, [])

  return(
    <div>
      <div>
        <div>{/* 소환사 아이콘, 레벨 */}
          <img width="128" height="128"
          src={ `${process.env.PUBLIC_URL}/dragontail-12.3.1/12.3.1/img/profileicon/${summoner.profileIconId}.png` } />
          <br/>
          {summoner.summonerLevel}
        </div>
        <div>{/* 소환사 이름, 전적갱신버튼 */}
          <h2>{summoner.name}</h2>
          <div>
            <Button type="primary" onClick={onUpdateHandler}>전적갱신</Button>
          </div>
        </div>
      </div>
      <div>
        <Tabs onChange={callback} >
          <TabPane tab="종합" key="1">
            <div>
              <div>{/*티어, 시즌 통계*/}
                <LeagueEntry queueType={'솔로랭크'} leagueEntry={soloRank} />{/*솔로랭크*/}
                <LeagueEntry queueType={'자유랭크'} leagueEntry={flexRank} />{/*자유랭크*/}
              </div>
              <div>{/*매치 세부내용*/}

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
    )
}

function callback(key) {
  //console.log(key);
}

export default SummonerPage