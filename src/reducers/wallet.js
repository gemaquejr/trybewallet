// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  SAVE_WALLET,
  SAVE_CURRENT,
  DELETE_WALLET,
  ENABLE_EXPENSE_EDITING,
  EDIT_EXPENSE,
} from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editIsActive: false,
  indexAndExchangeToEdit: null,
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SAVE_WALLET:
    return ({
      ...state,
      expenses: [...state.expenses,
        {
          ...action.payload,
          id: state.expenses.length,
        },
      ],
    });

  case SAVE_CURRENT:
    return ({
      ...state,
      currencies: action.payload,
    });

  case DELETE_WALLET:
    return ({
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.payload),
    });

  case ENABLE_EXPENSE_EDITING:
    return {
      ...state,
      editIsActive: true,
      indexAndExchangeToEdit: action.payload,
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.map((expense) => {
        const targetId = state.indexAndExchangeToEdit.id;
        const exchangeRates = state.indexAndExchangeToEdit.exchange;
        const newExpense = { ...action.payload, exchangeRates };

        return (expense.id === targetId) ? newExpense : expense;
      }),
      editIsActive: false,
    };

  default:
    return state;
  }
}

export default wallet;
