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

const getConversationListCall = async ({ fromId, token }) => {
  try {
    const conversationListReq = await fetch(
      process.env.REACT_APP_CONVERSATION + fromId,
      {
        headers: {
          Authorization: "Bearer ".concat(token),
        },
      }
    );
    const conversationListJson = await conversationListReq.json();
    return conversationListJson.conversations;
  } catch (err) {
    throw err;
  }
};

export { getMsgListCall, getConversationListCall };
