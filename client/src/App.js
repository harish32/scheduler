import React from "react";
import Dashboard from "./Dashboard.js";
import Navbar from "./Navbar";
import Login from "./login";
import { Switch, Route } from "react-router-dom";
import Newbatch from "./newbatch";
import Batches from "./Batches";
import Batch from "./Batch";
import AddSchedule from "./AddSchedule";
import ViewSchedules from "./ViewSchedules";
import SingleSchedule from "./SingleSchedule";
import Logout from "./logout";
import Profile from "./Profile";
import SwitchBatches from "./SwitchBatches";
import NotFound from "./NotFound";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";

function App(props) {
  return (
    <Navbar>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <PrivateRoute exact path="/schedules" component={ViewSchedules} />
        <PrivateRoute exact path="/bookslot" component={ViewSchedules} />
        <PrivateRoute exact path="/profile" component={Profile} />
        <AdminRoute exact path="/SwitchBatches" component={SwitchBatches} />
        <PrivateRoute exact path="/bookslot/:id" component={SingleSchedule} />
        <AdminRoute exact path="/schedules/add" component={AddSchedule} />
        <PrivateRoute exact path="/schedules/:id" component={SingleSchedule} />
        <AdminRoute
          exact
          path="/schedules/:id/edit"
          edit={true}
          component={AddSchedule}
        />
        <Route
          exact
          path="/user/login"
          render={props => <Login {...props} />}
        />
        <Route exact path="/user/logout" render={() => <Logout />} />
        <AdminRoute exact path="/batches/add" component={Newbatch} />
        <AdminRoute exact path="/batches/view" component={Batches} />
        <AdminRoute exact path="/batches/view/:id" component={Batch} />
        <Route component={NotFound} />
      </Switch>
    </Navbar>
  );
}

export default App;
