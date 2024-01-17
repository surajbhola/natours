/* eslint-disable */
// const axios = require('axios');
import axios from "axios";
// const showAlert  = require('./alerts');
import { showAlert } from "./alerts";
console.log("login chlgya");
// axios.defaults.withCredentials = true;

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/users/login",
      data: {
        email,
        password,
      },
    });

    if (res.data.status === "success") {
      showAlert("success", "Logged in successfully!");
      window.setTimeout(() => {
        location.assign("/");
      }, 1500);
    }
  } catch (err) {
    console.log(err.response.data.message);
    showAlert("error", err.response.data.message);
  }
};

export async function logout() {
  try {
    const res = await axios({
      method: "GET",
      url: "/api/v1/users/logout",
    });
    if ((res.data.status === "success")) {
      showAlert("success", "Logged out successfully!");
      window.setTimeout(() => {
        location.assign("/");
      }, 1500);
      // location.reload(true);
    }
  } catch (err) {
    console.log(err.response);
    showAlert("error", "Error logging out! Try again.");
  }
}
