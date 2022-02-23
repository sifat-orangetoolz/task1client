import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BillingHistory from './components/BillingHistory/BillingHistory';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import NotFound from './components/NotFound/NotFound';
import Packages from './components/Packages/Packages';
import StripePayment from './components/Payment/StripeContainer/StripePayment';

function App() {
  return (
    <div className="App">
        <Router>
        <Switch>
            <Route exact path='/'>  
               <Dashboard />
            </Route>
            <Route path='/login'>
              <Login></Login>
            </Route>
            <Route path='/packages'>
                <Packages />
            </Route>
            <Route path='/payment/:packageId/:title/:amount/:validity'>
                <StripePayment />
            </Route>

            <Route path='/dashboard'>
                <Dashboard />
            </Route>
            <Route path='/billing'>
                <BillingHistory />
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
