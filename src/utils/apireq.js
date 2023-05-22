import { resolveComponentProps } from "@mui/base";
import axios from "axios";
import { URL } from "../constants/userConstants";

const headers = {
  Accept: "application/json",
};
const servertoken =
  localStorage.getItem("server_token") && localStorage.getItem("server_token");

export async function addbook(myform) {
  try {
    const data = await axios(`${URL}/addbook`, {
      method: "post",
      headers: {
        ...headers,
        "Content-Type": "application/json",
        servertoken: servertoken,
      },
      data: myform,
    });
    return data;
  } catch (e) {
    throw Error;
  }
}

export async function deletebook(id) {
  try {
    const data = await axios(`${URL}/delete/${id}`, {
      method: "get",
      headers: {
        ...headers,
        "Content-Type": "application/json",
        servertoken: servertoken,
      },
    });
    return data;
  } catch (e) {
    throw Error;
  }
}

export async function editbook(id, myform) {
  try {
    const data = await axios(`${URL}/edit/${id}`, {
      method: "post",
      headers: {
        ...headers,
        "Content-Type": "application/json",
        servertoken: servertoken,
      },
      data: myform,
    });
    return data;
  } catch (e) {
    throw Error;
  }
}
