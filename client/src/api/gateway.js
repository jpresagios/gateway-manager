import axios from "axios";
import env from "../configs/env-config";

console.log("------------------");
console.log(env.REACT_APP_URL);
console.log("------------------");

function gateWayList() {
  return axios
    .get(`${env.REACT_APP_URL}/gateway/all`)
    .then((res) => {
      const { data } = res;
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
}

function createGateWay(gatewayData) {
  return axios.post(`${env.REACT_APP_URL}/gateway/insert`, gatewayData);
}

function detailGateWay(idDetail) {
  return axios
    .get(`${env.REACT_APP_URL}/gateway/detail/${idDetail}`)
    .then((res) => {
      const { data } = res;
      return data;
    });
}

export { gateWayList, createGateWay, detailGateWay };
