import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { css } from '@emotion/core'
import { string, object } from 'prop-types'

const generateLanguageLink = (language, { pathname }, { url }) => {
  return pathname.replace(url, `/${language}`)
}

const NavBar = (props) => {
  const { i18n, lang, location, match } = props
  const i18nData = i18n?.navBar ?? {}

  const [ showLangMenu, setShowLangMenu ] = useState(false)

  return (
    <nav css={navStyle}>
      <ul>
        <li>
          <Link to={`/${lang}/`}>{i18nData?.accountTransactions}</Link>
        </li>
        <li>
          <Link to={`/${lang}/account-visualization`}>{i18nData?.visualizeFinances}</Link>
        </li>
        <li>
          <Link to={`/${lang}/bulk-upload`}>{i18nData?.uploadTxData}</Link>
        </li>
      </ul>
      <div id='language-select'>
        <label htmlFor='lang-select'>{i18nData?.language}:</label>
        <button id='lang-select' onClick={() => setShowLangMenu(!showLangMenu)}>{lang}</button>
      </div>
      {showLangMenu && (
        <div id='language-menu'>
          <a className='language-item' href={generateLanguageLink('en', location, match)}>
            English
          </a>
          <a className='language-item' href={generateLanguageLink('zh', location, match)}>
            简体中文 (Chinese)
          </a>
        </div>
      )}
    </nav>
  )
}

const navStyle = css`
  position: relative;
  display: flex;
  justify-content: space-between;

  background-color: #222;
  padding: 12px 32px;
  color: white;

  & a {
    font-size: 20px;
    color: white;
    font-weight: bold;
    text-decoration: none;
  }
  & a:hover{
    color: gray;
    text-decoration: underline;
  }

  & > ul {
      display: flex;
      flex-direction: row;
      list-style-type: none;
  }
  
  & > ul > li:not(:first-of-type) {
    margin-left: 16px;
  }

  #language-select {
    label {
      margin-right: 8px;
    }
    button {
      background-color: white;
      color: black;
      border: none;
      border-radius: 4px;
      font-weight: bold;
      padding: 4px;
    }

    button:hover {
      background-color: #999;
      cursor: pointer;
    }
  }

  #language-menu {
    position: absolute;
    top: 100%;
    right: 32px;
    background-color: #333;
    display: flex;
    flex-direction: column;
  }
  .language-item {
    padding: 8px;
    font-size: 16px;
  }
`

NavBar.propTypes = {
  i18n: object,
  lang: string,
  location: object,
  match: object
}

export default NavBar
