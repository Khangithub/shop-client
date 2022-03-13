// import React, {useState, useContext} from 'react';
// import './EditProductButton.css';
// import EditProductModal from './EditProductModal';
// import {ProductListContext} from '../../ContextProvider/ProductListContextProvider';
// import {CurrentUserContext} from '../../ContextProvider/CurrentUserContextProvider';

// export default function EditProductButton(props) {
//   const {product} = props;
//   const [modalShow, setModalShow] = useState(false);
//   const {
//     setProductList,
//     setYourProductList,
//     setProductListLoading,
//   } = useContext(ProductListContext);
//   const {getCurrentUserLoading, currentUser} = useContext(CurrentUserContext);

//   return (
//     !getCurrentUserLoading && (
//       <>
//         <button onClick={() => setModalShow(true)}>✏ </button>

//         <EditProductModal
//           show={modalShow}
//           product={product}
//           onHide={() => setModalShow(false)}
//           setProductList={setProductList}
//           setYourProductList={setYourProductList}
//           setProductListLoading={setProductListLoading}
//           currentUser={currentUser}
//         />
//       </>
//     )
//   );
// }