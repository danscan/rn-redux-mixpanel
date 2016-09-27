import sendMixpanelRequest from './sendMixpanelRequest'

// Configuration Constants
const MIXPANEL_ENGAGE_ENDPOINT = '/engage'

export default function updateUserProfile ({ token, distinctId, userProfileData }, once = false) {
  // Build request data for engage request
  const engageRequestData = {
    '$token': token,
    '$distinct_id': distinctId,
  }

  if (once) {
    engageRequestData['$set_once'] = userProfileData
  } else {
    engageRequestData['$set'] = userProfileData
  }

  return sendMixpanelRequest({
    endpoint: MIXPANEL_ENGAGE_ENDPOINT,
    data: engageRequestData,
  })
}
