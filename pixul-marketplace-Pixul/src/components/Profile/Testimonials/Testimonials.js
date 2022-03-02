import { Form, Input, Rate } from "antd";
import { useState, useContext, useEffect } from "react";
import { StarFilled } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import AuthContext from "../../AuthForm/AuthContext";

import {db} from "../../../firebase"
import { updateDoc, doc, addDoc, collection } from "firebase/firestore";
import { fetchUserInfo } from "../../../utils/fetchUser";

export const Testimonials = ({ testimonials, allJobs }) => {
  const { authState } = useContext(AuthContext);
  const [showTestimonialForm, setShowTestimonialForm] = useState(false);
  let { user_id } = authState;
  let { user_id: path_user_id } = useParams();

  const [form] = Form.useForm();
  const { TextArea } = Input;
  useEffect(() => {
    allJobs.forEach(job => {
      if (job.status === "finished" && job.payer_id === authState.user_id) {
        setShowTestimonialForm(true)
      }
    })

  }, [allJobs])

  const handleShowForm = () => {
    setShowTestimonialForm(true);
  };

  const handleCloseForm = () => {
    form.resetFields();
    setShowTestimonialForm(false);
  };

  const sendTestimonial = async values => {
    const userInfo = await fetchUserInfo(window.location.href.split("/").pop())
    const loggedUserInfo = await fetchUserInfo(authState.user_id)
    const allStarredJobs = [...userInfo.starredJobs, values.rate]
    updateDoc(doc(db, "users", window.location.href.split("/").pop()), {
      completedJobs: firebase.firestore.FieldValue.increment(1),
      starredJobs: allStarredJobs,
      stars: allStarredJobs.reduce((a, b) => a + b, 0) / allStarredJobs.length
    })
    addDoc(collection(db, "users", window.location.href.split("/").pop(), "testimonials"), {
      testimonial: values.message,
      name: loggedUserInfo?.name,
      stars: values.rate
    })
    form.resetFields();
    handleCloseForm();
  };

  const testimonialForm = () => {
    return (
      <Form
        form={form}
        onFinish={sendTestimonial}
        layout="vertical"
        className="flex flex-col gap-5 font-bold text-lg"
      >
        <Form.Item
          className="mb-0 mt-3"
          name="rate"
          label={<label className="font-normal">Rate the creator</label>}
          rules={[
            {
              required: true,
              message: "Please, rate the creator",
            },
          ]}
        >
          <Rate className="text-3xl " />
        </Form.Item>

        <Form.Item
          className="mb-0"
          name="message"
          label={
            <label className="font-normal">
              Tell us about your experience working with this creator
            </label>
          }
          rules={[
            {
              required: true,
              message: "Please, give us feedback",
            },
          ]}
        >
          <div className="w-full mt-1 mb-0 border-2 border-gray-500 rounded p-0 outline-none">
            <TextArea
              className="p-1 text-xl"
              autoSize={false}
              bordered={false}
              rows={3}
            />
          </div>
        </Form.Item>
        <div className="flex justify-end">
          <button
            onClick={handleCloseForm}
            className="text-xs rounded-2xl bg-white py-1 px-2 border-2 border-gray-700 mr-3"
          >
            Cancel
          </button>
          <button
            onClick={handleShowForm}
            className="text-xs rounded-2xl bg-gray-300 py-1 px-2 border-2 border-gray-700"
          >
            Send Testimonial
          </button>
        </div>
      </Form>
    );
  };

  return (
    <div className="font-medium text-left w-full md:w-1/2">
      <h1 className="font-bold text-3xl mb-2">Testimonials</h1>
      {!showTestimonialForm ? (
        <div className="flex flex-col overflow-auto h-80">
          <div className="flex flex-col gap-5">
            {testimonials.map(({ id, testimonial, name, stars }) => (
              <div className="flex flex-col gap-1" key={id}>
                <p>{testimonial}</p>
                <p>&#9472; {name}</p>
                <div className="flex gap-0.5 text-gray-300 text-xl">
                  {[...Array(stars)].map((element, index) => (
                    <StarFilled key={index} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        testimonialForm()
      )}
      {user_id !== path_user_id && !showTestimonialForm ? (
        <button
          onClick={handleShowForm}
          className="text-xs rounded-2xl bg-gray-300 mt-5 py-1 px-2 border-2 border-gray-700"
        >
          Write Testimonial
        </button>
      ) : null}
    </div>
  );
};
