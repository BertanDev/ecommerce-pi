import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://www.vitorads.com.br',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})
