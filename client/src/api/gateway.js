import axios from "axios";
import env from "../configs/env-config";

function gateWayList() {
  return axios.get(`${env.REACT_APP_URL}/gateway/all`).then((res) => {
    const { data } = res;
    return data;
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
