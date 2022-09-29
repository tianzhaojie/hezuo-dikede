import Cookies from 'js-cookie'

const TokenKey = 'user-token' // 第一一个唯一的键名

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

