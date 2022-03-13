import React from "react";
import "./_banner.scss";
import { Carousel } from "react-bootstrap";

import { homeBanner1, homeBanner2, homeBanner3 } from "../../assets";

function Banner() {
  return (
    <div className="banner">
      <Carousel>
        {[homeBanner1, homeBanner2, homeBanner3].map((image, index) => {
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
  );
}

export default Banner;
