import { useContext, useState } from "react";
import { MessageOutlined } from "@ant-design/icons";
import { ChatContainer } from "../ChatContainer/ChatContainer";
import AuthContext from "../../../AuthForm/AuthContext";

export const ChatIcon = ({ messagesDocRef, setMessagesDocRef }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { authState } = useContext(AuthContext);

  return (
    <>
      <div
        className="cursor-pointer bottom-5 right-5 rounded-full bg-gray-200 fixed p-2 text-3xl h-16 w-16 flex justify-center items-center border-2 border-gray-700 md:bottom-10 md:right-10"
        onClick={() => setIsChatOpen(!isChatOpen)}
      >
        <MessageOutlined />
      </div>
      {authState?.isLoggedIn ? <ChatContainer className="text-3xl" isOpen={isChatOpen} setIsOpen={setIsChatOpen}
                                              messagesDocRef={messagesDocRef}  /> : null}
    </>
  );
};
