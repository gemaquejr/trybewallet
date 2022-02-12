import React from 'react';
import Header from '../components/header';
import ExpenseForm from '../components/expenseForm';
import Table from '../components/table';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <h1>TrybeWallet</h1>
        <Header />
        <ExpenseForm />
        <Table />
      </>
    );
  }
}

export default Wallet;
