import React from 'react'
import moment from 'moment'
import { Link } from 'react-router'
import { OverlayTrigger, Popover, Modal, Button } from 'react-bootstrap'

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
    const requestsSorted = this.props.requests.sort(this._compareDates)

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

        <table className='table table-condensed table-hover'>
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
            {requestsSorted.map( (request) => (
              <tr
                key={request.get('id')}
                data-requestkey={request.get('id')}
                className={this._getRowColor(request.get('status'))}
              >
                <td>{request.get('title')}</td>
                <td>
                  <OverlayTrigger
                    ref={`trigger${request.get('id')}`}
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
                  <DeleteModal
                    onDelete={() => this._handleDeleteClick(request.get('id'))}
                  />
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
    const me = this
    statuses = statuses.filter( stat => stat !== status )
    return (
      <Popover>
        {statuses.map((status, i) => (
          <div key={i}>
            <a
              onClick={(e) => { this._handleStatusClick(e); me.refs[`trigger${requestid}`].hide() }}
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

  _handleDeleteClick = (id) => {
    this.props.deleteRequest(id)
  }
}


class DeleteModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = { showModal: false }
    this.open = this.open.bind(this)
    this.open = this.open.bind(this)
  }

  static propTypes = {
    onDelete: React.PropTypes.func
  }

  close() {
    this.setState({ showModal: false })
  }

  open() {
    this.setState({ showModal: true })
  }

  render() {
    return (
      <span>
        <Button
          bsStyle="danger"
          bsSize="xsmall"
          onClick={this.open}
        >
          Delete
        </Button>

        <Modal
          show={this.state.showModal}
          onHide={this.close}
          bsSize="small"
        >
          <Modal.Header className="bg-primary" closeButton>
            <Modal.Title>Confirm</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Delete this Request?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={this.close}
              bsSize="small"
            >Cancel</Button>
            <Button
              bsStyle="primary"
              bsSize="small"
              onClick={() => { this.props.onDelete(); this.close() }}
            >Confirm</Button>
          </Modal.Footer>
        </Modal>
      </span>
    )
  }
}

export default RequestTable
