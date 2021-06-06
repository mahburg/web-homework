import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AppRouter from './routes'
import { ApolloProvider } from '@apollo/client'
import { client } from './network/apollo-client'

ReactDOM.render(
  (
    <div data-app-init=''>
      <ApolloProvider client={client}>
        <Router>
          <Switch>
            <Route component={AppRouter} path='/:language' />
            <Route component={AppRouter} path='/' />
          </Switch>
        </Router>
      </ApolloProvider>
    </div>
  ),
  document.getElementById('react-app')
)
