import api from "@/config/api";
import * as types from "./ActionTypes";

export const getUserWallet = (jwt) => async (dispatch) => {
  dispatch({ type: types.GET_USER_WALLET_REQUEST });

  try {
    const response = await api.get("/api/wallet", {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    console.log("user wallet ", response.data); // check this output!

    // 👇 Check this line — update if wallet is nested
    dispatch({
      type: types.GET_USER_WALLET_SUCCESS,
      payload: response.data.wallet || response.data, // fallback to whole data if flat
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: types.GET_USER_WALLET_FAILURE,
      error: error.message,
    });
  }
};

// ✅ GET WALLET TRANSACTIONS
export const getWalletTransactions = ({ jwt }) => async (dispatch) => {
  dispatch({ type: types.GET_WALLET_TRANSACTION_REQUEST });

  try {
    const response = await api.get("/api/transactions", {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    dispatch({
      type: types.GET_WALLET_TRANSACTION_SUCCESS,
      payload: response.data
    });
    console.log("wallet transaction", response.data);
  } catch (error) {
    console.log(error);
    dispatch({
      type: types.GET_WALLET_TRANSACTION_FAILURE,
      error: error.message,
    });
  }
};

// ✅ DEPOSIT MONEY
export const depositMoney = ({ jwt, orderId, paymentId, navigate }) => async (dispatch) => {
  dispatch({ type: types.DEPOSIT_MONEY_REQUEST });

  try {
    const response = await api.put(
      `/api/wallet/deposit`,
      null,
      {
        params: {
          order_id: orderId,
          payment_id: paymentId,
        },
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    dispatch({
      type: types.DEPOSIT_MONEY_SUCCESS,
      payload: response.data.wallet || response.data,
    });

    navigate("/wallet");
    console.log("deposit money ", response.data);
  } catch (error) {
    console.log(error);
    dispatch({
      type: types.DEPOSIT_MONEY_FAILURE,
      payload: error.message,
    });
  }
};

// ✅ PAYMENT HANDLER
export const paymentHandler = ({ jwt, amount, paymentMethod }) => async (dispatch) => {
  dispatch({ type: types.DEPOSIT_MONEY_REQUEST });

  try {
    const response = await api.post(
      `/api/payment/${paymentMethod}/amount/${amount}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    window.location.href = response.data.payment_url;
  } catch (error) {
    console.log("error", error);
    dispatch({
      type: types.DEPOSIT_MONEY_FAILURE,
      error: error.message,
    });
  }
};

// ✅ TRANSFER MONEY
export const transferMoney = ({ jwt, walletId, reqData }) => async (dispatch) => {
  dispatch({ type: types.TRANSFER_MONEY_REQUEST });

  try {
    const response = await api.put(
      `/api/wallet/${walletId}/transfer`,
      reqData,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    dispatch({
      type: types.TRANSFER_MONEY_SUCCESS,
      payload: response.data.wallet || response.data,
    });

    console.log("transfer money sent ", response.data);
  } catch (error) {
    dispatch({
      type: types.TRANSFER_MONEY_FAILURE,
      error: error.message,
    });
  }
};
