'use strict'
const exGraphql = require('express-graphql')
const graphqlSchema = require('./schema/schema.js')
const path = require('path')

const i18n = require('./i18n/index')

module.exports = function (app, opts) {
  // Setup routes, middleware, and handlers
  app.get('/', (req, res) => {
    res.locals.name = 'Lloyd\'s Divvy React Challenge'
    res.render('index')
  })

  app.get('/i18n/:language', (req, res) => {
    const { params: { language } } = req

    console.log('language', language)

    res.send((i18n[language || 'en' ]))
  })

  app.post('/seed', (req, res) => {
    const { body } = req;

    console.log('body', body)

    res.send({status: 'success'})
  })

  // GraphQL routes
  app.use(
    '/graphql',
    exGraphql({
      schema: graphqlSchema,
      graphiql: true,
      pretty: true
    })
  )

  app.use(/(?!\/graphql)/, (_req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
  })
}
