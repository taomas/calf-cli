import React from 'react'
import { BrowserRouter, Route, Link, Redirect, Switch } from 'react-router-dom'
import '@/assets/style/index.css'
import Home from './views/Home'
import Login from './views/Login'

const PrimaryLayout = () => (
  <div className="primary-layout">
    <header>React App</header>
    <div className="links">
      <Link to="/home">home</Link>
      <Link to="/login">Login</Link>
    </div>
    <main>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Redirect to="/" />
      </Switch>
    </main>
  </div>
)

const App = () => (
  <BrowserRouter>
    <PrimaryLayout />
  </BrowserRouter>
)
export default App
