import { legacy_createStore, applyMiddleware, combineReducers } from "redux";
// import { composeWithDevTools } from "redux-devtools-extension"; // 🌟 yeh import important hai
import { thunk } from "redux-thunk";

import authReducer from "./Auth/Reducer";
import coinReducer from "./Coin/Reducer";  // ya Reducer1, whichever is right
import walletReducer from "./Wallet/Reducer";
import withdrawalReducer from "./Withdrawal/Reducer";
import orderReducer from "./Order/Reducer";
import assetReducer from "./Asset/Reducer";
import watchlistReducer from "./Watchlist/Reducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  coin: coinReducer,
  wallet: walletReducer,
 withdrawal: withdrawalReducer,
 order:orderReducer,
 asset:assetReducer,
 watchlist:watchlistReducer

});

export const store = legacy_createStore(
  rootReducer,(applyMiddleware(thunk))
);
