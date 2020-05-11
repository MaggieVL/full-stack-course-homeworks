import React from 'react';
import './App.css';
import Login from './Login';
import UserForm from './user-form';
import {Route, Link, Switch, BrowserRouter as Router} from 'react-router-dom';
import AddRecipe from './add-recipe';
import AllRecipes from './all-recipes';
import AllUsers from './all-users';
import SearchRecipes from './search-recipes';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to='/'>Register</Link>
            </li>
            <li>
              <Link to='/login'>Login</Link>
            </li>
            <li>
              <Link to='/add-recipe'>Add Recipe</Link>
            </li>
            <li>
              <Link to='/all-recipes'>All Recipes</Link>
            </li>
            <li>
              <Link to='/all-users'>All Users</Link>
            </li>
            <li>
              <Link to='/search-recipes'>Search Recipes</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route exact path='/' component={UserForm}/>
          <Route exact path='/users/edit/:id' component={UserForm}/>
          <Route path='/login' component={Login}/>
          <Route path='/add-recipe' component={AddRecipe}/>
          <Route path='/recipes/edit/:id' component={AddRecipe}/>
          <Route path='/all-recipes' component={AllRecipes}/>
          <Route path='/all-users' component={AllUsers}/>
          <Route path='/search-recipes' component={SearchRecipes}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
