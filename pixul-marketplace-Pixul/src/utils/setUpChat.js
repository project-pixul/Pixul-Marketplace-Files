import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export default async function addToChat(messageReceiverId, setMessagesDocRef, authState) {
  if (authState?.isLoggedIn && messageReceiverId) {
    const chatRef = doc(db, "users", authState?.user_id, "chats", messageReceiverId);
    const chatDoc = await getDoc(chatRef);
    if (chatDoc.exists()) {
      setMessagesDocRef({ chatId: chatDoc.data().chatId, messageReceiverId: messageReceiverId });
    } else {
      const chatDocRef = await addDoc(collection(db, "chats"), {
        created_at: new Date(),
        lastUpdatedAt: new Date(),
        status: ["active"]
      });
      // save chat id for logged user
      await setDoc(doc(db, "users", authState?.user_id, "chats", messageReceiverId), {
        chatId: chatDocRef.id,
        created_at: new Date(),
        lastUpdatedAt: new Date(),
        status: ["active"]
      });
      // save chat id for that logged user is trying to reach out
      await setDoc(doc(db, "users", messageReceiverId, "chats", authState?.user_id), {
        chatId: chatDocRef.id,
        created_at: new Date(),
        lastUpdatedAt: new Date(),
        status: ["active"]
      });
      setMessagesDocRef({ chatId: chatDocRef.id, messageReceiverId: messageReceiverId });
    }
  }
}
