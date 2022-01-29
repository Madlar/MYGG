import {
    SEARCH_SUMMONER
} from '../_actions/types'

export default function (state={}, action) {
    switch (action.type) {
        case SEARCH_SUMMONER:
            return {...state, searhSuccess: action.payload}
            break

        default:
            return state
    }
}