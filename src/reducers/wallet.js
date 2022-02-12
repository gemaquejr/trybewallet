// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  SAVE_WALLET,
  SAVE_CURRENT,
  DELETE_WALLET,
} from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],

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

  default:
    return state;
  }
}

export default wallet;
