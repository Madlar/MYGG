import React, { useState, useEffect } from 'react';
import { Tabs } from 'antd'
import { useDispatch } from 'react-redux'
import { searchSummoner } from '../../../_actions/summoner_action'
import { useLocation } from 'react-router-dom';

const { TabPane } = Tabs;

function SummonerPage() {
  const [isExist, setIsExist] = useState("");
  const [summoner, setSummoner] = useState("");

  const name = useLocation().pathname.split('=').reverse()[0]

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(searchSummoner(name))
    .then(res => {
      setIsExist(res.payload.searchSuccess)
      setSummoner(res.payload.Summoner)
    })
    .catch(err => {
      setIsExist(false)
    })
  }, []);

  if(isExist) {
    return(
      <div>
        <div style={{
          display: 'flex',height: '100px', marginLeft: '50px'
        }/*소환사 아이콘, 레벨, 이름, 전적갱신버튼*/}>
          <div>
            
          </div>
        </div>
        <div style={{
          display: 'flex', marginLeft: '100px'
        }}>
          <Tabs onChange={callback} type="card">
            <TabPane tab="종합" key="1">
              Content of Tab Pane 1
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
  else if(!isExist) {
    return (
      <div>
        <h1>등록되지 않은 소환사입니다</h1>
      </div>
      )
  }
  
  
  return (
    <div>
      <h1>error</h1>
    </div>
  )
}

function callback(key) {
  //console.log(key);
}

export default SummonerPage