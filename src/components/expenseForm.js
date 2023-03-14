import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ACT from '../actions/index';

class ExpenseForm extends React.Component {
  constructor() {
    super();
    this.aliment = 'Alimentação';
    this.state = {
      currenciesAPI: [],
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: this.aliment,
    };
    this.getCurrencies = this.getCurrencies.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.getCurrencies();
  }

  async getCurrencies() {
    const { saveCurrencies } = this.props;
    const data = await fetch('https://economia.awesomeapi.com.br/json/all');
    const response = await data.json();
    const currencies = Object.keys(response).filter((currency) => currency !== 'USDT');
    this.setState({
      currenciesAPI: currencies,
    });
    saveCurrencies(currencies);
  }

  async handleClick(event) {
    event.preventDefault();
    const { id, value, description, currency, method, tag } = this.state;
    const { sendExpense } = this.props;
    const getApi = await fetch('https://economia.awesomeapi.com.br/json/all');
    const exchangeRates = await getApi.json();
    const expenseInfo = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };
    sendExpense(expenseInfo);
    this.setState({
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: this.aliment,
    });
  }

  handleChange({ target: { id, value } }) {
    this.setState({
      [id]: value,
    });
  }

  render() {
    const { currenciesAPI, method, tag, value, description, currency } = this.state;
    const { editIsActive, edit } = this.props;
    const buttonValue = editIsActive ? 'Editar despesa' : 'Adicionar despesa';
    return (
      <div>
        <form>
          <label htmlFor="value">
            Valor da despesa:
            <input
              id="value"
              name="value-input"
              data-testid="value-input"
              placeholder="Valor da despesa"
              type="number"
              onChange={ this.handleChange }
              value={ value }
            />
          </label>
          <label htmlFor="description">
            Descrição:
            <input
              id="description"
              name="description-input"
              data-testid="description-input"
              type="text"
              onChange={ this.handleChange }
              value={ description }
            />
          </label>
          <label htmlFor="currency">
            Moeda:
            <select
              id="currency"
              value={ currency }
              name="currency-input"
              data-testid="currency-input"
              onChange={ this.handleChange }
            >
              {currenciesAPI.map(
                (coin) => (<option key={ coin } value={ coin }>{coin}</option>),
              )}
            </select>
          </label>
          <label htmlFor="method">
            Método de pagamento:
            <select
              id="method"
              name="method"
              data-testid="method-input"
              value={ method }
              onChange={ this.handleChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Tag:
            <select
              id="tag"
              value={ tag }
              name="tag-input"
              data-testid="tag-input"
              onChange={ this.handleChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <button
            type="button"
            onClick={ editIsActive ? () => edit(this.state) : this.handleClick }
          >
            {buttonValue}
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  editIsActive: state.wallet.editIsActive,
  indexToEdit: state.wallet.indexToEdit,
});

ExpenseForm.propTypes = {
  saveCurrencies: PropTypes.func.isRequired,
  sendExpense: PropTypes.func.isRequired,
  editIsActive: PropTypes.bool,
  edit: PropTypes.func.isRequired,
};

ExpenseForm.defaultProps = {
  editIsActive: false,
};

const mapDispatchToProps = (dispatch) => ({
  saveCurrencies: (currencies) => dispatch(ACT.actionSaveCurrent(currencies)),
  sendExpense: (expenses) => dispatch(ACT.actionSaveWallet(expenses)),
  edit: (newExpense) => dispatch(ACT.editExpense(newExpense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
