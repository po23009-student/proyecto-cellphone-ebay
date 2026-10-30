import { defineBoot } from '#q-app'
import axios from 'axios'

const api = axios.create({
  baseURL: 'https://couchdbbackend.esaapp.com',
  auth: {
    username: 'fpiimagenes',
    password: 'OdioFirebaseCerroStorage2026uesMINERVA',
  },

  /*baseURL: 'http://localhost:5984',
  auth: {
    username: 'admin',
    password: 'theWall321',
  },*/
})

export default defineBoot(({ app }) => {
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
})

export { api }
