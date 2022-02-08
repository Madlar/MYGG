import axios from 'axios'
import { useEffect } from 'react'

function LeagueEntry(props) {

    var leagueEntry

    useEffect(() => {
        axios.get(`/api/getLeagueEntry?name=${props.name}`)
        .then(res => {
            console.log(res.data)
            leagueEntry = res.data
            console.log(leagueEntry)
            console.log(leagueEntry[0])
            console.log(leagueEntry[1])
        })
        .catch(err => {
            console.log(err.response.data)
        })
    }, [props.name]);
    
    

    return (
        <h3 style={{ marginLeft: '0px' }}>{props.name}</h3>
    )
}

export default LeagueEntry