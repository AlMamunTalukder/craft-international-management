/* eslint-disable @typescript-eslint/no-explicit-any */

import Cookies from "js-cookie";

export const setCookie = (key: string, value: any, options = {}) => {
  Cookies.set(key, value, options);
};

export const getCookie = (key: string) => {
  return Cookies.get(key);
};

export const removeCookie = (key: string) => {
  Cookies.remove(key);
};
