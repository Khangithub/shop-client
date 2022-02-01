import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar/";
import { Container, Spinner, Row } from "react-bootstrap";
import ProductCard from "../components/ProductCard/";

import { useSelector, useDispatch } from "react-redux";
import { getSaleOffProductsRequest } from "../actions/product";
import _ from "lodash";

import Banner from "../components/Home/Banner";
import Footer from "../components/Footer/";
import CategoryList from "../components/Home/CategoryList";
import "./_pages.scss";

function Home() {
  const dispatch = useDispatch();
  const [pageIndex, setPageIndex] = useState(1);
  const { saleOffProducts, loading, err } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(getSaleOffProductsRequest({ pageIndex }));
  }, [dispatch, pageIndex]);

  if (!saleOffProducts) return <Spinner animation="grow" variant="danger" />;

  if (loading) return <Spinner animation="grow" variant="danger" />;

  if (!_.isEmpty(err, true))
    return <Spinner animation="grow" variant="danger" />;

  return (
    <>
      <NavBar />
      <div className="home layout">
        <Banner />
        <CategoryList />
        <Container className="container-fluid home-general-product-list">
          <Row>
            {saleOffProducts.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default Home;
