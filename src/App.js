import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import './styles/main.scss'

// 引用组件
import Login from './views/login/index'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route component={Login} exact path="/"></Route>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
