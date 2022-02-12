import React from 'react';
import { connect } from 'react-redux';
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

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Wallet);
