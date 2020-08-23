import axios from "axios";
import env from "../configs/env-config";

function deleteDevice(idDevice) {
  return axios
    .delete(`${env.REACT_APP_URL}/device/remove/${idDevice}`)
    .then((res) => {
      const { data } = res;
      return data;
    });
}

function createDevice(deviceData) {
  return axios.post(`${env.REACT_APP_URL}/device/add`, deviceData);
}

export { deleteDevice, createDevice };
