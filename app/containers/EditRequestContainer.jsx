import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router'
import { actions as requestActions } from 'redux/modules/requests'
import requestForm from 'forms/RequestForm'

const RequestFormComponent = requestForm('EditForm')

class EditRequestContainer extends React.Component {
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
      <div>
        <h3>
          Edit Request Record ID #{r_id}
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
  const rqst = state.requests.get('requests').find( rqst => rqst.get('id') === +ownProps.params.id)
  return {
    initialValues: rqst.toJS()
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    editRequest: (values) => {
      dispatch(requestActions.editRequest(values))
    }
  }
}

const EditRequestContainerWithRouter = withRouter(EditRequestContainer)

export default connect(mapStateToProps, mapDispatchToProps)(EditRequestContainerWithRouter)
