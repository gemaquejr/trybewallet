// Coloque aqui suas actions
export const SAVE_EMAIL = 'SAVE_EMAIL';
export const SAVE_WALLET = 'SAVE_WALLET';
export const SAVE_CURRENT = 'SAVE_CURRENT';
export const DELETE_WALLET = 'DELETE_WALLET';
export const ENABLE_EXPENSE_EDITING = 'ENABLE_EXPENSE_EDITING';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';

export const actionSaveEmail = (payload) => ({
  type: SAVE_EMAIL,
  payload,
});

export const actionSaveWallet = (payload) => ({
  type: SAVE_WALLET,
  payload,
});

export const actionSaveCurrent = (payload) => ({
  type: SAVE_CURRENT,
  payload,
});

export const actionDeleteWallet = (payload) => ({
  type: DELETE_WALLET,
  payload,
});

export const enableExpenseEditing = (payload) => ({
  type: ENABLE_EXPENSE_EDITING,
  payload,
});

export const editExpense = (payload) => ({
  type: EDIT_EXPENSE,
  payload,
});
