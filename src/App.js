import { BrowserRouter, NavLink, Redirect, Route, Switch, useParams, useRouteMatch } from "react-router-dom";

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <h1>App Layout</h1>
        <NavLink to="/users">Users List</NavLink>
        <Switch>
          <Route path="/" exact component={Main}/>
          <Route path="/users" component={UsersLayout}/>
          <Redirect to="/"/>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

function Main() {
  return (
    <>
      <h1>Main Page</h1>
    </>
  )
};

function UsersLayout() {
  const {path} = useRouteMatch();
  return (
    <>
      <h2>UsersLayout</h2>
      <NavLink to="/">Main Page</NavLink>
      <Switch>
        <Route path={path} exact component={UsersListPage}/>
        <Route path={path + "/:userId/profile"} component={UserProfilePage}/>
        <Route path={path + "/:userId/edit"} component={EditUserPage}/>
        <Redirect from={path + "/:userId"} to={path + "/:userId/profile"}/>
      </Switch>
    </>
  )
};

function UsersListPage() {
  const {path} = useRouteMatch();
  return (
    <>
    <h2>Users List Page</h2>
    <ul>
      {new Array(5).fill("").map((_, index) => <li key={"user" + index}>
        <NavLink to={`${path}/${index}`}>User: {index}</NavLink>
      </li>)}
    </ul>
    </>
  );
};

function UserProfilePage() {
  const {userId} = useParams();
  return (
    <>
      <h2>User Profile Page</h2>
      <p>UserId: {userId}</p>

      <ul>
        <li>
          <NavLink to={`/users/${userId}/edit`}>Edit</NavLink>
        </li>
        <li>
          <NavLink to="/users">Users List</NavLink>
        </li>
      </ul>
    </>
  )
};

function EditUserPage() {
  const {userId} = useParams();
  return (
    <>
      <h2>Edit User Page</h2>
      <ul>
        <li>
          <NavLink to={"/users/" + userId}>User Page</NavLink>
        </li>
        <li>
          <NavLink to={"/users/" + (+userId + 1)}>Another User</NavLink>
        </li>
        <li>
          <NavLink to="/users">Users List</NavLink>
        </li>
      </ul>
    </>
  )
};

export default App;
