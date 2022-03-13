// import React, { useContext } from "react";
// import { Row, Container, Spinner } from "react-bootstrap";
// import { ProductListContext } from "../ContextProvider/ProductListContextProvider";
// import { NavBar, Footer, CategoryList, Pagination, ProductCard } from "../components";

// import "./Products.css";

// const Products = ({ match }) => {
//   const { productList, getProductListLoading } = useContext(ProductListContext);
//   const {
//     params: { index },
//   } = match;
//   const pivot = 12;
//   const start = (parseInt(index) - 1) * pivot;
//   const end = parseInt(index) * pivot;

//   const getSlicedProductList = (productList) => {
//     return Object.values(productList).slice(start, end);
//   };
//   return getProductListLoading ? (
//     <Spinner animation="grow" variant="danger" />
//   ) : (
//     <div className="productList">
//       <NavBar />
//       <CategoryList />
//       <Container className="products__paginated__list">
//         <Pagination
//           index={parseInt(index)}
//           to="/productList"
//           total={Math.ceil(productList.length / pivot)}
//         />
//         <Row>
//           {getSlicedProductList(productList).map((product, index) => {
//             return <ProductCard key={index} product={product} />;
//           })}
//         </Row>
//       </Container>
//       <Footer />
//     </div>
//   );
// };

// export default Products;