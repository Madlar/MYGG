import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
//v6가 되면서 useNavigate 써야함
import { Space, Input } from 'antd'

const { Search } = Input

function LandingPage() {
  const navigate = useNavigate()

  const [Name, setName] = useState("");

  const onNameHandler = (event) => {
    setName(event.currentTarget.value)
  }

  const onSearchHandler = (event) => {
    navigate(`/summoner/userName=${Name}`)
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
