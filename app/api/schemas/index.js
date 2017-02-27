const graphql = require('graphql')
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLEnumType,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLInt
} = graphql

const RequestType = require('./Request').default
const StatusType = require('./Request').StatusType

const data = require('../fixtures/data.json')

const SortType = new GraphQLEnumType({
  name: 'SortBy',
  description: 'field to sort requests on',
  values: {
    ID: { value: 'id' },
    TITLE: { value: 'title' },
    CREATED_AT: { value: 'created_at' },
    UPDATED_AT: { value: 'updated_at' },
    STATUS: { value: 'status' }
  }
})

const query = new GraphQLObjectType({
  name: 'Query',
  description: 'root query object',
  fields: {
    requests: {
      type: new GraphQLList(RequestType),
      args: {
        sortBy: {
          type: new GraphQLNonNull(SortType)
        },
        reverse: {
          type: GraphQLBoolean
        },
        filter: {
          type: StatusType
        },
        limit: {
          type: GraphQLInt,
          defaultValue: 25
        },
        skip: {
          type: GraphQLInt,
          defaultValue: 0
        }
      },
      resolve: (_, { sortBy, reverse, filter, limit, skip }) => data
        .filter(({ status }) => !filter || filter === status)
        .sort((item1, item2) => (reverse ? -1 : 1) *
          (item1[sortBy] <= item2[sortBy] ? -1 : 1)
        )
        .slice(skip, skip + limit)
    }
  }
})

module.exports.default = new GraphQLSchema({
  query
})
