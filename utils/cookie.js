// cookie.js
import { Cookies } from 'universal-cookie';

const cookies = new Cookies();

export function setCookie(name, value, options) {
  cookies.set(name, value, options);
}

export function getCookie(name) {
  return cookies.get(name);
}

export function removeCookie(name, options) {
  cookies.remove(name, options);
}
