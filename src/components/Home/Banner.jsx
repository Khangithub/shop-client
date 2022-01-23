import React from "react";
import "../_components.scss";
import { Col, Row, Container, Carousel } from "react-bootstrap";

import ads11 from "../../assets/banners/ads11.jpg";
import ads12 from "../../assets/banners/ads12.jpg";
import ads13 from "../../assets/banners/ads13.jpg";
import ads14 from "../../assets/banners/ads14.jpg";
import ads15 from "../../assets/banners/ads15.jpg";
import ads16 from "../../assets/banners/ads16.jpg";
import ads17 from "../../assets/banners/ads17.jpg";
import ads18 from "../../assets/banners/ads18.jpg";
import ads19 from "../../assets/banners/ads19.jpg";

function Banner() {
  return (
    <Container fluid className="banner">
      <Row>
        <Col xs={12}>
          <Carousel>
            {[
              ads11,
              ads12,
              ads13,
              ads14,
              ads15,
              ads16,
              ads17,
              ads18,
              ads19,
            ].map((image, index) => {
              return (
                <Carousel.Item key={index}>
                  <img
                    className="banner-img d-block w-100"
                    src={image}
                    alt="First slide"
                  />
                </Carousel.Item>
              );
            })}
          </Carousel>
        </Col>
      </Row>
    </Container>
  );
}

export default Banner;
