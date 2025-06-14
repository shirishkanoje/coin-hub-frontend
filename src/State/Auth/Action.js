import axios from "axios";
import {
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "./ActionTypes";

const baseUrl = "https://coin-hub-backend-production.up.railway.app";

// ✅ REGISTER USER
export const register = (userData, navigate) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });

  try {
    const response = await axios.post(`${baseUrl}/auth/signup`, {
      fullName: userData.fullName,
      email: userData.email,
      password: userData.password,
    });

    const user = response.data;
    console.log("REGISTER RESPONSE", user);

    if (user?.jwt) {
      localStorage.setItem("jwt", user.jwt);
      dispatch({ type: REGISTER_SUCCESS, payload: user.jwt });

      // ✅ Navigate to login or dashboard after registration
      navigate("/login");
    } else {
      dispatch({ type: REGISTER_FAILURE, payload: "JWT not received" });
    }
  } catch (error) {
    dispatch({ type: REGISTER_FAILURE, payload: error.message });
    console.error("REGISTER ERROR", error);
  }
};

// ✅ LOGIN USER
export const login = (userData, navigate) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });

  try {
    const response = await axios.post(`${baseUrl}/auth/signin`, {
      email: userData.email,
      password: userData.password,
    });

    const user = response.data;
    console.log("LOGIN RESPONSE", user);

    if (user?.jwt) {
      localStorage.setItem("jwt", user.jwt);
      dispatch({ type: LOGIN_SUCCESS, payload: user.jwt });
      navigate("/"); // ✅ Redirect after login
    } else {
      dispatch({ type: LOGIN_FAILURE, payload: "JWT not received" });
    }
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error.message });
    console.error("LOGIN ERROR", error);
  }
};

// ✅ GET USER PROFILE
export const getUser = () => async (dispatch) => {
  dispatch({ type: GET_USER_REQUEST });

  const jwt = localStorage.getItem("jwt");

  if (!jwt) {
    console.warn("JWT not found. Aborting user fetch.");
    dispatch({ type: GET_USER_FAILURE, payload: "JWT missing" });
    return;
  }

  try {
    const response = await axios.get(`${baseUrl}/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    const user = response.data;
    console.log("USER PROFILE", user);

    dispatch({ type: GET_USER_SUCCESS, payload: user });
  } catch (error) {
    dispatch({ type: GET_USER_FAILURE, payload: error.message });
    console.error("GET USER ERROR", error);
  }
};

// ✅ LOGOUT
export const logout = () => (dispatch) => {
  localStorage.clear();
  dispatch({ type: LOGOUT, payload: null });
};
