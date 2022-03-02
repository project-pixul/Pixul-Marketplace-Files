import { getDocs, collection, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";

export async function fetchPopularServices() {
  const collectionRef = query(collection(db, "services"), orderBy("numberOfUsers", "desc"));
  const docSnap = await getDocs(collectionRef);
  const creatorsData = [];
  let count = 0
  docSnap.forEach((doc, index) => {
    creatorsData.push({ ...doc.data(), id: count, category: doc.id });
    count++
  });
  return creatorsData;
}