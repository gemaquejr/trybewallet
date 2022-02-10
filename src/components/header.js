import React from 'react';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { email, totalValue } = this.props;
    return (
      <header>
        <span data-testid="email-field">
          Email:
          { `${email}` }
        </span>
        <span data-testid="total-field">
          Despesa:
          { `${totalValue}` }
        </span>
        <span data-testid="header-currency-field">BRL</span>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  totalValue: PropTypes.arrayOf(PropTypes.object),
};

Header.defaultProps = {
  totalValue: [],
};

export default Header;
