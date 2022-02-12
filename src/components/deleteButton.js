import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ACT from '../actions/index';

function DeleteButton({ id, deleteExpense }) {
  const handleDelete = () => {
    deleteExpense(id);
  };

  return (
    <button
      type="button"
      onClick={ handleDelete }
      data-testid="delete-btn"
    >
      Excluir despesa
    </button>
  );
}

DeleteButton.propTypes = {
  id: PropTypes.number.isRequired,
  deleteExpense: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({ expenses: state.wallet.expenses });

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (id) => dispatch(ACT.actionDeleteWallet(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteButton);
