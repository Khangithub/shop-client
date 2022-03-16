import React, { useEffect, useState } from "react";
import { Row, Col, Carousel } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  getBestSaleProductsRequest,
  getMostDiscountsProductsRequest,
  getNewArrivalProductsRequest,
} from "../actions/product";
import { isEmpty } from "lodash";
import {
  Banner,
  NavBar,
  Footer,
  Loading,
  CategoryList,
  ProductCard,
  HorizontalDivider,
} from "../components";
import {
  foodBanner3,
  foodBanner4,
  foodBanner5,
  foodBanner6,
  bookBanner1,
  bookBanner2,
  bookBanner3,
  bookBanner4,
} from "../assets";

import "./_home.scss";

function Home({ currentUser, token }) {
  const dispatch = useDispatch();
  const [pageIndex] = useState(1);
  const [limit] = useState(6);

  const {
    mostDiscountsProducts,
    bestSaleProducts,
    newArrivalProducts,
    productLoading,
    productErr,
  } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getMostDiscountsProductsRequest({ pageIndex, limit }));
    dispatch(getBestSaleProductsRequest({ pageIndex, limit }));
    dispatch(getNewArrivalProductsRequest({ pageIndex, limit }));
  }, [dispatch, pageIndex, limit]);

  if (
    isEmpty(mostDiscountsProducts) ||
    isEmpty(bestSaleProducts) ||
    isEmpty(newArrivalProducts)
  )
    return (
      <Loading
        errMsg={{
          ...mostDiscountsProducts,
          ...bestSaleProducts,
          ...newArrivalProducts,
        }}
      />
    );

  if (productLoading) return <Loading />;

  if (!isEmpty(productErr)) return <Loading />;

  return (
    <>
      <NavBar currentUser={currentUser} token={token} />
      <div className="home">
        <Banner />
        <CategoryList />
        <div className="best-sale-product-list">
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

        <HorizontalDivider />

        <div className="most-discounts-product-list">
          <Row>
            {mostDiscountsProducts.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </Row>
        </div>

        <HorizontalDivider />

        <div className="new-arrival-product-list">
          <Row>
            <Col sm={8}>
              <div>
                <Row>
                  <ProductCard
                    product={newArrivalProducts[0]}
                    sm={6}
                    md={6}
                    lg={6}
                    showPriceOnly
                  />
                  <ProductCard
                    product={newArrivalProducts[1]}
                    sm={6}
                    md={6}
                    lg={6}
                    showPriceOnly
                  />
                </Row>

                <Row>
                  <ProductCard
                    product={newArrivalProducts[2]}
                    sm={6}
                    md={6}
                    lg={3}
                    showPriceOnly
                  />
                  <ProductCard
                    product={newArrivalProducts[3]}
                    sm={6}
                    md={6}
                    lg={3}
                    showPriceOnly
                  />
                  <ProductCard
                    product={newArrivalProducts[4]}
                    sm={6}
                    md={6}
                    lg={3}
                    showPriceOnly
                  />
                  <ProductCard
                    product={newArrivalProducts[5]}
                    sm={6}
                    md={6}
                    lg={3}
                    showPriceOnly
                  />
                </Row>
              </div>
            </Col>

            <Col xs={12} sm={4}>
              <Carousel>
                {[bookBanner2, bookBanner1, bookBanner3, bookBanner4].map(
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
          </Row>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
