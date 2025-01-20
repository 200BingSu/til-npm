import { atom } from "recoil";

export const userInfo = atom({
  key: "userinfo",
  default: {
    userId: 0,
    roleId: 0,
    name: "",
    email: "",
    phone: "",
    birth: "",
    nickName: "",
    createdAt: "",
    // accessToken을 보관하는 것은 비추
  },
});
