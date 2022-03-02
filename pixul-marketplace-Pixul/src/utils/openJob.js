import {doc, setDoc } from 'firebase/firestore'
import { fetchUserInfo } from "./fetchUser";
import { db } from "../firebase";

export default async function processJob(isCheckout, authState, payer_id, chatId, messageId, escrowUuid) {
  if (isCheckout) {
    const payerInfo = await fetchUserInfo(payer_id)

    setDoc(doc(db, "users", payer_id, "recentJobs", escrowUuid), {
      payer_id: payer_id,
      payerName: payerInfo.fullName,
      profilePicture: payerInfo.profilePicture,
      status: "active",
      createdAt: new Date(),
      messageId: messageId,
      chatId: chatId,
      escrowUuid: escrowUuid
    })

    setDoc(doc(db, "users", authState?.user_id, "recentJobs", escrowUuid), {
      payer_id: payer_id,
      payerName: payerInfo.fullName,
      profilePicture: payerInfo.profilePicture,
      status: "active",
      createdAt: new Date(),
      messageId: messageId,
      chatId: chatId,
      escrowUuid: escrowUuid
    })

  } else {

  }
}