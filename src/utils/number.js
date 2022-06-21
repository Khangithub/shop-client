const returnTotalPrice = cart => {
  const priceList = cart
    .map (order => {
      return order.product;
    })
    .map (product => {
      const {price, discount} = product;
      if (discount !== undefined) {
        return price * (1 - discount / 100);
      } else {
        return price;
      }
    })
    .map ((price, index) => {
      const quantityList = cart.map (order => {
        return order.quantity;
      });
      return price * quantityList[index];
    });

  const reducer = (accumulator, currentValue) => accumulator + currentValue;

  return priceList.reduce (reducer, 0).toFixed (2);
};

const getUnitPrice = ({price, discount}) =>
  (discount ? price - discount * price / 100 : price).toFixed (1);

const getPrice = ({price, discount}, quantity) =>
  ((discount ? price - discount * price / 100 : price) * quantity).toFixed (1);

const sortAccordType = (sortType, results) => {
  switch (sortType) {
    case 'priceDesc':
      return results.sort ((a, b) => {
        return b.price - a.price;
      });

    case 'priceAsce':
      return results.sort ((a, b) => {
        return a.price - b.price;
      });

    default:
      return results;
  }
};

export {getUnitPrice, sortAccordType, getPrice, returnTotalPrice};
