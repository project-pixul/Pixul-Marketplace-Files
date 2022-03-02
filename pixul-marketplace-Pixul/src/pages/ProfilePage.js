import { useState, useContext, useEffect } from "react";
import { Carousel } from "../components/Carousel/Carousel";
import { About } from "../components/Profile/About/About";
import { ProfileHeader } from "../components/Profile/ProfileHeader/ProfileHeader";
import { Testimonials } from "../components/Profile/Testimonials/Testimonials";
import AuthContext from "../components/AuthForm/AuthContext";
import { fetchUserInfo } from "../utils/fetchUser";
import addToChat from "../utils/setUpChat";
import { query, collection, getDocs, orderBy } from "firebase/firestore";
import { db } from "../firebase";

export const ProfilePage = () => {
  const [items, setItems] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const [testimonials, setTestimonials] = useState([])
  const { authState } = useContext(AuthContext);
  const user_id = window.location.href.split("/").pop();

  useEffect(() => {
    async function setUserInfo() {
      if (user_id && user_id !== "profile") {
        setSelectedUser(await fetchUserInfo(user_id));
        const testimonialDocs = await getDocs(collection(db, "users", user_id, "testimonials"))
        const testimonialData = []
        testimonialDocs.forEach(doc => testimonialData.push(doc.data()))
        setTestimonials(testimonialData)
      }
      //  set recent tcc jobs
      const recentTccJobsQuery = query(
        collection(db, "users", authState?.user_id, "recentJobs"),
        orderBy("createdAt", "desc"),
      );
      const recentTccJobsDocs = await getDocs(recentTccJobsQuery);
      const recentTccJobs = [];
      let count = 0;
      recentTccJobsDocs.forEach(doc => {
        const data = doc.data();
        recentTccJobs.push({
          ...data,
          fullName: data.payerName,
          user_id: data.payer_id,
          key: count,
        });
        count++;
      });

      setItems(recentTccJobs);
    }


    setUserInfo();
  }, [authState?.user_id, user_id]);

  const { fullName, services = [], profilePicture } = selectedUser;

  return (
    <div className="m-auto text-center">
      <ProfileHeader profilePicture={profilePicture} />
      <div className="mt-10">
        <h1 className="text-3xl font-bold">{fullName}</h1>
        <h2 className="font-medium">
          {services.length > 0 ? services[0] : ""}
        </h2>
      </div>
      {user_id !== authState?.user_id ? (
        <button
          className="rounded w-32 font-bold my-5 py-1.5 px-3 bg-gray-300"
          onClick={() => addToChat(user_id, () => {}, authState)}
        >
          Hire Me
        </button>
      ) : null}

      <div className="w-11/12 m-auto lg:w-10/12 xl:w-8/12">
        <Carousel
          title="Recent TCC Jobs"
          items={items}
          textOrientation="text-left"
          itemType="image"
          showEscrowOnClick={true}
        />
      </div>
      <div className="flex flex-col my-10 w-11/12 m-auto gap-10 md:flex-row lg:w-10/12 xl:w-8/12">
        <About user={selectedUser} setSelectedUser={setSelectedUser} />
        <div className="w-full h-1 bg-gray-300 self-center rounded md:h-96 md:w-1" />
        <Testimonials testimonials={testimonials} allJobs={items} />
      </div>
    </div>
  );
};
