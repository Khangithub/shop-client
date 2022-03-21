const getChatListCall = async ({roomId, token}) => {
  try {
    const chatListReq = await fetch (
      process.env.REACT_APP_CHATS + '/' + roomId,
      {
        headers: {
          Authorization: 'Bearer '.concat (token),
        },
      }
    );
    const chatListJson = await chatListReq.json ();
    console.log ('chatListJson', chatListJson);
    return chatListJson.curMsgList;
  } catch (err) {
    throw err;
  }
};

export {getChatListCall};
