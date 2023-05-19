import axios from "axios";
import {
  REGISTER_USER_SUCCESS,
  REGISTER_USER_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_FAIL,
  REGISTER_USER_FAIL,
  LOAD_USER_SUCCESS,
  LOAD_USER_REQUEST,
  LOAD_USER_FAIL,
  URL,
} from "../constants/userConstants";

const headers = {
  Accept: "application/json",
};
export const register = (myform) => async (dispatch) => {
  try {
    console.log(myform);
    dispatch({ type: REGISTER_USER_REQUEST });
    const { data } = await axios.post(`${URL}/auth/register`, { ...myform });
    console.log(data);
    localStorage.setItem("server_token", data.token);
    dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
  } catch (error) {
    console.log(error.response, "asdfgh");
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const login = (myform) => async (dispatch) => {
  try {
    console.log(myform);
    dispatch({ type: LOGIN_REQUEST });
    const { data } = await axios.post(`${URL}/auth/login`, { myform });
    console.log(data);
    localStorage.setItem("server_token", data.token);
    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    console.log(error.response, "asdfgh");
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    console.log("rajivya");
    dispatch({ type: LOAD_USER_REQUEST });
    const servertoken =
      localStorage.getItem("server_token") &&
      localStorage.getItem("server_token");
    const data = await axios(`${URL}/auth/loaduser`, {
      method: "get",
      headers: {
        ...headers,
        "Content-Type": "application/json",
        servertoken: servertoken,
      },
    });
    console.log(data);
    if (data.data.message) {
      dispatch({ type: LOAD_USER_SUCCESS, payload: data.data.message });
    } else {
      dispatch({ type: LOAD_USER_FAIL });
    }
  } catch (error) {
    dispatch({ type: LOAD_USER_FAIL });
    console.log(error);
  }
};

export const logout = () => async (dispatch) => {
  try {
    localStorage.removeItem("server_token");
    window.location.reload();
  } catch (error) {
    console.log(error.response, "asdfgh");
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};
