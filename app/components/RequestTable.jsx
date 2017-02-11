import React from 'react'
import moment from 'moment'
import { Link } from 'react-router'
import { OverlayTrigger, Popover } from 'react-bootstrap'

class RequestTable extends React.Component {
  static propTypes = {
    requests: React.PropTypes.object.isRequired,
    deleteRequest: React.PropTypes.func,
    addRequest: React.PropTypes.func,
    setStatus: React.PropTypes.func,
    filter: React.PropTypes.string
  }

  // use for date sort
  _compareDates(a, b) {
    if (a.get('updated_at') > b.get('updated_at')) return -1
    if (a.get('updated_at') < b.get('updated_at')) return 1
    return 0
  }

  render(){
    // sort by dates
    const requests_sorted = this.props.requests.sort(this._compareDates)

    return (
      <div className="panel panel-primary">
        <div className="panel-heading">
          Requests ({this.props.filter})
          <div style={{ float: 'right' }}>
            <Link to='add' className='btn btn-info btn-xs'>
              <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>{' '}Add Request
            </Link>
          </div>
        </div>

        <table className='table table-condensed'>
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Updated</th>
              <th>Created</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests_sorted.map( (request) => (
                <tr
                  key={request.get('id')}
                  data-requestkey={request.get('id')}
                  className={this._getRowColor(request.get("status"))}
                >
                  <td>{request.get('title')}</td>
                  <td>
                    <OverlayTrigger
                      ref='trigger'
                      trigger='click'
                      rootClose
                      placement='right'
                      overlay={this._getPopover(request.get('id'), request.get('status'))
                    }>
                      <a href='javascript:void(0)'>{request.get('status')}</a>
                    </OverlayTrigger>
                  </td>
                  <td>{this._formatDate(request.get('updated_at'))}</td>
                  <td>{this._formatDate(request.get('created_at'))}</td>
                  <td>
                    <Link
                      to={`/edit/${request.get('id')}`}
                      className='btn btn-xs btn-primary'
                    >
                      Edit
                    </Link>
                    {' '}
                    <a
                      href='javascript:void(0)'
                      onClick={this._handleDeleteClick}
                      className='btn btn-xs btn-danger'
                    >
                      Delete
                    </a>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    )
  }

  _getRowColor(status){
    if (status === 'Approved'){ return 'success' }
    if (status === 'Denied'){ return 'danger' }
    return ''
  }

  _formatDate(str) {
    // let fixdate = str.substring(0,19) + str.substring(20);
    // console.log(fixdate);
    // return moment.utc(fixdate).format('YYYY-MM-DD');
    return moment(str, 'YYYY-MM-DD HH:mm:SS Z').utc().format('YYYY-MM-DD')
  }

  _getPopover(requestid, status){
    let statuses = [
      'Approved',
      'Pending',
      'Denied'
    ]
    statuses = statuses.filter( stat => stat != status )
    // console.log(status);
    return (
      <Popover id='popover-positioned-right'>
        {statuses.map((status, i) => (
          <div key={i}>
            <a
              onClick={this._handleStatusClick}
              data-id={requestid}
              data-status={status}
            >
              {status}
            </a>
          </div>
        )
        )}
      </Popover>
    )
  }

  _handleStatusClick = (e) => {
    const elm = e.target
    const id = elm.getAttribute('data-id')
    const newstatus = elm.getAttribute('data-status')
    this.props.setStatus(id, newstatus)
  }

  _handleDeleteClick = (e) => {
    const anchor = e.target
    const tr = anchor.parentNode.parentNode
    let id = tr.getAttribute('data-requestkey')
    console.log('delete ID:', id)
    this.props.deleteRequest(id)
  }

}

export default RequestTable
