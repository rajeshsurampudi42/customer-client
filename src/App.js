import logo from './logo.svg';
import './App.css';
import CustomersContainer from './customers/containers/CustomersContainer';
import { Fragment } from 'react';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';


function App() {

  const routes = () => (
    <Router>
      <Switch>
        <Route path="/customers" component={CustomersContainer}>
        </Route>
        <Route path="/">
          <Redirect to="/customers" />
        </Route>
      </Switch>
    </Router>
  )
  return (
    <Fragment>
      <div className="App">
        <header className="App-header">
          <div className="customContainer">
            {routes()}
          </div>
        </header>
      </div>
    </Fragment>
  );
}

export default App;
