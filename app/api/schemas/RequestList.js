const graphql = require('graphql')
const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList
} = graphql

const RequestType = require('./Request').default

module.exports.default = new GraphQLObjectType({
  name: 'RequestList',
  description: 'a list of requests',
  fields: () => ({
    count: {
      type: GraphQLInt
    },
    edges: {
      type: new GraphQLList(RequestType)
    }
  })
})
