import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
const Home = () => import('../views/home/Home')
const About = () => import('../views/about/About')

const RouteInstance = () => (
  <Router>
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
      <hr />
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
    </div>
  </Router>
)
export default RouteInstance
