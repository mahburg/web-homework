module.exports = {
  navBar: {
    accountTransactions: '账户交易',
    visualizeFinances: '可视化我的财务',
    uploadTxData: '上传交易数据',
    language: '语',
  },
  account: {
    title: 'Divvy 账户交易',
    h1: '账户交易',
    table: {
      columns: {
        id: 'ID',
        userId: '用户身份',
        description: '描述',
        merchantId: '商户编号',
        debit: '借方',
        credit: '信用',
        amount: '数量'
      },
      buttons: {
        options: '选项',
        edit: '编辑',
        remove: '去掉'
      }
    },
    addTransaction: {
      header: '账户交易',
      addButton: '添加',
      description: '描述',
      merchantId: '商人',
      debit: '借方',
      credit: '信用',
      amount: '数量',
      submitButton: '账户交易',
      cancel: '取消'
    }
  },
  charts: {
    title: 'Divvy 支出图表',
    chargesHeader: '支出表',
    depositsHeader: '存款图表',
    buttons: {
      charges: '收费',
      deposits: '存款'
    },
    legendHeader: '图例'
  },
  uploadTxData: {
    title: 'Divvy 上传交易数据CSV',
    header: '上传交易数据CSV',
    instructions: '选择一个文件以显示详细信息',
    fileData: {
      fileName: '文件名:',
      fileType: '文件类型:',
      fileSize: '大小（以字节为单位）:',
      fileLastModified: '上次修改日期:'
    },
    buttons: {
      submit: '递交'
    }
  }
}