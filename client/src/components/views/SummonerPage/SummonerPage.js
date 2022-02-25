import React, { useState, useEffect } from 'react';
import { Tabs, Button } from 'antd'
import { useLocation } from 'react-router-dom';
import axios from 'axios'

import LeagueEntry from './LeagueEntry';

const { TabPane } = Tabs;

function SummonerPage(props) {

  const summoner = props.summoner

  const name = useLocation().pathname.split('=').reverse()[0]

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

  return(
    <div>
      <div style={{
        display: 'flex',height: '150px', marginLeft: '100px'
      }}>
        <div>{/* 소환사 아이콘, 레벨 */}
          <img width="128" height="128"
          src={ `${process.env.PUBLIC_URL}/dragontail-12.3.1/12.3.1/img/profileicon/${summoner.profileIconId}.png` } />
          <br></br>
          {summoner.level}
        </div>
        <div style={{ marginLeft: '50px' }}>{/* 소환사 이름, 전적갱신버튼 */}
          <h2>{summoner.name}</h2>
          <div style={{ marginTop: '50px' }}>
            <Button type="primary" onClick={onUpdateHandler}>전적갱신</Button>
          </div>
        </div>
      </div>
      <div style={{
        display: 'flex', marginLeft: '100px'
      }}>
        <Tabs onChange={callback} >
          <TabPane tab="종합" key="1">
            <LeagueEntry summoner={summoner} />{/*솔로랭크*/}
            <LeagueEntry summoner={summoner} />{/*자유랭크*/}
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