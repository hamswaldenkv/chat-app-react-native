const messagesByThread = state => state.entities.messagesByThread || {};

export const getMessagesByThread = (state, threadId) => {
  const collection = messagesByThread(state);
  return collection[threadId] || [];
};
