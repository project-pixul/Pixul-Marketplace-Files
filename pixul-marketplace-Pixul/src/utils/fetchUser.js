import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export async function fetchUserInfo(userId) {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);
  let docData = {}
  if (docSnap.exists()) {
    docData = docSnap.data()
  }
  return docData
}