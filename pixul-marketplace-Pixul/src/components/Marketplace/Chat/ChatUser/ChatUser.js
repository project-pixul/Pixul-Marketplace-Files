import React, { useContext } from "react";
import addToChat from "../../../../utils/setUpChat";
import AuthContext from "../../../AuthForm/AuthContext";
import setMessagesDocRefContext from "../../../../pages/setMessagesDocRefContext";

export const ChatUser = React.memo(({  image, user_id }) => {
  const { authState } = useContext(AuthContext);
  const { setMessagesDocRef } = useContext(setMessagesDocRefContext);

  return (
    <div className={`flex items-center flex-shrink-0 w-20 h-20 rounded-full p-1`} onClick={() => addToChat(user_id, setMessagesDocRef, authState)}>
      <div className="bg-center bg-cover h-full w-full rounded-full"
        style={{
          backgroundImage: `url("${image}")`
        }}
      />
    </div>
  )
})
