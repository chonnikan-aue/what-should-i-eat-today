import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import axios from "axios";
import FoodList from "../FoodList/FoodList";
import Header from "../Header/Header";

const Random = (props) => {
  const filter = useParams().filter;
  const categoryName = useParams().categoryName;
  let [chosenFood, setChosenFood] = useState([]);
  let [dataLength, setDataLength] = useState(8);
  let [dataIndexUsed, setDataIndexUsed] = useState([]);

  const randomFood = () => {
    axios
      .get("https://www.themealdb.com/api/json/v1/1/random.php")
      .then((res) => {
        const data = res.data.meals[0];
        setChosenFood((prevState) => [
          ...prevState,
          {
            foodId: data.idMeal,
            foodPic: data.strMealThumb,
            foodName: data.strMeal,
          },
        ]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const randomSpecificFood = () => {
    axios
      .get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?${filter}=${categoryName}`
      )
      .then((res) => {
        const allData = res.data.meals;
        const random = Math.floor(Math.random() * allData.length);
        const data = allData[random];
        setChosenFood((prevState) => [
          ...prevState,
          {
            foodId: data.idMeal,
            foodPic: data.strMealThumb,
            foodName: data.strMeal,
          },
        ]);
        setDataLength(allData.length);
        setDataIndexUsed((prevState) => [...prevState, random]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    props.setHeaderText("What should I eat today?");
    props.activeNav(props.randomAll);
    if (filter === "all") {
      randomFood();
      randomFood();
    } else {
      randomSpecificFood();
      randomSpecificFood();
    }
  }, []);

  return (
    <Container>
      <Row>
        <Header headerText={props.headerText} />
      </Row>
      <Row className="dotted-border">
        <FoodList
          chosenFood={chosenFood}
          setChosenFood={setChosenFood}
          setHeaderText={props.setHeaderText}
          dataLength={dataLength}
          dataIndexUsed={dataIndexUsed}
          setDataIndexUsed={setDataIndexUsed}
        />
      </Row>
    </Container>
  );
};

export default Random;
