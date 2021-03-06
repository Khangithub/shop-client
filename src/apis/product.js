const getProductsByCategoryCall = async ({category, pageIndex, limit}) => {
  try {
    const productsByCategoryReq = await fetch (
      process.env.REACT_APP_PRODUCTS_BY_CATEGORY +
        category +
        '/' +
        pageIndex +
        '/' +
        limit
    );
    const productsByCategoryJson = await productsByCategoryReq.json ();

    return productsByCategoryJson.docs;
  } catch (err) {
    return err;
  }
};

const getAllProductsCall = async ({pageIndex, limit}) => {
  try {
    const allProductsReq = await fetch (
      process.env.REACT_APP_PRODUCTS + pageIndex + '/' + limit
    );
    const allProductsJson = await allProductsReq.json ();

    return allProductsJson.docs;
  } catch (err) {
    return err;
  }
};

const getMostDiscoutsProductsCall = async ({pageIndex, limit}) => {
  try {
    const mostDiscountsProductsReq = await fetch (
      process.env.REACT_APP_MOST_DISCOUNTS_PRODUCT + pageIndex + '/' + limit
    );
    const mostDiscountsProductsJson = await mostDiscountsProductsReq.json ();

    return mostDiscountsProductsJson.discountList;
  } catch (err) {
    return err;
  }
};

const getBestSaleProductsCall = async ({pageIndex, limit}) => {
  try {
    const bestSaleProductsReq = await fetch (
      process.env.REACT_APP_BEST_SALE_PRODUCTS + pageIndex + '/' + limit
    );
    const bestSaleProductsJson = await bestSaleProductsReq.json ();
    return bestSaleProductsJson.bestSaleList;
  } catch (err) {
    return err;
  }
};

const getNewArrivalProductsCall = async ({pageIndex, limit}) => {
  try {
    const newArrProductsReq = await fetch (
      process.env.REACT_APP_NEW_ARRIVAL_PRODUCTS + pageIndex + '/' + limit
    );
    const newArrProductJson = await newArrProductsReq.json ();
    return newArrProductJson.newArrivalList;
  } catch (err) {
    return err;
  }
};

const getProductCall = async ({productId}) => {
  try {
    const productReq = await fetch (process.env.REACT_APP_PRODUCTS + productId);

    const productJson = await productReq.json ();
    return productJson;
  } catch (err) {
    return err;
  }
};

export {
  getProductsByCategoryCall,
  getAllProductsCall,
  getMostDiscoutsProductsCall,
  getBestSaleProductsCall,
  getNewArrivalProductsCall,
  getProductCall,
};
