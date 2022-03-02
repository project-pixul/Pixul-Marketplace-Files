import React, { useContext, useEffect, useState } from "react";
import { CloseCircleOutlined } from "@ant-design/icons";
import { ChatUsersContainer } from "../ChatUsersContainer/ChatUsersContainer";
import { ChatSection } from "../ChatSection/ChatSection";
import AuthContext from "../../../AuthForm/AuthContext";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  getDocs,
} from "firebase/firestore";
import { db } from "../../../../firebase";
import { fetchUserInfo } from "../../../../utils/fetchUser";
import setMessagesDocRefContext from "../../../../pages/setMessagesDocRefContext";
import addToChat from "../../../../utils/setUpChat";

export const ChatContainer = ({ isOpen, setIsOpen }) => {
  const { authState } = useContext(AuthContext);
  const { messagesDocRef } = useContext(setMessagesDocRefContext);
  const [usersWithChat, setUsersWithChat] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatInfo, setChatInfo] = useState(null);
  const [chatDocRef, setChatDocRef] = useState(null);
  const [profilePictures, setProfilePictures] = useState({});
  const [chatId, setChatId] = useState(null);
  const { setMessagesDocRef } = useContext(setMessagesDocRefContext);

  useEffect(() => {
    const usersWithChatQuery = query(
      collection(db, "users", authState?.user_id, "chats"),
      orderBy("lastUpdatedAt", "desc")
    );
    async function setChatHeadersInfo() {
      const usersWithChatData = await getDocs(usersWithChatQuery);
      const users = [];
      const usersInfo = [];
      usersWithChatData.forEach(user => {
        users.push({ data: user.data(), id: user.id });
      });
      for (const user of users) {
        const info = { ...(await fetchUserInfo(user.id)), user_id: user.id };
        usersInfo.push(info);
      }
      setUsersWithChat(usersInfo);
      setSelectedChat(users[0]?.id);
      if (usersInfo[0]?.user_id) {
        addToChat(usersInfo[0]?.user_id, setMessagesDocRef, authState);
      }
    }

    setChatHeadersInfo();
  }, [authState?.user_id]);

  useEffect(() => {
    let unsubChat = () => {};
    if (messagesDocRef) {
      const chatQuery = query(
        collection(db, "chats", messagesDocRef.chatId, "messages"),
        orderBy("created_at")
      );
      setChatDocRef(collection(db, "chats", messagesDocRef.chatId, "messages"));
      setChatId(messagesDocRef.chatId);
      unsubChat = onSnapshot(chatQuery, querySnapshot => {
        const docChatInfo = [];
        querySnapshot.forEach(doc => {
          docChatInfo.push({ ...doc.data(), messageId: doc.id });
        });
        setChatInfo(docChatInfo);
      });

      async function setChatProfilePictures() {
        const messageReceiverInfo = await fetchUserInfo(
          messagesDocRef.messageReceiverId
        );
        const loggedUserInfo = await fetchUserInfo(authState?.user_id);
        setProfilePictures({
          loggedUserProfilePicture: loggedUserInfo.profilePicture,
          messageReceiverProfilePicture: messageReceiverInfo.profilePicture,
        });
      }

      setChatProfilePictures();
    }
    return () => unsubChat();
  }, [authState?.user_id, messagesDocRef]);

  return (
    <>
      {/* CHAT */}
      <div
        className={`${
          isOpen ? "chat-container flex flex-col" : ""
        } rounded-xl shadow-2xl right-0 bottom-0 md:right-5 md:bottom-2 fixed bg-gray-300 w-0 h-0 duration-300`}
      >
        <CloseCircleOutlined
          className="absolute top-5 right-5 text-gray-700 cursor-pointer text-3xl"
          onClick={() => setIsOpen(!isOpen)}
        />
        <h1 className="pt-8 pb-2 pl-4 text-gray-700 font-bold">Chat</h1>
        <div
          className={`${
            isOpen ? "flex flex-col h-full bg-gray-100 rounded-t-xl" : "hidden"
          }`}
        >
          <ChatUsersContainer users_info={usersWithChat} />
          <div className="flex items-center text-center text-xs my-5 w-full bg-gray-200">
            <label className="flex-1 bg-gray-300 py-2"></label>
          </div>
          <ChatSection
            selectedChat={selectedChat ? selectedChat : 69}
            chatDocRef={chatDocRef}
            chatLog={chatInfo}
            chatId={chatId}
            profilePictures={profilePictures}
          />
        </div>
      </div>
    </>
  );
};
