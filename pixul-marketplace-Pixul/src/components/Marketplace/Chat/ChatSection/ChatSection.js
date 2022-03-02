import React, { useState, useEffect, useRef, useContext } from "react";
import { RightOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Menu, Dropdown, Form, Input, Button } from "antd";
import Escrow from "../../../Escrow/Escrow";
import { ChatMessage } from "../ChatMessage/ChatMessage";
import { addDoc, doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../../../firebase";
import AuthContext from "../../../AuthForm/AuthContext";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import setMessagesDocRefContext from "../../../../pages/setMessagesDocRefContext";
import processJob from "../../../../utils/openJob";
import { v4 as uuidv4 } from "uuid";

export const ChatSection = ({
  chatLog,
  chatDocRef,
  profilePictures,
  chatId,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const MyRef = useRef(null);
  const [form] = Form.useForm();
  const inputFileRef = useRef(null);
  const [shouldUpdateChatTimestamp, setshouldUpdateChatTimestamp] =
    useState(true);

  const { authState } = useContext(AuthContext);
  const { messagesDocRef } = useContext(setMessagesDocRefContext);

  useEffect(() => {
    MyRef.current.scrollIntoView(false);
  }, []);

  useEffect(() => {
    MyRef.current.scrollIntoView(false);
  }, [chatLog?.length]);

  useEffect(() => {
    setshouldUpdateChatTimestamp(true);
  }, [chatDocRef]);

  const uploadAttachment = event => {
    const storageRef = ref(storage, `${chatId}/${event.target.files[0].name}`);

    // 'file' comes from the Blob or File API
    if (event.target.files[0].size <= 104857600)
      uploadBytes(storageRef, event.target.files[0]).then(snapshot => {
        getDownloadURL(storageRef).then(url => {
          const xhr = new XMLHttpRequest();
          xhr.responseType = "blob";
          xhr.open("GET", url);
          xhr.send();

          handleSendMessage({
            message: event.target.files[0].name,
            type: "attachment",
            url,
          });
          inputFileRef.current.value = "";
        });
      });
  };

  const menu = (
    <Menu>
      <Menu.Item key="escrown" onClick={setIsModalOpen}>
        Escrow
      </Menu.Item>
      <Menu.Item key="attachments" onClick={() => inputFileRef.current.click()}>
        Attachments
      </Menu.Item>
    </Menu>
  );

  const handleSendMessage = values => {
    const { message, type, url } = values;

    //No empty messages on chat
    if (!message || message.trim() === "") {
      form.resetFields();
      return;
    }

    form.resetFields();
    //type: escrow/message
    let newMessage = {
      message,
      id: new Date().getTime(),
      sendersId: authState?.user_id,
      created_at: new Date().getTime(),
      type: type ? type : "message",
      disabled: false,
    };
    if (url) {
      newMessage = {
        ...newMessage,
        url,
      };
    }
    addDoc(chatDocRef, newMessage);
    if (shouldUpdateChatTimestamp) {
      updateDoc(
        doc(
          db,
          "users",
          authState?.user_id,
          "chats",
          messagesDocRef.messageReceiverId
        ),
        { lastUpdatedAt: new Date() }
      );
      setshouldUpdateChatTimestamp(false);
    }
    // const updatedChatLog = [...chatLog, newMessage];
    // setChatLog(updatedChatLog);
    MyRef.current.scrollIntoView(false);
  };

  const handleSendEscrow = async escrow => {
    form.resetFields();
    const escrowUuid = uuidv4();
    const newMessage = {
      id: new Date().getTime(),
      escrowId: escrowUuid,
      sendersId: authState?.user_id,
      created_at: new Date().getTime(),
      type: "escrow",
      disabled: false,
      escrow,
    };

    console.log("ChatSection", newMessage);

    const messageRef = await addDoc(chatDocRef, newMessage);
    processJob(
      true,
      authState,
      messagesDocRef.messageReceiverId,
      chatId,
      messageRef.id,
      escrowUuid
    );

    MyRef.current.scrollIntoView(false);
  };

  return (
    <>
      <div className="flex flex-1 flex-col justify-between pt-2 mb-20 px-10 gap-3 min-w-0 overflow-scroll">
        <div className="max-h-0">
          {/* HISTORY MESSAGES */}
          <div ref={MyRef} className="flex flex-col gap-5 overscroll-auto">
            {chatLog?.map(message => {
              return (
                <ChatMessage
                  key={message.id}
                  message={message}
                  profilePictures={profilePictures}
                  chatId={chatId}
                />
              );
            })}
          </div>
          <input
            style={{ display: "none" }}
            type="file"
            ref={inputFileRef}
            onChange={uploadAttachment}
          />

          {/* INPUT SECTION */}
          <Form
            form={form}
            onFinish={handleSendMessage}
            className="flex items-center gap-2 py-5 absolute bottom-1 w-10/12"
          >
            <Dropdown
              trigger="click"
              overlay={menu}
              placement="topCenter"
              arrow
            >
              <PlusCircleOutlined className="cursor-pointer mb-1 text-gray-500 text-3xl" />
            </Dropdown>
            <Form.Item
              name="message"
              className="w-full text-lg outline-none p-0 bg-gray-100 border-2 border-gray-500 rounded m-0"
            >
              <Input bordered={false} className="p-0 m-0 pl-1" />
            </Form.Item>
            <div className="rounded border-2 border-black">
              <Button
                htmlType="submit"
                type="text"
                icon={<RightOutlined />}
                size="default"
              />
            </div>
          </Form>
        </div>
      </div>

      {/* ESCROW MODAL */}
      <Escrow
        isModalOpen={isModalOpen}
        closeModal={setIsModalOpen}
        isCheckout={true}
        onSubmit={handleSendEscrow}
      />
    </>
  );
};
