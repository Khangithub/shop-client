import React from "react";
import { Row, Col, Carousel } from "react-bootstrap";
import ReactPlayer from "react-player";

import {
  shippingBanner1,
  shippingBanner2,
  shippingBanner3,
  shippingBanner4,
  btsMcDonaldVideo,
  btsSamsungVideo,
  bookGif1,
} from "../../assets";

import { useHistory } from "react-router-dom";
import SeeMoreLink from "../SeeMoreLink";

import "./_categoryList.scss";

function CategoryList() {
  const history = useHistory();

  return (
    <div className="category">
      <div>
        <Row className="category-card-list">
          <Col xs={12} sm={6} md={4}>
            <div className="category-card-container">
              <img src={bookGif1} alt="icon" className="category-card-image" />
              <SeeMoreLink
                btnText="See more about Best Summer Novel Collection"
                link="/productList/book/1"
              />
            </div>
          </Col>

          <Col xs={12} sm={6} md={8}>
            <div className="category-card-container">
              <ReactPlayer
                className="video-ad"
                url={[
                  { src: btsSamsungVideo, type: "video/webm" },
                  { src: btsSamsungVideo, type: "video/ogg" },
                ]}
                controls
                playing
                muted
                loop
              />
              <SeeMoreLink
                btnText="See more about BTS Samsung Collection"
                link="/productList/phone/1"
              />
            </div>
          </Col>
        </Row>

        <Row className="category-card-list">
          <Col xs={12} sm={6} md={8}>
            <div className="category-card-container">
              <ReactPlayer
                className="video-ad"
                url={[
                  { src: btsMcDonaldVideo, type: "video/webm" },
                  { src: btsMcDonaldVideo, type: "video/ogg" },
                ]}
                controls
                playing
                muted={false}
                loop
              />
              <SeeMoreLink
                btnText="See more about BTS McDonald Collection"
                link="/productList/food/1"
              />
            </div>
          </Col>

          <Col xs={12} sm={6} md={4}>
            <div className="signin-container">
              <div className="signin-container-signin-btn">
                <h3>Sign in for the best experience</h3>
                <button onClick={() => history.push("/login")}>
                  Sign in securely
                </button>
              </div>

              <div className="shipping-img">
                <Carousel>
                  {[
                    shippingBanner1,
                    shippingBanner2,
                    shippingBanner3,
                    shippingBanner4,
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
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default CategoryList;
