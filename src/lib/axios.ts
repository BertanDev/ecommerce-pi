import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://www.vitorads.com.br',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})
