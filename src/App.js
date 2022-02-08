import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignUp from './components/SignUp/SignUp';
import BillingHistory from './components/BillingHistory/BillingHistory';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import NotFound from './components/NotFound/NotFound';

function App() {
  return (
    <div className="App">
        <Router>
        <Switch>
            <Route exact path='/'>
              <Login></Login>
            </Route>
            <Route path='/signup'>
              <SignUp></SignUp>
            </Route>
            <Route path='/billing'>
                <BillingHistory />
            </Route>
            <Route path='/dashboard'>
                <Dashboard />
            </Route>
           <Route path="*">
                  <NotFound></NotFound>
            </Route>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
