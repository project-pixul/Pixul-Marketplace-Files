import React from "react";

const setMessagesDocRefContext = React.createContext(null);

export const setMessagesDocRefContextProvider = setMessagesDocRefContext.Provider;
export const setMessagesDocRefContextConsumer = setMessagesDocRefContext.Consumer;
export default setMessagesDocRefContext