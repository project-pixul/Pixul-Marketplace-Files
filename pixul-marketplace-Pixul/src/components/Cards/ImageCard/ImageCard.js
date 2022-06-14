import { useState } from "react";
import { Avatar, Tooltip, message } from "antd";
import Stars from "./Stars";
import { useHistory } from "react-router-dom";
import Escrow from "../../Escrow/Escrow";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";

import "./cards.css";

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
      <div onClick={onClick} className="image-card">
        <Avatar src={profilePicture} size={80} className="image" />
        <Tooltip title={fullName}>
          <h1 className="tooltip">{fullName}</h1>
        </Tooltip>
        <p>
          {Array.isArray(services) && services.length > 0 ? services[0] : ""}
        </p>
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
