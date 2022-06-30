import React, { useEffect, useState } from "react";
import { Row, Col, Carousel } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
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
import { getBestSaleProductsAction, getMostDiscountsProductsAction, getNewArrivalProductsAction } from "../actions/product";

function Home() {
  const dispatch = useDispatch();
  const [pageIndex] = useState(1);
  const [limit] = useState(6);

  const {
    mostDiscntProds,
    bestSaleProds,
    newArrivalProds,
    prodLoading,
    prodErr,
  } = useSelector(({product}) => product);

  useEffect(() => {
    dispatch(getMostDiscountsProductsAction({ pageIndex, limit }));
    dispatch(getBestSaleProductsAction({ pageIndex, limit }));
    dispatch(getNewArrivalProductsAction({ pageIndex, limit }));
  }, [dispatch, pageIndex, limit]);

  if (
    isEmpty(mostDiscntProds) ||
    isEmpty(bestSaleProds) ||
    isEmpty(newArrivalProds)
  )
    return <Loading />;

  if (prodLoading) return <Loading />;

  if (!isEmpty(prodErr)) return <Loading />;

  return (
    <>
      <NavBar />
      <div className="home">
        <Banner />
        <CategoryList />
        <div className="prod-list">
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
                    product={bestSaleProds[0]}
                    sm={6}
                    md={6}
                    lg={6}
                    showPriceOnly
                  />
                  <ProductCard
                    product={bestSaleProds[1]}
                    sm={6}
                    md={6}
                    lg={6}
                    showPriceOnly
                  />
                </Row>

                <Row>
                  <ProductCard
                    product={bestSaleProds[2]}
                    sm={6}
                    md={6}
                    lg={3}
                    showPriceOnly
                  />
                  <ProductCard
                    product={bestSaleProds[3]}
                    sm={6}
                    md={6}
                    lg={3}
                    showPriceOnly
                  />
                  <ProductCard
                    product={bestSaleProds[4]}
                    sm={6}
                    md={6}
                    lg={3}
                    showPriceOnly
                  />
                  <ProductCard
                    product={bestSaleProds[5]}
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

        <div className="prod-list">
          <Row>
            {mostDiscntProds.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </Row>
        </div>

        <HorizontalDivider />

        <div className="prod-list">
          <Row>
            <Col sm={8}>
              <div>
                <Row>
                  <ProductCard
                    product={newArrivalProds[0]}
                    sm={6}
                    md={6}
                    lg={6}
                    showPriceOnly
                  />
                  <ProductCard
                    product={newArrivalProds[1]}
                    sm={6}
                    md={6}
                    lg={6}
                    showPriceOnly
                  />
                </Row>

                <Row>
                  <ProductCard
                    product={newArrivalProds[2]}
                    sm={6}
                    md={6}
                    lg={3}
                    showPriceOnly
                  />
                  <ProductCard
                    product={newArrivalProds[3]}
                    sm={6}
                    md={6}
                    lg={3}
                    showPriceOnly
                  />
                  <ProductCard
                    product={newArrivalProds[4]}
                    sm={6}
                    md={6}
                    lg={3}
                    showPriceOnly
                  />
                  <ProductCard
                    product={newArrivalProds[5]}
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
