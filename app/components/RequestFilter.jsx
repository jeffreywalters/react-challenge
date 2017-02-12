import React from 'react'
import { Link } from 'react-router'

class RequestFilter extends React.Component {
  static propTypes = {
    setFilter: React.PropTypes.func,
    status: React.PropTypes.string
  }

  _handleFilterChange = (e) => {
    const status = e.target.value
    this.props.setFilter(status)
  }

  _setSelected = (type) => {
    return type === this.props.status ? 'select' : ''
  }

  render() {
    // filter select list
    const statusList = [
      'All Status',
      'Approved',
      'Pending',
      'Denied'
    ]

    return (
      <div className='well'>
        Filter By Status:&nbsp;&nbsp;
        <select
          name='request_filter'
          value={this.props.status}
          onChange={this._handleFilterChange}
          className='form-control'
        >
          {statusList.map((type, i) => <option key={i} value={type}>{type}</option>)}
        </select>
        &nbsp;&nbsp;&nbsp;
        <Link to='/details/5'>Go to details</Link>
      </div>
    )
  }
}

export default RequestFilter
