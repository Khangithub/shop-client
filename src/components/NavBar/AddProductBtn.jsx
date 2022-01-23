import React, {useContext} from 'react';
import './_addProductBtn.scss';
import AddProductModal from './AddProductModal';
import {Image} from 'react-bootstrap';
import {CurrentUserContext} from '../../ContextProvider/CurrentUserContextProvider';
import {ProductListContext} from '../../ContextProvider/ProductListContextProvider';
import addProductSvg from '../../assets/svgs/addProduct.svg';

function AddProductBtn() {
  const [showModal, setShowModal] = React.useState(false);
  const {getCurrentUserLoading, currentUser} = useContext(CurrentUserContext);
  const {setProductList, setYourProductList, setProductListLoading} = useContext(
    ProductListContext
  );

  return (
    !getCurrentUserLoading && (
      <div className="add-product-btn">
        <Image
          src={addProductSvg}
          alt="add product icon"
          rounded
          onClick={() => setShowModal(!showModal)}
        />

        <AddProductModal
          show={showModal}
          is_loading={getCurrentUserLoading}
          onHide={() => setShowModal(false)}
          setYourProductList={setYourProductList}
          setProductListLoading={setProductListLoading}
          setProductList={setProductList}
          currentUser={currentUser}
        />
      </div>
    )
  );
}

export default AddProductBtn;