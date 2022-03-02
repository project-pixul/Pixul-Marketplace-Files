import { useState } from "react";
import { Avatar, Tooltip, message } from "antd";
import Stars from "./Stars";
import { useHistory } from "react-router-dom";
import Escrow from "../../Escrow/Escrow";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";

export const ImageCard = ({ creator, showEscrowOnClick = false }) => {
  const {
    profilePicture,
    fullName,
    services = [],
    stars,
    user_id,
    chatId,
    messageId,
    status,
  } = creator;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEscrow, setCurrentEscrow] = useState({});

  const history = useHistory();

  const onClick = () => {
    if (showEscrowOnClick) {
      handleGetEscrowInfo(chatId, messageId);
      setIsModalOpen(true);
    } else {
      history.push("/profile/" + user_id);
    }
  };

  const handleGetEscrowInfo = async (chatId, messageId) => {
    const messageWithEscrow = doc(db, "chats", chatId, "messages", messageId);
    const messageDoc = await getDoc(messageWithEscrow);

    if (!messageDoc.exists()) {
      message.error("Error getting Job");
      setIsModalOpen(false);
      return;
    }

    let escrow = messageDoc.data().escrow;
    escrow.sendersId = messageDoc.data().sendersId;
    escrow.escrowId = messageDoc.data().escrowId;
    escrow.status = status;

    setCurrentEscrow(escrow);
  };

  return (
    <>
      <div
        onClick={onClick}
        className="flex flex-col items-center cursor-pointer p-5 rounded border-2 min-w-min  w-48 border-gray-300 text-center h-60"
      >
        <Avatar src={profilePicture} size={100} />
        <Tooltip title={fullName}>
          <h1 className=" mt-2 text-xl  w-32 text-center font-medium truncate">
            {fullName}
          </h1>
        </Tooltip>
        <h3 className="mb-5">
          {Array.isArray(services) && services.length > 0 ? services[0] : ""}
        </h3>
        <div className="flex justify-center gap-0.5 text-gray-300 text-xl">
          <Stars stars={stars} />
        </div>
      </div>
      {/*MODAL ESCROW */}
      <Escrow
        isModalOpen={isModalOpen}
        closeModal={setIsModalOpen}
        isCheckout={false}
        escrow={currentEscrow}
        sendersId={currentEscrow.sendersId}
        escrowId={currentEscrow.escrowId}
        chatId={chatId}
        messageId={messageId}
      />
    </>
  );
};
