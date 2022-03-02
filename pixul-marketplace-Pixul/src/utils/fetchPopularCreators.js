import { getDocs, collection, query, orderBy, limit, where } from "firebase/firestore";
import { db } from "../firebase";

export async function fetchPopularCreators(selectedService, maxCreators) {
  const collectionRef = query(
    collection(db, "users"), orderBy("stars", "desc"),
    orderBy("completedJobs", "desc"),
    where("services", "array-contains", selectedService),
    limit(maxCreators ? maxCreators : 50));
  const docSnap = await getDocs(collectionRef);
  const creatorsData = [];
  docSnap.forEach(creator => {
    creatorsData.push({ ...creator.data(), user_id: creator.id });
  });
  return creatorsData;
}