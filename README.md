# rn-redux-mixpanel
Configurable redux middleware that sends your actions to Mixpanel.  It also works with React Native ;)

### Installation
```
npm install --save rn-redux-mixpanel
```

### Usage
Configure the `mixpanel` redux middleware by invoking with an options object, containing:

1. `token` – Your Mixpanel application token.
2. `selectDistinctId` – A selector function that returns the `distinct_id` (user id), given your store state.
3. `blacklist` – An optional array of blacklisted action types.

```javascript
// store/index.js
import { createStore, combineReducers, applyMiddleware } from 'redux'
import * as reducers from '../reducers/index'

import mixpanel from 'rn-redux-mixpanel'
const middleware = [
  mixpanel({
    // Mixpanel API token
    token: YOUR_MIXPANEL_TOKEN,

    // Selector that returns the value to use for `distinct_id`
    selectDistinctId: state => state.session ? state.session.userId : null,

    // Blacklisted action types
    blacklist: ['INIT_PERSISTENCE', 'HYDRATE', 'SESSION_ACTIVITY'] 
  }),
]

const reducer = combineReducers(reducers)
const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore)
const store = createStoreWithMiddleware(reducer)

export default store
```