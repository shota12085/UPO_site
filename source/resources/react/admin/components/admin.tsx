import React from 'react';
import { LeftSide } from './left_side';
import {Row, Col} from 'react-bootstrap';


export const Admin: React.FC = (): JSX.Element => {
  return (
    <Row>
      <Col sm={3} style={{background:"#fff"}}>
          <LeftSide />
      </Col>
      <Col sm={9}>

      </Col>
    </Row>
  );
};