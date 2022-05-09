import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import { useState } from "react";
import Qrpage from 'views/page/Qrpage';

const App = () => {

    const [userName, setUserName] = useState('test');

    return (
    <Switch>
      <Route path="/admin" render={(props) => <AdminLayout {...props} userName={userName} setUserName={setUserName}/>} />
      <Route path="/auth" render={(props) => <AuthLayout {...props} userName={userName} setUserName={setUserName}/>} />
      <Route path="/untact" render={(props) => <Qrpage></Qrpage>} />
      <Redirect from="/" to="/auth/login" />      
    </Switch>
    );
};

export default App;