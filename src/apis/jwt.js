import axios from "axios";
import { getCookie, setCookie } from "../utils/cookie";

const jwtAxios = axios.create();
// axios 호출시 사전 옵션을 설정합니다.
// 1. 호출 즉 백엔드로 Request 하기 전에 옵션 붙이기
const beforeReq = config => {
  console.log("1. 요청 전에 먼저 전달", config);
  //   1. 쿠키 읽기
  const accessToken = getCookie(`accessToken`);
  //   2.  쿠기가 없는 경우
  if (!accessToken) {
    // 에러 메세지 리턴
    return Promise.reject({
      response: { data: { error: "Login을 해 인증이 필요합니다." } },
    });
  }
  //   3. 정상적으로 인증키가 있다면
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
};
const failReq = err => {
  console.log("failReq Err", err);
  return Promise.reject(err);
};
// Response 즉, 회신 전에 처리함
const beforeRes = async res => {
  console.log("2. 요청의 결과 전처리", res);
  //   항상 결과가 정상적으로 오면 혹시 모를 jwt 키 변경이 될 수도 있다.
  const result = await axios.get(`/api/user/access-token`);
  setCookie(`accessToken`, result.data.resultData);
  // accessToken을 새롭게 호출
  return res;
};
const failRes = async err => {
  console.log(`failRes 에러`, err);
  //   항상 결과가 정상적으로 오면 혹시 모를 jwt 키 변경이 될 수도 있다.
  const result = await axios.get(`/api/user/access-token`);
  setCookie(`accessToken`, result.data.resultData);
  return Promise.reject(err);
};

jwtAxios.interceptors.request.use(beforeReq, failReq);
jwtAxios.interceptors.response.use(beforeRes, failRes);

export default jwtAxios;
