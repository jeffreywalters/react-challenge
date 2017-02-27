const graphql = require('graphql')
const {
  GraphQLString,
  GraphQLID,
  GraphQLEnumType,
  GraphQLObjectType
} = graphql

const StatusType = new GraphQLEnumType({
  name: 'Status',
  description: 'request status type',
  values: {
    PENDING: { value: 'Pending' },
    APPROVED: { value: 'Approved' },
    DENIED: { value: 'Denied' }
  }
})

module.exports.StatusType = StatusType

module.exports.default = new GraphQLObjectType({
  name: 'Request',
  description: 'request for something',
  fields: {
    id: {
      type: GraphQLID
    },
    title: {
      type: GraphQLString
    },
    status: {
      type: StatusType
    },
    updatedAt: {
      type: GraphQLString,
      resolve: ({ updated_at }) => new Date(updated_at).getTime()
    },
    createdAt: {
      type: GraphQLString,
      resolve: ({ created_at }) => new Date(created_at).getTime()
    }
  }
})
