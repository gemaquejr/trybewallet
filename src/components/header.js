import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  totalValue = () => {
    const { expenses } = this.props;
    const total = expenses.reduce((acc, curr) => {
      acc += curr.value * curr.exchangeRates[curr.currency].ask;
      return acc;
    }, 0);
    return total;
  }

  render() {
    const { email } = this.props;
    const { totalValue } = this;
    return (
      <header>
        <span data-testid="email-field">
          Email:
          { `${email}` }
        </span>
        <span data-testid="total-field">
          Despesa Total:
          { `${totalValue().toFixed(2)}` }
        </span>
        <span data-testid="header-currency-field">BRL</span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, null)(Header);
