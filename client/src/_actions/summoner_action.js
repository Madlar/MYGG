import axios from 'axios'
import {
    SEARCH_SUMMONER
} from './types'

export function searchSummoner(dataTosubmit) {
    //console.log(dataTosubmit)
    const req = axios.get(`/api/getSummoner?name=${dataTosubmit}`)
    .then(res => res.data)

    return {
        type: SEARCH_SUMMONER,
        payload: req
    }
}
