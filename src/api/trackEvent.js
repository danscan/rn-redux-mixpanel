import sendMixpanelRequest from './sendMixpanelRequest'

// Configuration Constants
const MIXPANEL_TRACK_ENDPOINT = '/track'

export default trackEvent = ({ token, eventName, distinctId, eventData = {} }) => {
  // Build event properties
  const eventProperties = {
    token,
    'distinct_id': distinctId,
    ...eventData,
  }

  // Build request data for event track request
  const trackRequestData = {
    event: eventName,
    properties: eventProperties,
  }
  
  return sendMixpanelRequest({
    endpoint: MIXPANEL_TRACK_ENDPOINT,
    data: trackRequestData,
  })
}