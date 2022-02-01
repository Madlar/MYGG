import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { searchSummoner } from '../../../_actions/summoner_action'
import { useNavigate } from 'react-router-dom'
//v6가 되면서 useNavigate 써야함
import { Space, Input } from 'antd'

const { Search } = Input

function LandingPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  //const summonerState = useSelector(state => )

  const [Name, setName] = useState("");

  const onNameHandler = (event) => {
    setName(event.currentTarget.value)
  }

  const onSearchHandler = (event) => {
    //event.preventDefault() //새로고침 방지

    dispatch(searchSummoner(Name))
    .then(res => {
      navigate(`/summoner/userName=${Name}`)
    })
    .catch(err => {
      alert('Error')
    })
    

  }

  return (
    <div>
      <Space>
      <div style={{ display: 'flex', width:'500px' }}>
        <Search 
          placeholder="소환사명"
          enterButton="Search"
          size="large"
          value={Name}
          onChange={onNameHandler}
          onSearch={onSearchHandler}
        />
      </div>
      </Space>
    </div>
  )
      
    
}

export default LandingPage;
