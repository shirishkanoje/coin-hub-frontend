import axios from "axios";
import {
  FETCH_COIN_BY_ID_FAILURE,
  FETCH_COIN_BY_ID_REQUEST,
  FETCH_COIN_BY_ID_SUCCESS,
  FETCH_COIN_DETAILS_FAILURE,
  FETCH_COIN_DETAILS_REQUEST,
  FETCH_COIN_DETAILS_SUCCESS,
  FETCH_COIN_LIST_FAILURE,
  FETCH_COIN_LIST_REQUEST,
  FETCH_COIN_LIST_SUCCESS,
  FETCH_MARKET_CHART_FAILURE,
  FETCH_MARKET_CHART_REQUEST,
  FETCH_MARKET_CHART_SUCCESS,
  FETCH_TOP_50_COINS_FAILURE,
  FETCH_TOP_50_COINS_REQUEST,
  FETCH_TOP_50_COINS_SUCCESS,
  SEARCH_COIN_FAILURE,
  SEARCH_COIN_REQUEST,
  SEARCH_COIN_SUCCESS,
} from "./ActionType";

import api, { API_BASE_URL } from "@/config/api";


// ✅ FIXED: uses deployed backend instead of localhost
export const getCoinList = (page) => async (dispatch) => {
  dispatch({ type: FETCH_COIN_LIST_REQUEST });

  try {
    const { data } = await axios.get(
      `${API_BASE_URL}/api/coins/list?page=${page}`
    );

    console.log("coin list", data);

    dispatch({ type: FETCH_COIN_LIST_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: FETCH_COIN_LIST_FAILURE, payload: error.message });
  }
};


// 🔥 MAIN FIX HERE (sync top50 → coinList)
export const getTop50CoinList = () => async (dispatch) => {
  dispatch({ type: FETCH_TOP_50_COINS_REQUEST });

  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/coins/top50`
    );

    console.log("top 50", response.data);

    // store in top50
    dispatch({
      type: FETCH_TOP_50_COINS_SUCCESS,
      payload: response.data,
    });

    // 🔥 IMPORTANT: also update coinList (used by table)
    dispatch({
      type: FETCH_COIN_LIST_SUCCESS,
      payload: response.data,
    });

  } catch (error) {
    console.log("error", error);

    dispatch({
      type: FETCH_TOP_50_COINS_FAILURE,
      payload: error.message,
    });
  }
};


export const fetchMarketChart = ({ coinId, days, jwt }) => async (dispatch) => {
  dispatch({ type: FETCH_MARKET_CHART_REQUEST });

  try {
    const response = await api.get(
      `/api/coins/${coinId}/chart?days=${days}`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    dispatch({
      type: FETCH_MARKET_CHART_SUCCESS,
      payload: response.data,
    });

  } catch (error) {
    console.log("error", error);

    dispatch({
      type: FETCH_MARKET_CHART_FAILURE,
      payload: error.message,
    });
  }
};


export const fetchCoinDetails = ({ coinId, jwt }) => async (dispatch) => {
  dispatch({ type: FETCH_COIN_DETAILS_REQUEST });

  try {
    const response = await api.get(
      `/api/coins/details/${coinId}`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    console.log("coin details", response.data);

    dispatch({
      type: FETCH_COIN_DETAILS_SUCCESS,
      payload: response.data,
    });

  } catch (error) {
    console.log("error", error);

    dispatch({
      type: FETCH_COIN_DETAILS_FAILURE,
      payload: error.message,
    });
  }
};


export const searchCoin = (keyword) => async (dispatch) => {
  dispatch({ type: SEARCH_COIN_REQUEST });

  try {
    const response = await api.get(
      `/api/coins/search?q=${keyword}`
    );

    console.log("search coin", response.data);

    dispatch({
      type: SEARCH_COIN_SUCCESS,
      payload: response.data,
    });

  } catch (error) {
    console.log("error", error);

    dispatch({
      type: SEARCH_COIN_FAILURE,
      payload: error.message,
    });
  }
};
