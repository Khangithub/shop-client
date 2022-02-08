const getCurrentUserCall = async ({token}) => {
  try {
    return {username: 'Tam oi thanh cong roi', token};
  } catch (err) {
    return err;
  }
};

export {getCurrentUserCall};
