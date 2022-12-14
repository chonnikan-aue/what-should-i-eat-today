import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Categories.css";
import Header from "../Header/Header";

const Categories = (props) => {
  let [categoriesDiv, setCategoriesDiv] = useState();
  let [countriesDiv, setCountriesDiv] = useState();
  let [nationalities, setNationalities] = useState();
  let [matchedFlagWithNationality, setMatchedFlagWithNationality] = useState(
    []
  );

  useEffect(() => {
    props.setHeaderText("What should I eat today?");
    props.activeNav(props.categories);
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/categories.php`)
      .then((res) => {
        let data = res.data.categories;
        let categories = data.map((category, index) => {
          return (
            <Col key={index} className="categories-col">
              <Link to={`/random/c/${category.strCategory}`}>
                <div className="mat">
                  <img
                    className="categories-img"
                    src={category.strCategoryThumb}
                    alt={category.strCategory}
                  />
                </div>
                <p>{category.strCategory}</p>
              </Link>
            </Col>
          );
        });
        setCategoriesDiv(categories);
      })
      .catch((err) => {
        console.log(err);
      });

    let nationalitiesList = [];
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
      .then((res) => {
        let data = res.data.meals;
        data.forEach((nationality) => {
          if (nationality.strArea !== "Unknown") {
            nationalitiesList.push(nationality.strArea);
          }
        });
      })
      .then(() => {
        setNationalities(nationalitiesList);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (nationalities) {
      const headers = {
        "X-Application-Key": "live_081615a5c36010a9c729152971d3e06a3a8f387e",
      };
      nationalities.forEach((nationality) => {
        axios
          .get(
            `https://rest.gadventures.com/nationalities/?name=${nationality}`,
            {
              headers,
            }
          )
          .then((res) => {
            let countryCode = res.data.results[0].country.id;
            axios
              .get(`https://restcountries.com/v3.1/alpha/${countryCode}`)
              .then((res) => {
                setMatchedFlagWithNationality((prevState) => [
                  ...prevState,
                  {
                    nationality: nationality,
                    flag: res.data[0].flags.png,
                  },
                ]);
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }
  }, [nationalities]);

  useEffect(() => {
    if (nationalities && matchedFlagWithNationality) {
      if (matchedFlagWithNationality.length === nationalities.length) {
        let countries = matchedFlagWithNationality.map((country, index) => {
          return (
            <Col key={index} className="countries-col">
              <Link to={`/random/a/${country.nationality}`}>
                <div className="mat">
                  <img
                    className="countries-img"
                    src={country.flag}
                    alt={country.nationality}
                  />
                </div>
                <p>{country.nationality}</p>
              </Link>
            </Col>
          );
        });
        setCountriesDiv(countries);
      }
    }
  }, [matchedFlagWithNationality, nationalities]);

  return (
    <Container>
      <Row>
        <Header headerText={props.headerText}></Header>
      </Row>
      <Row className="dotted-border">
        <Row>
          <h2 className="underline-h2">Categories</h2>
        </Row>
        <Row>{categoriesDiv}</Row>
      </Row>
      {/* <Row className="categories-hr"></Row> */}
      <Row className="dotted-border">
        <Row>
          <h2 className="underline-h2">Countries</h2>
        </Row>
        <Row>{countriesDiv}</Row>
      </Row>
    </Container>
  );
};

export default Categories;
