import React, { useEffect, useState } from "react";
import { Spinner, Row, Col, Carousel } from "react-bootstrap";
import ProductCard from "../components/ProductCard/";

import { useSelector, useDispatch } from "react-redux";
import {
  getBestSaleProductsRequest,
  getMostDiscountsProductsRequest,
} from "../actions/product";
import _ from "lodash";

import NavBar from "../components/NavBar";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import CategoryList from "../components/CategoryList";
import "./_home.scss";

import foodBanner3 from "../assets/banners/food-3.jpg";
import foodBanner4 from "../assets/banners/food-4.jpg";
import foodBanner5 from "../assets/banners/food-5.jpg";
import foodBanner6 from "../assets/banners/food-6.jpg";

import HorizontalDevider from "../components/HorizontalDivider";

function Home() {
  const dispatch = useDispatch();
  const [pageIndex] = useState(1);
  const [limit] = useState(6);

  const { mostDiscountsProducts, bestSaleProducts, loading, err } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(getMostDiscountsProductsRequest({ pageIndex, limit }));
    dispatch(getBestSaleProductsRequest({ pageIndex, limit }));
  }, [dispatch, pageIndex, limit]);

  if (_.isEmpty(mostDiscountsProducts) || _.isEmpty(bestSaleProducts))
    return <Spinner animation="grow" variant="danger" />;

  if (loading) return <Spinner animation="grow" variant="danger" />;

  if (!_.isEmpty(err, true))
    return <Spinner animation="grow" variant="danger" />;

  return (
    <>
      <NavBar />
      <div className="home">
        <Banner />
        <CategoryList />
        <div className="best-selling-product-list">
          <Row>
            <Col xs={12} sm={4}>
              <Carousel>
                {[foodBanner3, foodBanner4, foodBanner5, foodBanner6].map(
                  (img, index) => (
                    <Carousel.Item key={index}>
                      <img
                        className="banner-img d-block w-100"
                        src={img}
                        alt="slide"
                      />
                    </Carousel.Item>
                  )
                )}
              </Carousel>
            </Col>

            <Col sm={8}>
              <div>
                <Row>
                  <ProductCard
                    product={bestSaleProducts[0]}
                    sm={6}
                    md={6}
                    lg={6}
                    showPriceOnly
                  />
                  <ProductCard
                    product={bestSaleProducts[1]}
                    sm={6}
                    md={6}
                    lg={6}
                    showPriceOnly
                  />
                </Row>

                <Row>
                  <ProductCard
                    product={bestSaleProducts[2]}
                    sm={6}
                    md={6}
                    lg={3}
                    showPriceOnly
                  />
                  <ProductCard
                    product={bestSaleProducts[3]}
                    sm={6}
                    md={6}
                    lg={3}
                    showPriceOnly
                  />
                  <ProductCard
                    product={bestSaleProducts[4]}
                    sm={6}
                    md={6}
                    lg={3}
                    showPriceOnly
                  />
                  <ProductCard
                    product={bestSaleProducts[5]}
                    sm={6}
                    md={6}
                    lg={3}
                    showPriceOnly
                  />
                </Row>
              </div>
            </Col>
          </Row>
        </div>

        <HorizontalDevider />

        <div className="layout-1-product-list">
          <Row>
            {mostDiscountsProducts.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </Row>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
