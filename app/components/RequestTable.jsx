import React from 'react'
import moment from 'moment'
import { OverlayTrigger, Popover }  from 'react-bootstrap'


class RequestTable extends React.Component {
  constructor(...args){
    super(...args)
    this._handleStatusClick = this._handleStatusClick.bind(this)
    this._handleDeleteClick = this._handleDeleteClick.bind(this)
  }

  componentDidMount () {

  }
    
  //use for date sort
  _compareDates(a,b) {
    if (a.updated_at > b.updated_at) return -1
    if (a.updated_at < b.updated_at) return 1
    return 0
  }
  
  render(){
    //sort dates
    const requests_sorted = this.props.requests.sort(this._compareDates)
  
    return(
      <table className='table table-condensed'>
        <thead>
          <tr>
            <th>Title1</th>
            <th>Status</th>
            <th>Updated</th>
            <th>Created</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {requests_sorted.map( (request) => {
            return (
              <tr key={request.id} data-requestkey={request.id} className={this._getRowColor(request.status)}>
                <td>{request.title}</td>
                <td>
                <OverlayTrigger ref='trigger' trigger='click' rootClose={true}  placement='right' overlay={this._getPopover(request.id, request.status)}>
                <a href='javascript:void(0)'>{request.status}</a>
                </OverlayTrigger>
                </td>
                <td>{this._formatDate(request.updated_at)}</td>
                <td>{this._formatDate(request.created_at)}</td>
                <td><a href='javascript:void(0)' onClick={this._handleDeleteClick}>Delete</a></td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }
    
  _getRowColor(status){
    if (status === 'Approved'){ return 'success' }
    if (status === 'Denied'){ return 'danger' }
    return ''
  }
    
  _formatDate(str){
    //let fixdate = str.substring(0,19) + str.substring(20);
    //console.log(fixdate);
    //return moment.utc(fixdate).format('YYYY-MM-DD');
    return moment(str, 'YYYY-MM-DD HH:mm:SS Z').utc().format('YYYY-MM-DD');
  }
    
  _getPopover(requestid, status){
    let statuses = [
      'Approved',
      'Pending',
      'Denied'
    ]
    statuses = statuses.filter( stat => stat != status );
    //console.log(status);
    return (
      <Popover id='popover-positioned-right'>
        {statuses.map( (status, i) => (
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

  _handleStatusClick(e) {
    let elm = e.target,
      id = elm.getAttribute('data-id'),
      newstatus = elm.getAttribute('data-status')
    this.props.setStatus( id, newstatus )
  }
    
  _handleDeleteClick(e){
    let anchor = e.target;
    let tr = anchor.parentNode.parentNode;
    console.info(e.target);
    let id = tr.getAttribute('data-requestkey');
    console.log('delete ID:', id)
    this.props.deleteRequest(id);
  }

}


RequestTable.propTypes = {
  requests: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  deleteRequest: React.PropTypes.func,
  addRequest: React.PropTypes.func,
  setStatus: React.PropTypes.func
}



export default RequestTable
