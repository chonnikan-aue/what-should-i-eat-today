import React from "react";
import Food from "./Food";
import Row from "react-bootstrap/Row";
import { useState } from "react";
import SeeRecipeButton from "./SeeRecipeButton/SeeRecipeButton";
import { Col } from "react-bootstrap";

const FoodList = (props) => {
  let [count, setCount] = useState(0);

  return (
    <Row>
      {props.chosenFood[0] && props.chosenFood[1] ? (
        <Row>
          {Object.keys(props.chosenFood[0]).length !== 0 ? (
            <Col>
              <Food
                chosenFood={props.chosenFood}
                setChosenFood={props.setChosenFood}
                foodNum={0}
                count={count}
                setCount={setCount}
              ></Food>
              {Object.keys(props.chosenFood[1]).length === 0 ? (
                <SeeRecipeButton />
              ) : null}
            </Col>
          ) : null}
          {Object.keys(props.chosenFood[1]).length !== 0 ? (
            <Col>
              <Food
                chosenFood={props.chosenFood}
                setChosenFood={props.setChosenFood}
                foodNum={1}
                count={count}
                setCount={setCount}
              ></Food>
              {Object.keys(props.chosenFood[0]).length === 0 ? (
                <SeeRecipeButton />
              ) : null}
            </Col>
          ) : null}
        </Row>
      ) : null}
    </Row>
  );
};

export default FoodList;
