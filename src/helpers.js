export function removeAscent (str) {
  if (str === null || str === undefined) return str;
  str = str.toLowerCase ();
  str = str.replace (/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace (/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace (/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace (/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace (/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace (/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace (/đ/g, 'd');
  return str;
}

export function checkEmail (email) {
  if (email === '' || email === undefined) {
    return true;
  } else {
    console.log (email);
    var regex = new RegExp (
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    );
    return regex.test (email);
  }
}

export function getPrice (product) {
  if (product.hasOwnProperty ('discount') && product.price > 0) {
    return product.price - product.discount * product.price / 100;
  } else {
    return product.price;
  }
}

export function disappear (stuff) {
  return stuff ? {display: 'flex'} : {display: 'none'};
}

export function returnTotalPrice (cart) {
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
}

export function checkConfirmedPassword (password, confirmedPassword) {
  if (password.localeCompare (confirmedPassword) === 0) {
    return true;
  } else {
    console.log (password, confirmedPassword);
    return false;
  }
}

export function disappearWhen (condition) {
  return condition ? {display: 'none'} : {};
}

export function convertTimestamp (timestamp) {
  const date = new Date (timestamp);
  return date.toLocaleString ();
}

const getRandomInRange = (min, max) =>
  Math.floor (Math.random () * (max - min + 1)) + min;

const returnPrice = product =>
  product.price - product.discount * product.price / 100;

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

export {getRandomInRange, returnPrice, sortAccordType};
