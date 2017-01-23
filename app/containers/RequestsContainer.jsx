import React from 'react'
import RequestFilter from '../components/RequestFilter'
import RequestTable from '../components/RequestTable'
import { connect } from 'react-redux'
import { actions as requestActions } from '../redux/modules/requests'

class RequestsContainer extends React.Component {

  static propTypes = {
    requests: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    status: React.PropTypes.string,
    deleteRequest: React.PropTypes.func,
    setStatus: React.PropTypes.func
  }

  state = {
    filter: 'All Status'
  }

  _getFilteredRequests(requests, status) {
    switch ( status ){
      case 'All Status':
        return requests
      case 'Approved':
        return requests.filter( request => request.status === 'Approved' )
      case 'Pending':
        return requests.filter( request => request.status === 'Pending' )
      case 'Denied':
        return requests.filter( request => request.status === 'Denied' )
      default:
        return requests
    }
  }

  _setFilter = (filter) => {
    this.setState({filter: filter})
  }

  render(){
    const { requests, status, deleteRequest, setStatus } = this.props
    const requests_filtered = this._getFilteredRequests(requests, this.state.filter)
    return (
      <div>
        <h1>Requests</h1>
        <RequestFilter
          setFilter={this._setFilter}
          filter={this.state.filter}
        />
        <RequestTable
          requests={requests_filtered}
          deleteRequest={deleteRequest.bind(this)}
          setStatus={setStatus.bind(this)}
        />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
     requests: state.requests,
     status: state.statusFilter
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