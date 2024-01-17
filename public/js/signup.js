/* eslint-disable */
// const axios = require('axios');
import axios from "axios";
// const showAlert  = require('./alerts');
import { showAlert } from "./alerts";
console.log("signup  chlgya");
// axios.defaults.withCredentials = true;

export const signup = async (name, email, password, passwordConfirm) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/users/signup",
      data: {
        name,
        email,
        password,
        passwordConfirm,
      },
    });
    console.log(res);
    if (res.data.status === "success") {
      showAlert("success", "Signup  successfully!");
      window.setTimeout(() => {
        location.assign("/");
      }, 1500);
    }
  } catch (err) {
    console.log(err.response.data.message);
    showAlert("error", err.response.data.message);
  }
};

