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
    return chatListJson.curMsgList;
  } catch (err) {
    throw err;
  }
};

const getConversationListCall = async ({fromId, token}) => {
  try {
    const conversationListReq = await fetch (
      process.env.REACT_APP_CONVERSATION + fromId,
      {
        headers: {
          Authorization: 'Bearer '.concat (token),
        },
      }
    );
    const conversationListJson = await conversationListReq.json ();
    return conversationListJson.conversations;
  } catch (err) {
    throw err;
  }
};

export {getChatListCall, getConversationListCall};
