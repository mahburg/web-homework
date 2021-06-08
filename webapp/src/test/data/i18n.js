export default {
  en: {
    navBar: {
      accountTransactions: 'Account Transactions',
      visualizeFinances: 'Visualize My Finances',
      uploadTxData: 'Upload Transaction Data',
      language: 'Language',
    },
    account: {
      title: 'Divvy Account Transactions',
      h1: 'Account Transactions',
      table: {
        columns: {
          id: 'ID',
          userId: 'User ID',
          description: 'Description',
          merchantId: 'Merchant ID',
          debit: 'Debit',
          credit: 'Credit',
          amount: 'Amount'
        },
        empty: 'No records found',
        buttons: {
          options: 'Options',
          edit: 'Edit',
          remove: 'Remove'
        }
      },
      addTransaction: {
        header: 'Add Transaction',
        addButton: 'Add',
        description: 'Description',
        merchantId: 'Merchant',
        debit: 'Debit',
        credit: 'Credit',
        amount: 'Amount',
        submitButton: 'Add Transaction',
        cancel: 'Cancel'
      }
    },
    charts: {
      title: 'Divvy Spending Charts',
      chargesHeader: 'Spending Chart',
      depositsHeader: 'Deposit Chart',
      buttons: {
        charges: 'Charges',
        deposits: 'Deposits'
      },
      legendHeader: 'Legend'
    },
    uploadTxData: {
      title: 'Divvy Upload Transaction Data CSV',
      header: 'Upload Transaction Data CSV',
      instructions: 'Select a file to show details',
      fileData: {
        fileName: 'Filename:',
        fileType: 'Filetype:',
        fileSize: 'Size in bytes:',
        fileLastModified: 'Last Modified Date:'
      },
      buttons: {
        submit: 'Submit'
      }
    }
  }
}