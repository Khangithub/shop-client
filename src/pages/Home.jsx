import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar/";
import { Spinner, Row, Col, Carousel } from "react-bootstrap";
import ProductCard from "../components/ProductCard/";

import { useSelector, useDispatch } from "react-redux";
import { getSaleOffProductsRequest } from "../actions/product";
import _ from "lodash";

import Banner from "../components/Banner";
import Footer from "../components/Footer";
import CategoryList from "../components/CategoryList";
import "./_pages.scss";

import foodBanner3 from "../assets/banners/food-3.jpg";
import foodBanner4 from "../assets/banners/food-4.jpg";
import foodBanner5 from "../assets/banners/food-5.jpg";
import foodBanner6 from "../assets/banners/food-6.jpg";

function Home() {
  const dispatch = useDispatch();
  const [pageIndex] = useState(1);
  const [limit] = useState(6);
  const { saleOffProducts, loading, err } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(getSaleOffProductsRequest({ pageIndex, limit }));
  }, [dispatch, pageIndex, limit]);

  if (!saleOffProducts) return <Spinner animation="grow" variant="danger" />;

  if (loading) return <Spinner animation="grow" variant="danger" />;

  if (!_.isEmpty(err, true))
    return <Spinner animation="grow" variant="danger" />;

  return (
    <>
      <NavBar />
      <div className="home">
        <Banner />
        <CategoryList />
        <div className="layout-2-product-list">
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
                    product={saleOffProducts[0]}
                    sm={6}
                    md={6}
                    lg={6}
                    showPriceOnly
                  />
                  <ProductCard
                    product={saleOffProducts[1]}
                    sm={6}
                    md={6}
                    lg={6}
                    showPriceOnly
                  />
                </Row>

                <Row>
                  <ProductCard
                    product={saleOffProducts[0]}
                    sm={6}
                    md={6}
                    lg={3}
                    showPriceOnly
                  />
                  <ProductCard
                    product={saleOffProducts[1]}
                    sm={6}
                    md={6}
                    lg={3}
                    showPriceOnly
                  />
                  <ProductCard
                    product={saleOffProducts[0]}
                    sm={6}
                    md={6}
                    lg={3}
                    showPriceOnly
                  />
                  <ProductCard
                    product={saleOffProducts[1]}
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

        <div className="layout-1-product-list">
          <Row>
            {saleOffProducts.map((product, index) => (
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
