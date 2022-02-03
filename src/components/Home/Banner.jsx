import React from "react";
import "../_components.scss";
import { Col, Row, Container, Carousel } from "react-bootstrap";

import homeBanner1 from "../../assets/banners/home-banner-1.jpg";
import homeBanner2 from "../../assets/banners/home-banner-2.jpg";
import homeBanner3 from "../../assets/banners/home-banner-3.jpg";


function Banner() {
  return (
    <Container fluid className="banner">
      <Row>
        <Col xs={12}>
          <Carousel>
            {[
              homeBanner1,
              homeBanner2,
              homeBanner3,
            ].map((image, index) => {
              return (
                <Carousel.Item key={index}>
                  <img
                    className="banner-img d-block w-100"
                    src={image}
                    alt="slide"
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
