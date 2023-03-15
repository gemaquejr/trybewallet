import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DeleteButton from './deleteButton';
import * as ACT from '../actions/index';

import '../styles/table.css';

class Table extends React.Component {
  render() {
    const { expenses, enableEdit } = this.props;

    const getIndexOfExpense = (expenseId) => {
      console.log(getIndexOfExpense);
      const target = (expenses.find((expenseWith) => expenseWith.id === expenseId));
      return ({ id: expenses.indexOf(target), exchange: target.exchangeRates });
    };

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
                <button
                  type="button"
                  data-testid="edit-btn"
                  id={ expense.id }
                  onClick={ () => enableEdit(getIndexOfExpense(expense.id)) }
                >
                  Editar despesa
                </button>
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
  enableEdit: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (expenses) => dispatch(ACT.actionDeleteWallet(expenses)),
  enableEdit: (expenseId) => dispatch(ACT.enableExpenseEditing(expenseId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
