import React, { useContext, useState } from "react";
import { Button, Tooltip } from "antd";
import Escrow from "../../../Escrow/Escrow";
import AuthContext from "../../../AuthForm/AuthContext";

export const ChatMessage = React.memo(
  ({ message, profilePictures, chatId }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { authState } = useContext(AuthContext);
    const {
      message: text,
      type,
      escrow = {},
      url,
      escrowId,
      sendersId,
      disabled,
    } = message;

    const { jobName } = escrow;
    if (disabled) {
      escrow.status = "finished";
    }

    const isOutgoingMessage = message.sendersId === authState.user_id;

    const profileImage = isOutgoingMessage
      ? profilePictures.loggedUserProfilePicture
      : profilePictures.messageReceiverProfilePicture;
    const TextMessage = () => (
      <div
        className={`flex justify-${isOutgoingMessage ? "end" : "start"} w-60`}
      >
        <span className="text-xs overflow-ellipsis font-medium text-gray-600 text-justify">
          {text}
        </span>
      </div>
    );

    const AttachmentMessage = () => (
      <div
        className={`flex justify-${isOutgoingMessage ? "end" : "start"} w-60`}
      >
        <a href={url} target={"_blank"} rel="noreferrer">
          <span className="text-xs overflow-ellipsis font-medium text-gray-600 text-justify">
            {text}
          </span>
        </a>
      </div>
    );

    const EscrowMessage = () => (
      <div className=" flex flex-col justify-around items-center w-full h-20 bg-gray-300 border-2  border-gray-300 rounded p-2 pb-0">
        <div className="w-60">
          <Tooltip title={jobName}>
            <p className="text-xs font-medium text-gray-600 text-center truncate">
              {jobName}
            </p>
          </Tooltip>
        </div>

        <Button
          onClick={() => {
            setIsModalOpen(true);
          }}
          className="w-full m-0"
        >
          See
        </Button>
      </div>
    );
    let messageComponent = <TextMessage />;
    if (type === "escrow") messageComponent = <EscrowMessage />;
    else if (type === "attachment") messageComponent = <AttachmentMessage />;

    return (
      <>
        {/* MESSAGE CONTAINER */}
        <div
          className={`${
            isOutgoingMessage ? "flex-row-reverse" : ""
          } items-center flex gap-5`}
        >
          {/* IMAGE USER */}
          <div
            className="bg-cover bg-center h-16 w-16 rounded-full flex-shrink-0"
            style={{
              backgroundImage: `url("${profileImage}")`,
            }}
          />
          {messageComponent}
        </div>

        {/*MODAL ESCROW */}
        <Escrow
          isModalOpen={isModalOpen}
          closeModal={setIsModalOpen}
          isCheckout={false}
          escrow={escrow}
          hiddenButton={isOutgoingMessage}
          sendersId={sendersId}
          escrowId={escrowId}
          chatId={chatId}
          messageId={message.messageId}
        />
      </>
    );
  }
);
