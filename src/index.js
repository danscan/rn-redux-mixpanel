import trackEvent from './api/trackEvent'
import updateUserProfile from './api/updateUserProfile'

export default mixpanel = ({ token, selectDistinctId = ()=>null, selectUserProfileData = ()=>null, blacklist = [] }) => store => next => action => {
  // Don't track if action type is in blacklist or is falsey
  const actionIsBlacklisted = blacklist.indexOf(action.type) >= 0
  if (actionIsBlacklisted || !action.type) {
    return next(action)
  }

  // Get store state; select distinct id for action & state
  const state = store.getState()
  const distinctId = selectDistinctId(action, state)
  
  // Track action event with Mixpanel
  trackEvent({
    token,
    distinctId,
    eventName: action.type,
  })

  // Select user profile data for action; if it selects truthy data,
  // update user profile on Mixpanel
  const userProfileData = selectUserProfileData(action, state)
  if (userProfileData) {
    updateUserProfile({
      token,
      distinctId,
      userProfileData,
    })
  }

  return next(action)
}