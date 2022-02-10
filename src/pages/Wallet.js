import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/header';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      totalValue: 0,
    };
  }

  render() {
    const { totalValue } = this.state;
    const { email } = this.props;
    return (
      <>
        <h1>TrybeWallet</h1>
        <Header email={ email } totalValue={ totalValue } />
      </>
    );
  }
}

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Wallet);
