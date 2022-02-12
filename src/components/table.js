import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DeleteButton from './deleteButton';
import * as ACT from '../actions/index';

class Table extends React.Component {
  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={ expense.id }>
              <td>{ expense.description }</td>
              <td>{ expense.tag }</td>
              <td>{ expense.method }</td>
              <td>{ parseFloat(expense.value).toFixed(2) }</td>
              <td>
                { expense.exchangeRates[expense.currency]
                  .name.replace('/Real Brasileiro', '')}
              </td>
              <td>{Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}</td>
              <td>
                {(Number(expense.exchangeRates[expense.currency].ask)
                  * Number(expense.value)).toFixed(2)}

              </td>
              <td>Real</td>
              <td>
                <DeleteButton id={ expense.id } />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (expenses) => dispatch(ACT.actionDeleteWallet(expenses)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
