import sendMixpanelRequest from './sendMixpanelRequest'

// Configuration Constants
const MIXPANEL_ENGAGE_ENDPOINT = '/engage'

export default updateUserProfile = ({ token, distinctId, userProfileData }) => {
  // Build request data for engage request
  const engageRequestData = {
    '$token': token,
    '$distinct_id': distinctId,
    '$set': userProfileData,
  }

  return sendMixpanelRequest({
    endpoint: MIXPANEL_ENGAGE_ENDPOINT,
    data: engageRequestData,
  })
}