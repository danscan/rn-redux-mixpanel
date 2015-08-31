import { Buffer } from 'buffer'
import request from 'superagent'

// Configuration Constants
const DEBUG = process.env['NODE_ENV'] === 'development'

// Mixpanel Service Constants
const MIXPANEL_REQUEST_PROTOCOL = 'http'
const MIXPANEL_HOST = 'api.mixpanel.com'
const MIXPANEL_TRACK_ENDPOINT = '/track'

export default mixpanel = ({ token, selectDistinctId = ()=>null, blacklist = [] }) => store => next => action => {
  // Don't track if action type is in blacklist or is falsey
  const actionIsBlacklisted = blacklist.indexOf(action.type) >= 0
  if (actionIsBlacklisted || !action.type) {
    return next(action)
  }

  // Get state & action data; build event properties
  const state = store.getState()
  const eventName = action.type
  const eventDistinctId = selectDistinctId(state)
  const eventProperties = {
    'token': token,
    'distinct_id': eventDistinctId,
  }

  // Build request data for event track request; convert to Base64-encoded JSON string
  const eventTrackRequestData = {
    event: eventName,
    properties: eventProperties,
  }
  const eventTrackRequestDataString = JSON.stringify(eventTrackRequestData)
  const eventTrackRequestDataBase64String = new Buffer(eventTrackRequestDataString).toString('base64')

  // Track action with mixpanel
  const eventTrackRequestUrl = `${MIXPANEL_REQUEST_PROTOCOL}://${MIXPANEL_HOST}${MIXPANEL_TRACK_ENDPOINT}`
  const req = request
    .get(eventTrackRequestUrl)
    .query({ data: eventTrackRequestDataBase64String })
    .end((error, res) => {
      if (!DEBUG) {
        return
      }

      console.log('mixpanel request:', req)
      if (error)
        console.log('mixpanel error:', error)
      console.log('mixpanel response:', res)
    })

  return next(action)
}