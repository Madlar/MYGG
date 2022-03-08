import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { searchSummoner } from '../_actions/summoner_action'
import { useLocation } from 'react-router-dom';
import NoSummoner from '../components/views/SummonerPage/NoSummoner';
import SummonerPage from '../components/views/SummonerPage/SummonerPage';
import axios from 'axios'

export default function (SpecificComponent, option, adminRoute = null) {

    function IsExistCheck(props) {
        
        const [summoner, setSummoner] = useState("")
        //searchSuccess 상태 -1: 기본, true: DB에 있음, false: DB에 없음, -2: Riot DB에도 없음
        const [searchSuccess, setSearchSuccess] = useState(-1)
        const name = useLocation().pathname.split('=').reverse()[0]
        const dispatch = useDispatch()

        useEffect(() => {
            dispatch(searchSummoner(name))
            .then(res => {
               setSummoner(res.payload.Summoner)
               setSearchSuccess(res.payload.searchSuccess)
            })
        }, [])


        if(searchSuccess == true) {
            return (
                <SummonerPage summoner={summoner}/>
            )
        }
        else if(searchSuccess == false) {

            console.log(searchSuccess)
            
            let body = {
                name: name
              }

            axios.post('/api/updateSummoner', body).then(res => {
                window.location.reload()
            })
            .catch(err => {
                setSearchSuccess(-2)
            })
        }
        else if(searchSuccess == -2) {
            return (
                <NoSummoner/>
            )
        }

        return(
            <div></div>
        )
        
    }

    return IsExistCheck
}