import React, { useState, useEffect, useContext } from "react";
import { Container, Row } from "react-bootstrap";
import { ProductListContext } from "../ContextProvider/ProductListContextProvider";
import { CurrentUserContext } from "../ContextProvider/CurrentUserContextProvider";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { getProductRequest } from "../actions/product";
import { isEmpty } from "lodash";

import NavBar from "../components/NavBar";
import Loading from "../components/Loading";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard/";
import ProductAbout from "../components/Product/ProductAbout";
import AddMainCommentForm from "../components/Product/AddMainCommentForm/";
import ProductCommentList from "../components/Product/ProductCommentList/";

import "./Product.css";

function Product() {
  const match = useRouteMatch();
  const dispatch = useDispatch();

  const { productId } = match.params;
  const { currentUser } = useContext(CurrentUserContext);
  const { product, productLoading, productErr } = useSelector(
    (state) => state.product
  );

  let [productCommentList, setProductCommentList] = useState([]);
  let { productList } = useContext(ProductListContext);

  useEffect(() => {
    dispatch(getProductRequest({ productId }));
  }, [productId, dispatch]);

  if (isEmpty(product)) return <Loading />;
  if (productLoading) return <Loading />;
  if (!isEmpty(productErr)) return <Loading />;

  const getSameCategoryProducts = (productList, product) => {
    return productList
      .filter((productListItem) => {
        return productListItem.category === product.category;
      })
      .map((product, index) => {
        return <ProductCard key={index} product={product} />;
      })
      .splice(0, 6);
  };

  return (
    <div className="product">
      <NavBar />
      <ProductAbout product={product} />
      <Container>
        <p className="section__title">productList of the same category</p>
        <Row>{getSameCategoryProducts(productList, product)}</Row>
      </Container>

      <Container>
        <p className="section__title">comments about this product</p>
        {currentUser && (
          <AddMainCommentForm
            productId={productId}
            setProductCommentList={setProductCommentList}
          />
        )}
        <ProductCommentList
          productId={productId}
          productCommentList={productCommentList}
          setProductCommentList={setProductCommentList}
        />
      </Container>

      <Footer />
    </div>
  );
}

export default Product;