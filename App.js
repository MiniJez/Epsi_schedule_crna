import React from 'react'
import AppNavigator from './src/component/navigation/AppNavigator'
import { Provider } from 'react-redux'
import Store from './src/redux/store'

class App extends React.Component {
  render() {
    return(
      <Provider store={Store}>
        <AppNavigator />
      </Provider>
    )
  }
}

export default App;
