import axios from 'axios'
import { useEffect, useState } from 'react'
import { Card } from 'antd'

function LeagueEntry(props) {

    const [isExist, setIsExist] = useState("");

    var leagueEntry

    //console.log(props.summoner.name)

    return (
        <Card style={{ width: '300px', height: '150px'}}>
            <h3 style={{ marginLeft: '0px' }}>{props.summoner.name}</h3>
        </Card>
    )
}

export default LeagueEntry