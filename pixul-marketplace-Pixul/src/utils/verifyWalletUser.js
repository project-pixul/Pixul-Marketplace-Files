import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export async function verifyWalletUser(newAccounts) {
  const docRef = doc(db, "users", newAccounts[0]);
  const docSnap = await getDoc(docRef);
  return docSnap.exists();
}

export async function createBasicUser(id, userInfo) {
  await setDoc(doc(db, "users", id), {
    ...userInfo, roles: ["creator", "consumer"],
    completedJobs: 0,
    stars: 0,
    starredJobs: [],
    createdAt: new Date()
  });
}