const getSaleOffProducts = async pageIndex => {
  try {
    const saleOffProductsRequest = await fetch (
      process.env.REACT_APP_SALE_OFF_PRODUCT + pageIndex
    );
    const saleOffProductsJson = await saleOffProductsRequest.json ();

    return saleOffProductsJson.discountList;
  } catch (err) {
    return err;
  }
};

export {getSaleOffProducts};
