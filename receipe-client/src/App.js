import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import HomePage from './Components/HomePage';
import AddReceipeDetails from './Admin/AddReceipeDetails';
import ReceipeType from './Components/ReceipeType';
import ReceipeDetails from './Components/ReceipeDetails';
import ManageReceipe from './Admin/ManageReceipe';
import LoginPage from './Components/LoginPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={HomePage}></Route>
          <Route exact path='/login' component={LoginPage}></Route>
          <Route exact path='/addreceipe' component={AddReceipeDetails}></Route>
          <Route exact path='/editreceipe/:id' component={AddReceipeDetails}></Route>
          <Route exact path='/manage' component={ManageReceipe}></Route>
          <Route exact path='/:type' component={ReceipeType}></Route>
          <Route exact path='/:type/:id' component={ReceipeDetails}></Route>
          
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
