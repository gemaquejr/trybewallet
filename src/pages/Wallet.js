import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/header';
import ExpenseForm from '../components/expenseForm';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <h1>TrybeWallet</h1>
        <Header />
        <ExpenseForm />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Wallet);
