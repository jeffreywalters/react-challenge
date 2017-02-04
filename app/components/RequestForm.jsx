import React from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { withRouter, Link } from 'react-router'
import { actions as requestActions } from 'redux/modules/requests'

class RequestForm extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.onFormSubmit = this.onFormSubmit.bind(this)
  }
  static propTypes = {
    params: React.PropTypes.object,
    initialValues: React.PropTypes.object
  }
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  onFormSubmit(values) {
    this.props.editRequest(values)
    this.context.router.push('/')
  }

  render() {
    const { params: { id: r_id }, handleSubmit, pristine, reset, submitting } = this.props

    return (
      <form
        onSubmit={handleSubmit(this.onFormSubmit)}
        name='requestForm'
        className="form-horizontal"
      >
        <h3>
          Edit Request Record ID #{r_id}
        </h3>
        <div className='form-group'>
          <label htmlFor="id" className="col-sm-2 control-label">ID</label>
          <div className="col-sm-10">
            <Field
              name='id'
              id='id'
              component="input"
              className='form-control'
              type='text'
              disabled
            />
          </div>
        </div>
        <div className='form-group'>
          <label htmlFor="title" className="col-sm-2 control-label">Title</label>
          <div className="col-sm-10">
            <Field
              name='title'
              id='title'
              component="input"
              className='form-control'
              type='text'
            />
          </div>
        </div>
        <div className='form-group'>
          <label htmlFor="updated_at" className="col-sm-2 control-label">Updated At</label>
          <div className="col-sm-10">
            <Field
              name='updated_at'
              id='updated_at'
              component="input"
              className='form-control'
              type='text'
              disabled
            />
          </div>
        </div>
        <div className='form-group'>
          <label htmlFor="created_at" className="col-sm-2 control-label">Created At</label>
          <div className="col-sm-10">
            <Field
              name='created_at'
              id='created_at'
              component="input"
              className='form-control'
              type='text'
              disabled
            />
          </div>
        </div>
        <div className='form-group'>
          <label htmlFor="status" className="col-sm-2 control-label">Status</label>
          <div className="col-sm-10">
            <Field
              name='status'
              id='status'
              component="select"
              className='form-control'
              type='text'
            >
              <option value="Approved">Approved</option>
              <option value="Denied">Denied</option>
              <option value="Pending">Pending</option>
            </Field>
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-10">
            <button
              type='submit'
              className='btn btn-primary'
              disabled={pristine || submitting}
            >
              <span className="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span>
              {' '}
              Save Edit
            </button>
            {' '}
            <button
              type="button"
              className='btn btn-warn'
              disabled={pristine || submitting} onClick={reset}
            >
              <span className="glyphicon glyphicon-repeat" aria-hidden="true"></span>
              {' '}
              Reset Values
            </button>
            {' '}
            <Link to='/' className='btn btn-warning'>
              <span className="glyphicon glyphicon-backward" aria-hidden="true"></span>
              {' '}
              Cancel
            </Link>
          </div>
        </div>
      </form>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log('ownProps', ownProps)
  const rqst = state.requests.get('requests').find( rqst => rqst.get('id') === +ownProps.params.id)
  return {
    initialValues: rqst.toJS()
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    editRequest: ({id, status, title}) => {
      dispatch(requestActions.editRequest(id, status, title))
    }
  }
}

const RequestFormWithReduxform = reduxForm({
  form: 'requestForm'
})(RequestForm)

const RequestFormWithRouter = withRouter(RequestFormWithReduxform)

export default connect(mapStateToProps, mapDispatchToProps)(RequestFormWithRouter)
