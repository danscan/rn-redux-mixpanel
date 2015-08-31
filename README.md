# redux-mixpanel
Configurable redux middleware that sends your actions to Mixpanel.  It also works with React Native ;)

### Installation
```
npm install --save rn-redux-mixpanel
```

### Usage
```javascript
// store/index.js
import { createStore, combineReducers, applyMiddleware } from 'redux'
import * as reducers from '../reducers/index'

import mixpanel from 'rn-redux-mixpanel'
const middleware = [
  mixpanel({
    // Mixpanel API token
    token: YOUR_MIXPANEL_TOKEN,

    // Function that returns the value to use for `distinct_id`
    getDistinctId: state => state.session ? state.session.userId : null,

    // Blacklisted action types
    blacklist: ['INIT_PERSISTENCE', 'HYDRATE', 'SESSION_ACTIVITY'] 
  }),
]

const reducer = combineReducers(reducers)
const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore)
const store = createStoreWithMiddleware(reducer)

export default store
```