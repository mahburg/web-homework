import React, { useEffect, useState } from 'react'
import { object } from 'prop-types'

import { useMutation } from '@apollo/client'
import CsvUpload from '../../gql/csvUpload.gql'

const BulkUpload = ({ i18n }) => {
  const i18nData = i18n?.uploadTxData ?? {}

  const [selectedFile, setSelectedFile] = useState()
  const [isFilePicked, setIsFilePicked] = useState(false)

  const [ uploadCsv ] = useMutation(CsvUpload)

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0])
    setIsFilePicked(true)
  }

  const handleSubmission = e => {
    e.preventDefault()
    // @ts-ignore
    const formData = new window.FormData()

    formData.append('File', selectedFile)

    const reader = new window.FileReader()
    reader.onload = async (e) => {
      const text = (e.target.result)

      uploadCsv({
        variables: {
          csvData: text
        }
      })
    }
    reader.readAsText(selectedFile)
  }

  useEffect(() => {
    document.title = i18nData?.title
  }, [i18nData])

  return (
    <div>
      <h1>{i18n?.uploadTxData?.header}</h1>
      <br />
      <input id='csv-upload-input' name='csv-upload' onChange={changeHandler} type='file' />
      {isFilePicked ? (
        <div>
          <p>{i18n?.uploadTxData?.fileData?.fileName} {selectedFile.name}</p>
          <p>{i18n?.uploadTxData?.fileData?.fileType} {selectedFile.type}</p>
          <p>{i18n?.uploadTxData?.fileData?.fileSize} {selectedFile.size}</p>
          <p>
            {i18n?.uploadTxData?.fileData?.fileLastModified}{' '}
            {selectedFile.lastModifiedDate.toLocaleDateString()}
          </p>
        </div>
      ) : (
        <p>{i18n?.uploadTxData?.instructions}</p>
      )}
      <div>
        <button onClick={handleSubmission}>{i18nData?.buttons?.submit}</button>
      </div>
    </div>
  )
}

BulkUpload.propTypes = {
  i18n: object
}

export default BulkUpload
