import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import PublicServers from "./components/publicServers/publicServers";
import SelectedServer from "./components/selectedServer/selectedServer"
import CreateServerForm from "./components/createServer/createServer";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/servers/new">
            <CreateServerForm />
          </Route>
          <Route exact path="/servers/:serverId">
            <SelectedServer />
          </Route>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/servers">
            <PublicServers />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
