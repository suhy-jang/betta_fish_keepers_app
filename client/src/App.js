import React, { useEffect } from 'react'
import NavBar from './components/layouts/NavBar'
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './components/routing/Routes'
import { Provider } from 'react-redux'
import { loadUser } from './actions/auth'
import store from './utils/store'
import './App.css'
import './tailwind.css'

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <NavBar />
        <Routes />
      </Router>
    </Provider>
  )
}

export default App
