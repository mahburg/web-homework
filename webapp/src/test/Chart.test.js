import { _fireEvent, render, screen } from '@testing-library/react'

import { MockedProvider } from '@apollo/client/testing';

import Chart from '../components/charts/Chart'
import i18n from './data/i18n'

import GetTransactions from '../gql/transactions.gql'

const transactions = [
  {
    amount: 24,
    credit: false,
    debit: true,
    description: "gas",
    id: "tx_test_id_1",
    merchant_id: "7-11",
    user_id: "test_id",
    __typename: "Transaction"
  },
  {
    amount: 89,
    credit: true,
    debit: false,
    description: "rent",
    id: "tx_test_id_2",
    merchant_id: "uncle sam",
    user_id: "test_id",
    __typename: "Transaction"
  },
]

describe('Chart Page', () => {
  it('should render chart', () => {
    render(
      <MockedProvider mocks={[
        {
          request: {
            query: GetTransactions,
            variables: {}
          },
          result: {
            data: {
              transactions
            }
          }
        }
      ]}>
        <Chart i18n={i18n.en} />
      </MockedProvider>
      )


    const legendData = transactions.map((tx) => 
      screen.getByTestId('legend-row-' + tx.name)
    )

    console.log('legendData', legendData)

  })
})
