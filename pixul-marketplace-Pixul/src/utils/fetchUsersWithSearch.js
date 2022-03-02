import { getDocs, collection, query, where, limit } from "firebase/firestore";
import { db } from "../firebase";

export async function fetchUsersWithSearch(name) {
  const collectionRef = query(collection(db, "users"), where("lowerCaseName", ">=", name.toLowerCase()), where("lowerCaseName", "<=", name.toLowerCase() + "\uf8ff"), limit(50));
  const docSnap = await getDocs(collectionRef);
  const creatorsData = [];
  docSnap.forEach(creator => {
    creatorsData.push(creator.data());
  });
  return creatorsData;
}