import React from 'react'
import RequestFilter from '../components/RequestFilter'
import RequestTable from '../components/RequestTable'
import Loader from 'components/Loader/Loader'
import { connect } from 'react-redux'
import { actions as requestActions } from '../redux/modules/requests'

class RequestsContainer extends React.Component {
  static propTypes = {
    requests: React.PropTypes.object.isRequired,
    deleteRequest: React.PropTypes.func,
    setStatus: React.PropTypes.func,
    loading: React.PropTypes.bool
  }

  state = {
    filter: 'All Status'
  }

  _getFilteredRequests(requests, status) {
    switch ( status ){
      case 'All Status':
        return requests
      case 'Approved':
        return requests.filter( request => request.get('status') === 'Approved' )
      case 'Pending':
        return requests.filter(request => request.get('status') === 'Pending' )
      case 'Denied':
        return requests.filter(request => request.get('status') === 'Denied' )
      default:
        return requests
    }
  }

  _setFilter = (filter) => {
    this.setState({filter: filter})
  }

  deleteRequest = (id) => {
    this.props.deleteRequest(id)
  }

  setStatus = (id, newStatus) => {
    this.props.setStatus(id, newStatus)
  }

  render(){
    const { requests, setStatus, loading } = this.props
    const requests_filtered = this._getFilteredRequests(requests, this.state.filter)
    return (
      <div style={{ minHeight: 500 }}>
        <h1>Requests</h1>
        <RequestFilter
          setFilter={this._setFilter}
          filter={this.state.filter}
        />
        {loading && <Loader size='lg' /> ||
          <RequestTable
            requests={requests_filtered}
            deleteRequest={this.deleteRequest}
            setStatus={this.setStatus}
            filter={this.state.filter}
          />
        }
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
     requests: state.requests.get('requests'),
     loading: state.requests.get('loading')
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    deleteRequest(id){
      dispatch(requestActions.deleteRequest(id))
    },
    setStatus(id, newStatus){
      dispatch(requestActions.setStatus(id, newStatus));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestsContainer)