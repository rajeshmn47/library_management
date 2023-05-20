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

import {
  LOAD_BOOKS_FAIL,
  LOAD_BOOKS_REQUEST,
  LOAD_BOOKS_SUCCESS,
} from "../constants/bookConstants";

const headers = {
  Accept: "application/json",
};

export const getbooks = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_BOOKS_REQUEST });
    const { data } = await axios.get(`${URL}/getbooks`);
    console.log(data);
    dispatch({ type: LOAD_BOOKS_SUCCESS, payload: data.data });
  } catch (error) {
    console.log(error.response, "asdfgh");
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};
