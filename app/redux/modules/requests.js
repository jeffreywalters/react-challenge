import fetch from 'isomorphic-fetch'
import moment from 'moment'

const delay = async (ms) => {
  // if i return the promise, then the await is optional
  await new Promise((resolve) => setTimeout(resolve.bind(this,'hi there'), ms))
  //await setTimeout(console.log.bind(this,'hi there'), ms)
  return 'here you go'
}

export const constants = {
  FETCH: 'Requests/FETCH',
  FETCH_SUCCESS: 'Requests/FETCH_SUCCESS',
  FETCH_FAILURE: 'Requests/FETCH_FAILURE',
  REMOVE_REQUEST: 'Requests/REMOVE_REQUEST',
  CHANGE_STATUS: 'Requests/CHANGE_STATUS'
}

export const actions = {
  fetchRequests() {
    return async (dispatch, getState) => {
      try {
        dispatch({ type: constants.FETCH })
        console.log('start delay')
        console.info(delay);
        const nothing = await delay(1000)
        console.log('nothing', nothing)
        const response = await fetch('/app/requests.json')
        if (response.status >= 300) throw new Error(response.status)
        const requests = await response.json()
        dispatch(this.fetchSuccess(requests))
      } catch (error) {
        dispatch({ type: constants.FETCH_FAILURE, error })
      }
    }
  },
  fetchSuccess(requests) {
    return { type: constants.FETCH_SUCCESS, requests }
  },
  deleteRequest(id){
    return { id: id, type: constants.REMOVE_REQUEST }
  },
  setStatus(id, newStatus){
    return {
      id: id,
      status: newStatus,
      updated_at: moment.utc().format('YYYY-MM-DD HH:mm:SS Z'),
      type: requestConstants.CHANGE_STATUS
    }
  }
}

const initialState = {
  loading: false,
  requests: []
}

// My requests Reducer - rootReducer
export default function(state = initialState, action = {}) {
  switch (action.type) {
    case constants.FETCH:
      return {
        ...state,
        loading: true,
        error: undefined
      }
    case constants.FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        requests: action.requests || []
      }
    case constants.FETCH_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      }
		case constants.REMOVE_REQUEST:
			var index = state.requests.findIndex( rqst => rqst.id === +action.id);
			return {
        loading: false,
        requests: [
          ...state.requests.slice(0, index),
          ...state.requests.slice(index + 1)
        ]
      }
		case constants.CHANGE_STATUS:
			return {
        loading: false,
        requests: state.requests.map( st => {
          if (+st.id !== +action.id) return st;
          return { ...st, status: action.status, updated_at: action.updated_at };
        })
      }
    default:
      return state
  }
}
