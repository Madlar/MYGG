import React from 'react';
import { Tabs } from 'antd'
import { useSelector } from 'react-redux';

const { TabPane } = Tabs;


function SummonerPage() {

  const searchSummoner = useSelector(state => state.summoner.searchSuccess.searchSuccess)

  if(searchSummoner) {
    return (
      <div>
          <div style={{
            display: 'flex',height: '100px', marginLeft: '50px'
          }}>소환사 아이콘, 레벨, 이름, 전적갱신버튼</div>
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
      </div>);
  }

  else {
    return (
      <div>
        <h1>등록되지 않은 소환사입니다.</h1>
      </div>
    )
  }
  
}

function callback(key) {
  //console.log(key);
}

export default SummonerPage;
