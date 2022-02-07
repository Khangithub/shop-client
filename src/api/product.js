const getMostDiscoutsProductsCall = async args => {
  try {
    const saleOffProductsRequest = await fetch (
      process.env.REACT_APP_SALE_OFF_PRODUCT + args.pageIndex + '/'+args.limit
    );
    const saleOffProductsJson = await saleOffProductsRequest.json ();

    return saleOffProductsJson.discountList;
  } catch (err) {
    return err;
  }
};

export {getMostDiscoutsProductsCall};
