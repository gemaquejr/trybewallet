import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as ACT from '../actions/index';

import '../styles/login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isDisabled: true,
    };
    this.handleInput = this.handleInput.bind(this);
    this.enableButton = this.enableButton.bind(this);
  }

  handleInput = ({ target }) => {
    const { enableButton } = this;
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      enableButton();
    });
  }

  enableButton = () => {
    const { email, password } = this.state;
    const PASSWORD_LENGTH = 6;
    // regex consultada em: https://github.com/balajiadmane/JQuery-Validate-Email/blob/master/index.html
    const regex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if (password.length >= PASSWORD_LENGTH && regex.test(email)) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  handleClick() {
    const { emailDispatch } = this.props;
    const { email } = this.state;
    emailDispatch(email);
  }

  render() {
    const { email, password, isDisabled } = this.state;
    const { emailDispatch, history } = this.props;

    return (
      <div className="login-container">
        <label htmlFor="email-input">
          <input
            id="email"
            type="email"
            data-testid="email-input"
            name="email"
            placeholder="Email"
            onChange={ this.handleInput }
            value={ email }
          />
        </label>
        <label htmlFor="password-input">
          <input
            id="password"
            type="password"
            data-testid="password-input"
            name="password"
            placeholder="Senha"
            onChange={ this.handleInput }
            value={ password }
          />
        </label>
        <button
          type="button"
          disabled={ isDisabled }
          onClick={ () => {
            emailDispatch(email);
            history.push('/carteira');
          } }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  emailDispatch: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  emailDispatch: (value) => dispatch(ACT.actionSaveEmail(value)),
});

export default connect(null, mapDispatchToProps)(Login);
