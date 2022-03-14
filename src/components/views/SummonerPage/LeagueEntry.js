import { Card } from 'antd'

function LeagueEntry(props) {

    const win = props.leagueEntry.wins
    const loss = props.leagueEntry.losses
    const winRate = Math.round(win / (win+loss) * 100)

    const tierImg = () => {
        switch (props.leagueEntry.tier) {
            case 'BRONZE':
                return 'Emblem_Bronze.png'
                break;
            case 'CHALLENGER':
                return 'Emblem_Challenger.png'
                break;
            case 'DIAMOND':
                return 'Emblem_Diamond.png'
                break;
            case 'GOLD':
                return 'Emblem_Gold.png'
                break;
            case 'IRON':
                return 'Emblem_Iron.png'
                break;
            case 'MASTER':
                return 'Emblem_Master.png'
                break;
            case 'PLATINUM':
                return 'Emblem_Platinum.png'
                break;
            case 'SILVER':
                return 'Emblem_Silver.png'
                break;
            default:
                return 'provisional.png'
                break;
        }
    }

    if(props.leagueEntry == 'UNRANKED') {
        return(
            <Card style={{ width: '300px', height: '150px', display: 'flex' }}>
                <div style={{ display: 'flex' }}>
                    <div>
                        <img width="100" height="100" 
                        src={ `${process.env.PUBLIC_URL}/ranked-emblems/provisional.png` } />
                    </div>
                    <div style={{ marginLeft: '20px' }}>
                        <div style={{ float: 'left' }}>
                            {props.queueType}
                        </div>
                        <br/>
                        <div style={{ float: 'left' }}>
                            UNRANKED
                        </div>
                    </div>
                </div>
            </Card>
        )
    }

    else if(props.leagueEntry != -1){
        return (
            <Card style={{ width: '300px', height: '150px', display: 'flex' }}>
                <div style={{ display: 'flex' }}>
                    <div>
                        <img width="100" height="100" 
                        src={ `${process.env.PUBLIC_URL}/ranked-emblems/${tierImg()}` } />
                    </div>
                    <div style={{ marginLeft: '20px' }}>
                        <div style={{ float: 'left' }}>
                            {props.queueType}
                        </div>
                        <br/>
                        <div style={{ float: 'left' }}>
                            {props.leagueEntry.tier}
                            &nbsp;
                            {props.leagueEntry.rank}
                        </div>
                        <br/>
                        <div style={{ float: 'left' }}>
                            {props.leagueEntry.leaguePoints}
                            &nbsp;
                            LP
                            &nbsp;
                            /
                            &nbsp;
                            {props.leagueEntry.wins}
                            승
                            {props.leagueEntry.losses}
                            패
                        </div>
                        <br/>
                        <div style={{ float: 'left' }}>
                            승률
                            &nbsp;
                            {winRate}
                            %
                        </div>
                    </div>
                </div>
            </Card>
        )
    }

    return (
        <Card style={{ width: '300px', height: '150px'}}>
            {/*<h3 style={{ marginLeft: '0px' }}>{props.queueType}</h3>*/}
        </Card>
    )
}

export default LeagueEntry