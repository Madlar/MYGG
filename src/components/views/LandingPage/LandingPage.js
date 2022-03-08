import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
//v6가 되면서 useNavigate 써야함
import { Space, Input } from 'antd'

const { Search } = Input

function LandingPage() {
  document.title = 'MY.GG'
  const navigate = useNavigate()

  const [Name, setName] = useState("");

  const onNameHandler = (event) => {
    setName(event.currentTarget.value)
  }

  const onSearchHandler = (event) => {
    navigate(`/summoner/userName=${Name}`)
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#1da57a' }}>
      <div style={{ display: 'flex', width:'500px', height: '100vh', padding: '10px', marginTop: '30vh' }}>
        <Search 
          placeholder="소환사명"
          enterButton="Search"
          size="large"
          value={Name}
          onChange={onNameHandler}
          onSearch={onSearchHandler}
        />
      </div>
    </div>
  )
      
    
}

export default LandingPage;