import React from 'react'
import { connect } from 'react-redux'
import { actions as requestActions } from 'redux/modules/requests'
import requestForm from 'forms/RequestForm'

const RequestFormComponent = requestForm('AddForm')

class AddRequestContainer extends React.Component {
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
    this.props.addRequest(values)
    this.context.router.push('/')
  }

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props

    return (
      <div>
        <h3>
          Add New Request
        </h3>
        <RequestFormComponent
          initialValues={this.props.initialValues}
          handleRequestSubmit={this.onFormSubmit}
        />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {}
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addRequest: (formValues) => {
      dispatch(requestActions.addRequest(formValues))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddRequestContainer)
