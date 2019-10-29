import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { AboutPage } from './pages/AboutPage';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ProfilePage, profilePagePath } from './pages/ProfilePage';

export default function Routes() {
  return (
    <Switch>
      <Route path="/about">
        <AboutPage />
      </Route>
      <Route path="/register">
        <RegisterPage />
      </Route>
      <Route path="/login">
        <LoginPage />
      </Route>
      <Route path="/about">
        <AboutPage />
      </Route>
      <Route path={profilePagePath()}>
        <ProfilePage />
      </Route>
      <Route path="/">
        <HomePage />
      </Route>
    </Switch>
  );
}
