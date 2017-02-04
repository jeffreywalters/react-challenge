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
              className='form-control'
              type='text'
              disabled
              component='input'
            />
          </div>
        </div>
        <Field
          name='title'
          id='title'
          type='text'
          label='Title'
          className='form-control'
          component={renderField}
        />
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
              disabled={pristine || submitting}
              onClick={reset}
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

const renderField = ({ input, label, type, meta: { touched, error, warning }, ...rest }) => (
  <div className={`form-group ${touched && error ? 'has-error has-feedback' : ''}`}>
    <label htmlFor="title" className="col-sm-2 control-label">{label}</label>
    <div className="col-sm-10">
      <input
        {...input} {...rest}
      />
      {touched && (error && [
      <span key={0} className="glyphicon glyphicon-remove form-control-feedback"></span>,
      <div key={1} className='text-danger bg-warning' style={{ padding: 2, marginBottom: 0 }}>
        &nbsp;
        <span className="glyphicon glyphicon-warning-sign" aria-hidden="true"></span>
        {' '}
        {error}
      </div>
      ])}
    </div>
  </div>
)

const validate = (values) => {
  const errors = {}

  if (! values.title) {
    errors.title = 'Enter a Title'
  }
  return errors
}

const mapStateToProps = (state, ownProps) => {
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
  form: 'requestForm',
  validate
})(RequestForm)

const RequestFormWithRouter = withRouter(RequestFormWithReduxform)

export default connect(mapStateToProps, mapDispatchToProps)(RequestFormWithRouter)
