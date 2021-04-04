import React from 'react';
import { TopPage } from './toppage';
import { Login } from './login';
import { LeftSide } from './left_side';
import {Row, Col} from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch, redirect } from "react-router-dom";


export const Admin: React.FC = (): JSX.Element => {
  return (
    <Router>
      <Row style={{height:"100vh"}}>
        <Col sm={3} style={{background:"#fff"}}>
            <LeftSide />
        </Col>
        <Col sm={9}>
            <Switch>
              <Route path="/admin" component={TopPage} exact />
              <Route path="/admin/login" component={Login} exact />
            </Switch>
        </Col>
      </Row>
    </Router>
  );
};