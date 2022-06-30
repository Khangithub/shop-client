const getMsgListCall = async ({ roomId, token }) => {
  try {
    const msgListReq = await fetch(process.env.REACT_APP_CHATS + roomId, {
      headers: {
        Authorization: "Bearer ".concat(token),
      },
    });
    const msgListJson = await msgListReq.json();
    return msgListJson.msgs;
  } catch (err) {
    throw err;
  }
};

const getChatsCall = async ({ userId, token }) => {
  try {
    const chatsReq = await fetch(process.env.REACT_APP_CHATS + 'of/buyer/' + userId, {
      headers: {
        Authorization: "Bearer ".concat(token),
      },
    });
    const chatsJson = await chatsReq.json();
    return chatsJson.chats;
  } catch (err) {
    throw err;
  }
};

export { getMsgListCall, getChatsCall };
