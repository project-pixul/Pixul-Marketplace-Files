import React, { useState } from "react";
import { Form, Input, Modal, message, Spin } from "antd";
import logo from "../../assets/img/logo.png";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";

const ForgetPasword = ({ visible = false, handleVisible }) => {
  const [isLoading, setIsloading] = useState(false);
  const [form] = Form.useForm();

  const submitForm = values => {
    setIsloading(true);
    sendPasswordResetEmail(auth, values.email)
      .then(() => {
        console.log("mail send succesfully");
        message.success("Email sent");
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        message.error("Error to send message, try again");
        console.log("Error sendind email", errorCode, errorMessage);
      })
      .finally(() => {
        setIsloading(false);
      });

    handleVisible(false);
    form.resetFields();
  };

  const onCancel = () => {
    form.resetFields();
    setIsloading(false);
    handleVisible(false);
  };

  return (
    <Modal visible={visible} footer={null} onCancel={onCancel}>
      <Spin spinning={isLoading}>
        <div className="flex flex-col justify-center items-center">
          {/* LOGO */}
          <div className="flex items-center gap-2 mb-3 mt-3">
            <img src={logo} alt="logo" className="w-10 h-10" />
            <span className="hidden lg:flex text-lg tracking-wide">
              THE COLLECTIVE
            </span>
          </div>

          {/* FORM */}
          <Form form={form} onFinish={submitForm}>
            <Form.Item
              name="email"
              rules={[
                {
                  type: "email",
                  message: "Pleas input a valid email",
                },
                {
                  required: true,
                  message: "Please input your email",
                },
              ]}
              className="mb-2"
            >
              <Input />
            </Form.Item>
            <p className="text-center text-xs text-gray-500 mb-5">
              Enter the email you used to register. We will send you an email
              with a link to reset your password.
            </p>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={onCancel}
                className="text-xs rounded-2xl bg-white py-2 px-2 border border-gray-700 mr-3"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="text-xs rounded-2xl bg-gray-300 py-2 px-2 border-1 border-gray-700"
              >
                Send email
              </button>
            </div>
          </Form>
        </div>
      </Spin>
    </Modal>
  );
};

export default ForgetPasword;
