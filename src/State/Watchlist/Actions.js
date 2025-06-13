import api from '@/config/api';
import * as types from './ActionTypes';

// Get user watchlist
export const getUserWatchlist = (jwt) => async (dispatch) => {
  dispatch({ type: types.GET_USER_WATCHLIST_REQUEST });

  try {
    const response = await api.get('/api/watchlist/user', {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    dispatch({
      type: types.GET_USER_WATCHLIST_SUCCESS,
      payload: response.data,
    });

    console.log('user watchlist', response.data);
  } catch (error) {
    console.log('error', error);
    dispatch({
      type: types.GET_USER_WATCHLIST_FAILURE,
      error: error.message,
    });
  }
};

// Add item to watchlist
export const addItemToWatchlist = ({ coinId, jwt }) => async (dispatch) => {
  dispatch({ type: types.ADD_COIN_TO_WATCHLIST_REQUEST });

  try {
    const response = await api.patch(`/api/watchlist/add/coin/${coinId}`, {}, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    dispatch({
      type: types.ADD_COIN_TO_WATCHLIST_SUCCESS,
      payload: response.data,
    });

    console.log('add coin to watchlist', response.data);
  } catch (error) {
    console.log('error', error.response?.data || error.message);
    dispatch({
      type: types.ADD_COIN_TO_WATCHLIST_FAILURE,
      error: error.message,
    });
  }
};

// Remove item from watchlist
export const removeFromWatchlist = ({ coinId, jwt }) => async (dispatch) => {
  dispatch({ type: types.REMOVE_COIN_FROM_WATCHLIST_REQUEST });

  try {
    const response = await api.patch(`/api/watchlist/remove/coin/${coinId}`, {}, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    dispatch({
      type: types.REMOVE_COIN_FROM_WATCHLIST_SUCCESS,
      payload: response.data,
    });

    // Optionally refresh
    dispatch(getUserWatchlist(jwt));

    console.log('removed coin from watchlist', response.data);
  } catch (error) {
    console.log('error', error.response?.data || error.message);
    dispatch({
      type: types.REMOVE_COIN_FROM_WATCHLIST_FAILURE,
      error: error.message,
    });
  }
};
