const getMostDiscoutsProductsCall = async ({pageIndex, limit}) => {
  try {
    const saleOffProductsRequest = await fetch (
      process.env.REACT_APP_MOST_DISCOUNTS_PRODUCT + pageIndex + '/' + limit
    );
    const saleOffProductsJson = await saleOffProductsRequest.json ();

    return saleOffProductsJson.discountList;
  } catch (err) {
    return err;
  }
};

const getBestSaleProductsCall = async ({pageIndex, limit}) => {
  try {
    const bestSaleProductsRequest = await fetch (
      process.env.REACT_APP_BEST_SALE_PRODUCTS + pageIndex + '/' + limit
    );
    const bestSaleProductsJson = await bestSaleProductsRequest.json ();
    return bestSaleProductsJson.bestSaleList;
  } catch (err) {}
};

export {getMostDiscoutsProductsCall, getBestSaleProductsCall};
