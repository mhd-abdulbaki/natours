/*eslint-disable */
import axios from "axios";
import { showAlert } from "./alerts";

//type is either 'password' or 'data'
export const updateSettings = async (data, type) => {
  try {
    const url = type === "password" ? "users/update-password" : "users/me";

    const res = await axios({
      method: "PATCH",
      url: `http://localhost:3000/api/v1/${url}`,
      data,
    });
    if (res.data.status === "success") {
      showAlert("success", `${type} updated successfully!`);
    }
  } catch (error) {
    showAlert("error", error.response.data.message);
  }
};
