import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Header from "./Header";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const Home = (props) => {
  return (
    <Container>
      <Row>
        <Header headerText={props.headerText}></Header>
      </Row>
      <Row>
        <Link to="/random">
          <Button type="button" variant="info" size="lg">
            Random me anything!
          </Button>
        </Link>
        <Link to="/category">
          <Button type="button" variant="info" size="lg">
            I want to eat...
          </Button>
        </Link>
      </Row>
    </Container>
  );
};

export default Home;
