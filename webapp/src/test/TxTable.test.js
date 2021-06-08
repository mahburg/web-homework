import { fireEvent, render, screen } from '@testing-library/react'

import { MockedProvider } from '@apollo/client/testing';

import { TxTable } from '../components/transactions/TxTable'
import i18n from './data/i18n'

const emptyList = [];
const dataList = [
  {
    amount: 24,
    credit: false,
    debit: true,
    description: "gas",
    id: "test_id_1",
    merchant_id: "7-11",
    user_id: "user_test_id",
    __typename: "Transaction"
  },
  {
    amount: 53,
    credit: true,
    debit: false,
    description: "gas",
    id: "test_id_2",
    merchant_id: "7-11",
    user_id: "user_test_id",
    __typename: "Transaction"
  },
];

describe('Transactions Table', () => {
  it('show empty data state', () => {
    render(
      <MockedProvider>
        <TxTable data={emptyList} i18n={i18n.en} />
      </MockedProvider>
      )

    const element = screen.getByTestId('empty-table')

    expect(element).toBeInTheDocument()
  })

  it('renders transaction data', () => {
    render(
      <MockedProvider>
        <TxTable data={dataList} i18n={i18n.en} />
      </MockedProvider>
    )

    const dataRows = dataList.map((datum) => screen.getByTestId('transaction-' + datum.id))

    expect(dataRows).toHaveLength(2)
  })

  it('should open add new transactions ui', () => {
    render(
      <MockedProvider>
        <TxTable data={dataList} i18n={i18n.en} />
      </MockedProvider>
    )

    const addTxForm = screen.getByTestId('add-tx-form')

    expect(addTxForm).toHaveClass('collapsed')
    
    const button = screen.getByTestId('add-tx-button')
    fireEvent.click(button)
    
    expect(addTxForm).toHaveClass('expanded')
  })
  

  it('form should add new transaction', () => {
    render(
      <MockedProvider>
        <TxTable data={dataList} i18n={i18n.en} />
      </MockedProvider>
    )

    const button = screen.getByTestId('add-tx-button')
    fireEvent.click(button)

    const desc = screen.getByTestId('add-tx-desc')
    const merchant = screen.getByTestId('add-tx-merchant')
    const amount = screen.getByTestId('add-tx-amount')
    const debitCredit = screen.getByTestId('add-tx-debit-credit')
    
    fireEvent.change(desc, {target: { value: 'new description' } })
    fireEvent.change(merchant, {target: { value: 'new merchant' } })
    fireEvent.change(amount, {target: { value: 'new amount' } })
    fireEvent.click(debitCredit)

    const submit = screen.getByTestId('add-tx-submit-button')
    fireEvent.click(submit)

    expect(desc.value).toBe('')
    expect(merchant.value).toBe('')
    expect(amount.value).toBe('')
  })

  it('should allow row edit', () => {
    render(
      <MockedProvider>
        <TxTable data={dataList} i18n={i18n.en} />
      </MockedProvider>
    )

    const optionsButton = screen.getByTestId('transaction-test_id_1-options')
    fireEvent.click(optionsButton)
    const edit = screen.getByTestId('transaction-test_id_1-edit')
    fireEvent.click(edit)
  })

  it('should allow deletion', () => {
    render(
      <MockedProvider>
        <TxTable data={dataList} i18n={i18n.en} />
      </MockedProvider>
    )

    const optionsButton = screen.getByTestId('transaction-test_id_1-options')
    fireEvent.click(optionsButton)
    const edit = screen.getByTestId('transaction-test_id_1-edit')
    fireEvent.click(edit)
  })
})
