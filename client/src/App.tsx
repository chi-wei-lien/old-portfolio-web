import React from 'react';
import logo from './logo.svg';
import './App.css';
import MyNavbar from './components/navbar/navbar';
import LifeMotto from './components/index/LifeMotto';
import SelfPortrait from './components/index/SelfPortrait';
import ToolBar from './components/index/ToolBar';
import { Row, Container, Col } from 'react-bootstrap';

import './style/index/index.css';

//import boostrap css
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <MyNavbar />
      <Container fluid>
        <Row>
          <LifeMotto />
          <SelfPortrait />
        </Row>
        <ToolBar />
      </Container>
    </>
  );
}

export default App;
