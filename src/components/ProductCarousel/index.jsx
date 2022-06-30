import React, { useEffect, useState } from "react";
import { getProdImgs } from "../../utils/array";
import "./_productCarousel.scss";

function ProductCarousel({ productImage, variants }) {
  const [prodImgs, setProdImgs] = useState([]);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  useEffect(() => {
    setProdImgs(getProdImgs(productImage, variants));
  }, [productImage, variants]);

  return (
    <div className="product-carousel">
      <img
        className="product-info-img"
        src={prodImgs[currentImgIndex]}
        alt="slide"
      />
      <div className="next-img-ct">
        {prodImgs.slice(0, 5).map((prodImg, index) => (
          <img
            src={prodImg}
            alt="next-img"
            className="next-img"
            key={index}
            onMouseEnter={() => setCurrentImgIndex(index)}
            onMouseOut={() => console.log("leave")}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductCarousel;
