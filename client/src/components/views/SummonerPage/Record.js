import summonerSpells from '../../../ko_KR/summoner.json'
import runes from '../../../ko_KR/runesReforged.json'
import champions from '../../../ko_KR/champion.json'

const config = require('../../../config')

function Record(props) {

    const summoner = props.record.info.participants.find( element => {
       return element.summonerName == props.summonerName
    })    

    //솔랭, 자유랭 등 큐 타입
    const queueType = () => {

        switch (props.record.info.queueId) {
            case 420:
                return '솔랭'
                break;

            case 450:
                return '무작위 총력전'
                break;
        
            case 440:
                return '팀랭'
                break;
        
            default:
                return props.record.info.queueId
                break;
        }
        
    }

    //게임을 얼마나 예전에 플레이했는지
    const elapsedTime = () => {
        const currentTime = new Date
        const gameEndTime = new Date(props.record.info.gameEndTimestamp)

        var elapsed = Math.floor( (currentTime.getTime()-gameEndTime.getTime())/1000 )

        if(elapsed < 60) {
            return `${elapsed}초 전`
        }
        else {
            elapsed = Math.floor(elapsed/60)

            if(elapsed < 60) {
                return `${elapsed}분 전`
            }
            else {
                elapsed = Math.floor(elapsed/60)

                if(elapsed < 24) {
                    return `${elapsed}시간 전`
                }
                else {
                    elapsed = Math.floor(elapsed/24)
                    return `${elapsed+1}일 전`
                }
            }
        }

    }
    //해당 게임 플레이 시간
    const playTime = () => {
        const sec = props.record.info.gameDuration % 60
        const min = Math.floor(props.record.info.gameDuration / 60)

        return `${min}분 ${sec}초`
    }

    //승, 패, 다시하기
    const winLoss = () => {
        if(summoner.gameEndedInEarlySurrender)
        {
            return '다시하기'
        }
        else if(summoner.win) {
            return '승리'
        }
        else {
            return '패배'
        }
    }
    //승리, 패배, 다시하기 글자색
    const winLossColor = () => {
        if(summoner.gameEndedInEarlySurrender)
        {
            return 'black'
        }
        else if(summoner.win) {
            return 'blue'
        }
        else {
            return 'red'
        }
    }
    //승리, 패배, 다시하기에 따른 전적 배경색
    const backPlateColor = () => {
        if(summoner.gameEndedInEarlySurrender)
        {
            return '#c0c0c0'
        }
        else if(summoner.win) {
            return '#cce5ff'
        }
        else {
            return '#ffcccc'
        }
    }

    //소환사 주문
    const summonerSpell = (id) => {
        
        //https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/values 참조
        //Object.values로 배열로 번환 하면 Array.prototype.find()를 사용할 수 있다.
        return Object.values(summonerSpells.data).find( element => {
            return element.key == id
        }).image.full

    }
    //핵심 룬
    const primaryRune = (id) => {
        return(
                runes.find( element => {
                    return element.id == id.style
                }).slots[0].runes.find( element => {
                    return element.id == id.selections[0].perk
                }).icon
        )
    }
    //보조 룬
    const subRune = (id) => {
        return(
                runes.find( element => {
                    return element.id == id.style
                }).icon
        )
    }
    //챔피언 이름
    const championName = (championName) => {

        //https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/values 참조
        //Object.values로 배열로 번환 하면 Array.prototype.find()를 사용할 수 있다.
        return Object.values(champions.data).find( element => {
            return element.id == championName
        }).name
    }

    //kda
    const kda = () => {
        return ((summoner.kills+summoner.assists)/summoner.deaths).toFixed(2)
    }
    //총 cs
    const totalCS = () => {
        return (summoner.totalMinionsKilled+summoner.neutralMinionsKilled)
    }
    //분당 cs
    const csPerMin = () => {
        return (totalCS() / (props.record.info.gameDuration / 60)).toFixed(1)
    }
    //킬관여율
    const killInvolve = () => {
        const teamChampionKill = props.record.info.teams.find( element => {
                                    return element.teamId == summoner.teamId
                                }).objectives.champion.kills
        return Math.round( ( (summoner.kills + summoner.assists) / teamChampionKill ) * 100 )        
    }

    //아이템
    const itemImg = (itemId) => {
        if (itemId == 0) {
            return `${process.env.PUBLIC_URL}/dragontail-${config.gameVersion}/img/bg/A6000000.png`
        }
        else {
            return `${process.env.PUBLIC_URL}/dragontail-${config.gameVersion}/${config.gameVersion}/img/item/${itemId}.png`
        }
    }

    return(
        <div style={{ display: 'flex', width: '700px', height: '100px', justifyContent: 'space-around', alignItems: 'center', marginBottom: '10px', backgroundColor: backPlateColor() }}>
            <div>
                <div style={{ fontSize: '0.75rem'}}>
                    {queueType()}
                </div>
                <div style={{ fontSize: '0.7rem'}}>
                    {elapsedTime()}
                </div>
                <hr/>
                <div style={{ fontSize: '0.75rem', color: winLossColor()}}>
                    {winLoss()}
                </div>
                <div style={{ fontSize: '0.7rem'}}>
                    {playTime()}
                </div>
            </div>
            <div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr', gap: '2px' }}>
                    <img width='50px' height='50px' src={`${process.env.PUBLIC_URL}/dragontail-${config.gameVersion}/${config.gameVersion}/img/champion/${summoner.championName}.png`} />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: '1px' }}>
                        <img width='25px' height='25px' src={`${process.env.PUBLIC_URL}/dragontail-${config.gameVersion}/${config.gameVersion}/img/spell/${summonerSpell(summoner.summoner1Id)}`} />
                        <div style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/dragontail-${config.gameVersion}/img/bg/F5141416.png)` }}>
                            <img width='25px' height='25px' src={`${process.env.PUBLIC_URL}/dragontail-${config.gameVersion}/img/${primaryRune(summoner.perks.styles[0])}`} />
                        </div>
                        <img width='25px' height='25px' src={`${process.env.PUBLIC_URL}/dragontail-${config.gameVersion}/${config.gameVersion}/img/spell/${summonerSpell(summoner.summoner2Id)}`} />
                        <div style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/dragontail-${config.gameVersion}/img/bg/F5141416.png)` }}>
                            <img width='25px' height='25px' src={`${process.env.PUBLIC_URL}/dragontail-${config.gameVersion}/img/${subRune(summoner.perks.styles[1])}`} />
                        </div>
                    </div>
                </div>
                <div style={{ fontSize: '0.75rem' }}>
                    {championName(summoner.championName)}
                </div>
            </div>
            <div>
                <div>
                    {summoner.kills}
                    &nbsp;
                    /
                    &nbsp;
                    {summoner.deaths}
                    &nbsp;
                    /
                    &nbsp;
                    {summoner.assists}
                </div>
                <div>
                    {kda()}
                    :1
                    &nbsp;
                    평점
                </div>
            </div>
            <div>
                <div style={{ fontSize: '0.75rem' }}>
                    레벨
                    &nbsp;
                    {summoner.champLevel}
                </div>
                <div style={{ fontSize: '0.75rem' }}>
                    {totalCS()}
                    &nbsp;
                    &#40;{/* ( */}
                    {csPerMin()}
                    &#41;{/* ) */}
                    &nbsp;
                    CS
                </div>
                <div style={{ fontSize: '0.75rem', color: 'red' }}>
                    킬관여
                    &nbsp;
                    {killInvolve()}
                    &#37;{/* % */}
                </div>
            </div>
            <div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gridTemplateRows: '1fr 1fr', gap: '2px' }}>
                    <img width='25px' height='25px' src={itemImg(summoner.item0)} />
                    <img width='25px' height='25px' src={itemImg(summoner.item1)} />
                    <img width='25px' height='25px' src={itemImg(summoner.item2)} />
                    <img width='25px' height='25px' src={itemImg(summoner.item6)} />
                    <img width='25px' height='25px' src={itemImg(summoner.item3)} />
                    <img width='25px' height='25px' src={itemImg(summoner.item4)} />
                    <img width='25px' height='25px' src={itemImg(summoner.item5)} />
                </div>
                <div style={{ fontSize: '0.7rem'}}>
                    제어&nbsp;와드
                    &nbsp;
                    {summoner.detectorWardsPlaced}
                </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr', gap: '2px', fontSize: '0.7rem'}}>
                <div style={{ display: 'flex'}}>
                    <img width='17px' height='17px' src={`${process.env.PUBLIC_URL}/dragontail-${config.gameVersion}/${config.gameVersion}/img/champion/${props.record.info.participants[0].championName}.png`} />
                    {props.record.info.participants[0].summonerName}
                </div>
                <div style={{ display: 'flex'}}>
                    <img width='17px' height='17px' src={`${process.env.PUBLIC_URL}/dragontail-${config.gameVersion}/${config.gameVersion}/img/champion/${props.record.info.participants[5].championName}.png`} />
                    {props.record.info.participants[5].summonerName}
                </div>
                <div style={{ display: 'flex'}}>
                    <img width='17px' height='17px' src={`${process.env.PUBLIC_URL}/dragontail-${config.gameVersion}/${config.gameVersion}/img/champion/${props.record.info.participants[1].championName}.png`} />
                    {props.record.info.participants[1].summonerName}
                </div>
                <div style={{ display: 'flex'}}>
                    <img width='17px' height='17px' src={`${process.env.PUBLIC_URL}/dragontail-${config.gameVersion}/${config.gameVersion}/img/champion/${props.record.info.participants[6].championName}.png`} />
                    {props.record.info.participants[6].summonerName}
                </div >
                <div style={{ display: 'flex'}}>
                    <img width='17px' height='17px' src={`${process.env.PUBLIC_URL}/dragontail-${config.gameVersion}/${config.gameVersion}/img/champion/${props.record.info.participants[2].championName}.png`} />
                    {props.record.info.participants[2].summonerName}
                </div>
                <div style={{ display: 'flex'}}>
                    <img width='17px' height='17px' src={`${process.env.PUBLIC_URL}/dragontail-${config.gameVersion}/${config.gameVersion}/img/champion/${props.record.info.participants[7].championName}.png`} />
                    {props.record.info.participants[7].summonerName}
                </div>
                <div style={{ display: 'flex'}}>
                    <img width='17px' height='17px' src={`${process.env.PUBLIC_URL}/dragontail-${config.gameVersion}/${config.gameVersion}/img/champion/${props.record.info.participants[3].championName}.png`} />
                    {props.record.info.participants[3].summonerName}
                </div>
                <div style={{ display: 'flex'}}>
                    <img width='17px' height='17px' src={`${process.env.PUBLIC_URL}/dragontail-${config.gameVersion}/${config.gameVersion}/img/champion/${props.record.info.participants[8].championName}.png`} />
                    {props.record.info.participants[8].summonerName}
                </div>
                <div style={{ display: 'flex'}}>
                    <img width='17px' height='17px' src={`${process.env.PUBLIC_URL}/dragontail-${config.gameVersion}/${config.gameVersion}/img/champion/${props.record.info.participants[4].championName}.png`} />
                    {props.record.info.participants[4].summonerName}
                </div>
                <div style={{ display: 'flex'}}>
                    <img width='17px' height='17px' src={`${process.env.PUBLIC_URL}/dragontail-${config.gameVersion}/${config.gameVersion}/img/champion/${props.record.info.participants[9].championName}.png`} />
                    {props.record.info.participants[9].summonerName}
                </div>
            </div>
        </div>
    )
}

export default Record