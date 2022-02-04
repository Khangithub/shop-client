import React from "react";
import { Row, Col, Image, Carousel } from "react-bootstrap";
import ReactPlayer from "react-player";

import "./_components.scss";

import shippingBanner4 from "../assets/banners/shipping-4.jpg";
import shippingBanner3 from "../assets/banners/shipping-3.jpg";
import shippingBanner2 from "../assets/banners/shipping-2.jpg";
import shippingBanner1 from "../assets/banners/shipping-1.jpg";
// import foodBanner1 from "../assets/banners/food-1.jpg";
// import foodBanner2 from "../assets/banners/food-2.jpg";
import btsSamsungVideo from "../assets/videos/phone-1.mp4";
import btsMcDonaldVideo from "../assets/videos/food-1.mp4";
import bookBanner from "../assets/gifs/book-1.gif";

import { useHistory } from "react-router-dom";

function CategoryList() {
  const history = useHistory();

  return (
    <div className="category">
      <div>
        <Row className="category-card-list">
          <Col
            xs={12}
            sm={6}
            md={4}
            onClick={() => history.push(`/productList/book/1`)}
          >
            <div className="category-card-container">
              <Image
                src={bookBanner}
                alt="icon"
                className="category-card-image"
              />
              <small className="category-card-link">See more</small>
            </div>
          </Col>

          <Col
            xs={12}
            sm={6}
            md={8}
            onClick={() => history.push(`/productList/phone/1`)}
          >
            <div className="category-card-container">
              <ReactPlayer
                className="video-ad"
                url={[
                  { src: btsSamsungVideo, type: "video/webm" },
                  { src: btsSamsungVideo, type: "video/ogg" },
                ]}
                controls
                playing
                muted={true}
                loop
              />
              <small className="category-card-link">See more</small>
            </div>
          </Col>
        </Row>

        <Row className="category-card-list">
          <Col
            xs={12}
            sm={6}
            md={8}
            onClick={() => history.push(`/productList/food/1`)}
          >
            <div className="category-card-container">
              <ReactPlayer
                className="video-ad"
                url={[
                  { src: btsMcDonaldVideo, type: "video/webm" },
                  { src: btsMcDonaldVideo, type: "video/ogg" },
                ]}
                controls
                playing
                loop
              />
              <small className="category-card-link">See more</small>
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
