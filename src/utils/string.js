const removeAscent = str => {
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
};

const checkEmail = email => {
  if (email === '' || email === undefined) {
    return true;
  } else {
    console.log (email);
    var regex = new RegExp (
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    );
    return regex.test (email);
  }
};

const checkConfirmedPassword = (password, confirmedPassword) => {
  if (password.localeCompare (confirmedPassword) === 0) {
    return true;
  } else {
    return false;
  }
};

export {checkConfirmedPassword, removeAscent, checkEmail};
