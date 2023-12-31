import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/signupFormPage";
import LoginFormPage from "./components/loginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/navigation";
import PublicServers from "./components/publicServers/publicServers";
import SelectedServer from "./components/selectedServer/selectedServer"
import CreateServerForm from "./components/createServer/createServer";
import UpdateServerForm from "./components/updateServerModal/updateServer";
import CreateChannelForm from "./components/createChannel/createChannel";
import UpdateChannelForm from "./components/updateChannelModal/updateChannel";
import SelectedChannel from "./components/selectedChannel/selectedChannel";
import LandingPage from "./components/landingPage/landingPage";
import Main from "./components/mainComponent/mainComponent"
import { useSelector } from "react-redux";
import ServerLanding from "./components/serverLanding/serverLanding";

function App() {
  const dispatch = useDispatch();
  const  user  = useSelector(state => state.session.user)
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/main/:serverId/:channelId">
            <Main />
          </Route>
          <Route exact path="/servers/new">
            <CreateServerForm />
          </Route>
          <Route exact path="/servers/:serverId">
            <SelectedServer />
          </Route>
          <Route exact path="/servers/:serverId/:channelId/update">
            <UpdateChannelForm />
          </Route>
          <Route exact path="/servers/:serverId/new">
            <CreateChannelForm />
          </Route>
          <Route exact path="/servers/:serverId/update">
            <UpdateServerForm />
          </Route>
          <Route exact path="/servers/:serverId/:channelId">
            <SelectedChannel />
          </Route>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/servers">
            <ServerLanding />
          </Route>
          <Route exact path="/">
            <LandingPage user={user}/>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
