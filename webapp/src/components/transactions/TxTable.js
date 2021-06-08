import React, { useEffect, useState } from 'react'
import { arrayOf, string, bool, number, shape, object } from 'prop-types'

import { useMutation } from '@apollo/client'
import useAddTransaction from '../../gql/addTransaction'
import useRemoveTransaction from '../../gql/removeTransaction'
import UpdateTransaction from '../../gql/updateTransaction.gql'

import { TxTableDataRow } from './TxTableDataRow'

import { css } from '@emotion/core'

export function TxTable ({ data, i18n }) {
  const i18nData = i18n?.account ?? {}
  const [ addTransaction ] = useAddTransaction()
  const [ removeTransaction ] = useRemoveTransaction()
  const [ updateTransaction ] = useMutation(UpdateTransaction)

  const [expandAddTx, setExpandAddTx] = useState(false)

  const [addTxDebit, setAddTxDebit] = useState(true)
  const [addTxDesc, setAddTxDesc] = useState('')
  const [addTxMerchant, setAddTxMerchant] = useState('')
  const [addTxAmount, setAddTxAmount] = useState('')

  const setNumberValue = (value) => {
    if (Number(value)) {
      setAddTxAmount(value)
    }
  }

  const submitNewTx = e => {
    e.preventDefault()

    addTransaction({
      userId: 'test_id',
      description: addTxDesc,
      amount: Number(addTxAmount),
      merchantId: addTxMerchant,
      debit: addTxDebit,
      credit: !addTxDebit
    })

    setAddTxDesc('')
    setAddTxMerchant('')
    setAddTxAmount('')
  }

  useEffect(() => {
    document.title = i18nData?.title
  }, [i18nData])

  return (
    <div css={styles}>
      <h1>{i18nData?.h1}</h1>
      <table className='tx-table' >
        <tbody>
          <tr className='header'>
            <td>{i18nData?.table?.columns?.id}</td>
            <td>{i18nData?.table?.columns?.userId}</td>
            <td>{i18nData?.table?.columns?.description}</td>
            <td>{i18nData?.table?.columns?.merchantId}</td>
            <td>{i18nData?.table?.columns?.debit}</td>
            <td>{i18nData?.table?.columns?.credit}</td>
            <td>{i18nData?.table?.columns?.amount}</td>
            <td />
          </tr>
          {data.length > 0
            ? data.map(tx => (
              <TxTableDataRow
                key={`transaction-${tx.id}`}
                removeTransaction={removeTransaction}
                tx={tx}
                updateTransaction={updateTransaction}
              />
            ))
            : (
              <tr className='empty-table' data-testid='empty-table'>
                <td>{i18nData?.table?.empty}</td>
              </tr>
            )
          }
        </tbody>
      </table>

      <div className='add-tx-control'>
        <h3>{i18nData?.addTransaction?.header}</h3>
        <button data-testid='add-tx-button' onClick={() => setExpandAddTx(!expandAddTx)}>
          {expandAddTx ? i18nData?.addTransaction?.cancel : i18nData?.addTransaction?.addButton}
        </button>
      </div>

      <br />
      <form className={`add-tx-form ${expandAddTx ? 'expanded' : 'collapsed'}`} data-testid='add-tx-form' onSubmit={e => submitNewTx(e)} >
        <div className='add-tx-row'>
          <div className='input-group'>
            <label htmlFor='add-tx-desc'>{i18nData?.addTransaction?.description}</label>
            <input
              data-testid='add-tx-desc'
              id='add-tx-desc'
              onChange={e => setAddTxDesc(e.target.value)}
              type='text'
              value={addTxDesc}
            />
          </div>
          <div className='input-group'>
            <label htmlFor='add-tx-merchant'>{i18nData?.addTransaction?.merchantId}</label>
            <input
              data-testid='add-tx-merchant'
              id='add-tx-merchant'
              onChange={e => setAddTxMerchant(e.target.value)}
              type='text'
              value={addTxMerchant}
            />
          </div>
          <div className='input-group'>
            <label htmlFor='add-tx-amount'>{i18nData?.addTransaction?.amount}</label>
            <span className='dollar'>
              $<input
                data-testid='add-tx-amount'
                id='add-tx-amount'
                onChange={e => setNumberValue(e.target.value)}
                type='text'
                value={addTxAmount}
              />
            </span>
          </div>
          <div className='input-group debit-switch'>
            <label htmlFor='add-tx-debit-credit'>
              <div className='switch'>
                <div className='debit-bg bg'>{i18nData?.addTransaction?.debit}</div>
                <div className='credit-bg bg'>{i18nData?.addTransaction?.credit}</div>
                <div className={`selected-indicator ${addTxDebit ? '' : 'credit-selected'}`}>
                  {addTxDebit ? i18nData?.addTransaction?.debit : i18nData?.addTransaction?.credit}
                </div>
              </div>
            </label>
            <input
              checked={addTxDebit}
              data-testid='add-tx-debit-credit'
              id='add-tx-debit-credit'
              onChange={() => setAddTxDebit(!addTxDebit)}
              type='checkbox'
            />
          </div>
        </div>
        <button data-testid='add-tx-submit-button'>{i18nData?.addTransaction?.submitButton}</button>
      </form>
    </div>
  )
}

const styles = css`
  .tx-table {
    border: 1px solid #DDD;
    padding: 4px;
  }
  .header {
    font-weight: bold;

    td{
      padding: 2px 4px;
    }
  }

  .add-tx-row{
    display: flex;
    font-weight: bold;
  }

  .add-tx-form{
    transition: transform 0.5s;
    transform-origin: top;
    background-color: #CCC;
    border-radius: 8px;
    padding: 16px;
    width: 100%;
    max-width: 700px;
  }
  .add-tx-form.collapsed{
    transform: scaleY(0);
  }
  .add-tx-form.expanded{
    transform: scaleY(1);
  }
  
  .add-tx-row{
    display: flex;
    justify-content: space-between;
  }
  .input-group{
    display: flex;
    flex-direction: column;

  }
  .dollar{
    font-weight: normal;
    display: flex;  
  }

  #add-tx-debit-credit{
    opacity: 0;
  }
  .debit-switch{
    margin: 0 8px;
    height: 100%;
    display: flex;
    align-items: flex-end;
  }
  
  .switch{
    position: relative;
    display: flex;
    /* border: 1px solid black; */
    cursor: pointer;
    overflow: hidden;
    border-radius: 12px;
    
    .bg{
      padding: 4px 8px;
      background-color: #DDD;
      color: #AAA;
      width: 65px;
      text-align: center;
    }

    .selected-indicator{
      width: 65px;
      text-align: center;
      position: absolute;
      top: 0;
      left: 0;
      border-radius: 12px;
      padding: 4px 8px;
      background-color: firebrick;
      color: white;
      transition: all 0.4s;
    }
    .selected-indicator.credit-selected{
      background-color: green;
      left: calc(50% + 1px);
      right: 0;
    }
  }
`

TxTable.defaultProps = {
  data: []
}

TxTable.propTypes = {
  data: arrayOf(shape({
    id: string,
    user_id: string,
    description: string,
    merchant_id: string,
    debit: bool,
    credit: bool,
    amount: number
  })),
  i18n: object
}
