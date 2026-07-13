import { COOKIE_OPTIONS } from "../../constants/index.js";

const sendToken = (res, token) => {
  res.cookie("token", token, COOKIE_OPTIONS);
};

export default sendToken;
