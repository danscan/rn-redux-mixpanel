import { Buffer } from 'buffer'
import request from 'superagent'

// Configuration Constants
const DEBUG = process && process.env && process.env['NODE_ENV'] === 'development'

// Mixpanel Service Constants
const MIXPANEL_REQUEST_PROTOCOL = 'http'
const MIXPANEL_HOST = 'api.mixpanel.com'

export default sendMixpanelRequest = ({ endpoint, data }) => {
  const requestDataString = JSON.stringify(data)
  const requestDataBase64String = new Buffer(requestDataString).toString('base64')

  const requestUrl = `${MIXPANEL_REQUEST_PROTOCOL}://${MIXPANEL_HOST}${endpoint}`
  const req = request
    .get(requestUrl)
    .query(`data=${requestDataBase64String}`)
    .end((error, res) => {
      if (!DEBUG) {
        return
      }

      console.log('mixpanel request:', req)
      if (error)
        console.log('mixpanel error:', error)
      console.log('mixpanel response:', res)
    })

  return req
}
