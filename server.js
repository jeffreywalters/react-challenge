const express = require('express')
const path = require('path')
const expressGraphQL = require('express-graphql')
const schema = require('./app/api/schemas').default

const app = express()

app.use('/graphql', expressGraphQL({
  graphiql: true,
  schema
}))

if (process.env.NODE_ENV !== 'production') {
  const webpackMiddleware = require('webpack-dev-middleware')
  const webpack = require('webpack')
  const webpackConfig = require('./webpack.config.js')
  app.use(webpackMiddleware(webpack(webpackConfig)))
} else {
  app.use(express.static('build'))
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build/index.html'))
  })
}

app.listen(process.env.PORT || 3050, () => console.log('Listening'))
