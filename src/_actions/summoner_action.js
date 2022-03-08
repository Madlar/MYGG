import axios from 'axios'
import {
    SEARCH_SUMMONER
} from './types'

export function searchSummoner(dataTosubmit) {
    const req = axios.get(`/api/getSummoner?name=${dataTosubmit}`)
    .then(res => res.data)
    .catch(err => {
        return {
            searchSuccess: false,
            Summoner: err.response.data
        }
    })

    return {
        type: SEARCH_SUMMONER,
        payload: req
    }
}
