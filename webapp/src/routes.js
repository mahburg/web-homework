import React, { useEffect, useState } from 'react'
import { object } from 'prop-types'
import { Route, Switch } from 'react-router-dom'
import axios from 'axios'

import { css } from '@emotion/core'

import { Home } from './home'
import BulkUpload from './components/bulk-upload/BulkUpload'
import Chart from './components/charts/Chart'
import NavBar from './components/nav/NavBar'

function AppRouter (props) {
  const { match: { params }, location, match } = props
  const reqLang = params.language || 'en'

  const [ i18n, setI18n ] = useState({})
  const [ lang, setLang ] = useState('en')

  useEffect(() => {
    if (i18n[reqLang]) {
      setLang(reqLang)
    } else {
      axios.get(`http://localhost:8000/i18n/${reqLang}`).then(({ data }) => {
        setI18n({ ...i18n, [reqLang]: data })
        setLang(reqLang)
      })
    }
  }, [params])

  return (
    <div css={layoutStyle}>
      <NavBar i18n={i18n[lang]} lang={lang} location={location} match={match} />
      <div className='main-content' css={contentStyle}>
        <Switch>
          <Route exact path='/'>
            <Home i18n={i18n[lang]} />
          </Route>
          <Route exact path='/account-visualization'>
            <Chart i18n={i18n[lang]} />
          </Route>
          <Route exact path='/bulk-upload'>
            <BulkUpload i18n={i18n[lang]} />
          </Route>
          <Route exact path='/:language'>
            <Home i18n={i18n[lang]} />
          </Route>
          <Route exact path='/:language/account-visualization'>
            <Chart i18n={i18n[lang]} />
          </Route>
          <Route exact path='/:language/bulk-upload'>
            <BulkUpload i18n={i18n[lang]} />
          </Route>
        </Switch>
      </div>
    </div>
  )
}

AppRouter.propTypes = {
  match: object,
  location: object
}

export default AppRouter

const layoutStyle = css`
  display: grid;
  grid-row-gap: 24px;
  h1 {
    margin: 0;
  }
`

const contentStyle = css`
  grid-row: 2;
  padding: 0 8px 8px 32px;
`
