import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { searchSummoner } from '../../../_actions/summoner_action'
import { useNavigate } from 'react-router-dom'
//v6가 되면서 useNavigate 써야함

function LandingPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  //const summonerState = useSelector(state => )

  const [Name, setName] = useState("");

  const onNameHandler = (event) => {
    setName(event.currentTarget.value)
  }

  const onSubmitHandler = (event) => {
    event.preventDefault() //새로고침 방지

    dispatch(searchSummoner(Name))
    .then(res => {
      navigate(`/summoner/userName=${Name}`)
    })
    .catch(err => {
      alert('Error')
    })
    

  }

  return (
  <div style={{
      disply: 'flex', justifyContent: 'center', alignItems: 'center',
      width: '100%', height: '100vh'
  }}>
    <form onSubmit={onSubmitHandler}>
      <input type="name" value={Name} onChange={onNameHandler} />
      <button>
        검색
      </button>
    </form>
  </div>);
}

export default LandingPage;
