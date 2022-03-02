import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Button, Select, Form, Input, Spin, message } from "antd";
import AuthContext from "../../AuthForm/AuthContext";
import {
  CheckOutlined,
  EnvironmentOutlined,
  FolderOpenOutlined,
  SettingOutlined,
  UserOutlined,
  EditOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { services as AllServices } from "../../../API";
import { updateDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

export const About = ({ user, setSelectedUser }) => {
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { authState = {} } = useContext(AuthContext);
  let { user_id: auth_user_id } = authState;

  let { user_id: pathUserId } = useParams();

  const {
    about,
    services = [],
    porttfolio,
    completedJobs,
    location,
    createdAt,
  } = user;

  const [form] = Form.useForm();
  const { TextArea } = Input;
  const { Option } = Select;

  const getRemovedServices = (currentServices, newServices) => {
    return currentServices.filter(service => {
      return !newServices.includes(service);
    });
  };

  const getAddedServices = (currentServices, newServices) => {
    return newServices.filter(service => {
      return !currentServices.includes(service);
    });
  };

  //Handlers format
  const handleSubmitForm = formValues => {
    console.log(formValues);

    Object.keys(formValues).forEach(key =>
      formValues[key] === undefined ? delete formValues[key] : {}
    );

    const servicesToAdd = getAddedServices(services, formValues.services);
    const servicesToDelete = getRemovedServices(services, formValues.services);

    setIsLoading(true);
    updateDoc(doc(db, "users", authState?.user_id), formValues)
      .then(() => {
        setSelectedUser({ ...user, ...formValues });
        message.success("Data Updated");
      })
      .catch(e => {
        message.error("Error updating data, try again");
      })
      .finally(() => {
        setIsLoading(false);
      });
    servicesToDelete.forEach(service => {
      updateDoc(doc(db, "services", service), {
        numberOfUsers: firebase.firestore.FieldValue.increment(-1),
      });
    });
    servicesToAdd.forEach(service => {
      updateDoc(doc(db, "services", service), {
        numberOfUsers: firebase.firestore.FieldValue.increment(1),
      }).catch(() => {
        setDoc(doc(db, "services", service), { numberOfUsers: 1 });
      });
    });
    setEditMode(false);
  };

  return (
    <div className="flex flex-col gap-2 text-left font-medium w-full md:w-1/2">
      <Spin spinning={isLoading}>
        {editMode ? (
          <Form
            form={form}
            className="flex flex-col text-gray-400"
            layout="vertical"
            onFinish={handleSubmitForm}
            initialValues={{
              porttfolio: porttfolio,
              location: location,
              about,
              services: services,
            }}
          >
            {/* SERVICES */}
            <Form.Item
              name="services"
              label={
                <label className="font-medium text-gray-400 text-xs mb-1">
                  Services
                </label>
              }
              rules={[
                {
                  type: "array",
                },
              ]}
            >
              <Select
                mode="multiple"
                allowClear
                className="outline-none border-4 text-black  mb-5"
                bordered={false}
                placeholder="Select your services"
              >
                {Array.isArray(AllServices) &&
                  AllServices.map(service => (
                    <Option className="text-xl" key={service}>
                      {service}
                    </Option>
                  ))}
              </Select>
            </Form.Item>

            {/* PORTTFOLIO */}
            <Form.Item
              label={
                <label
                  style={{ paddingBottom: 0 }}
                  className="font-medium text-xs text-gray-400 py-0"
                >
                  Porttfolio Link
                </label>
              }
              className="outline-none border-b-4 text-black mb-5 p-0"
              name="porttfolio"
              rules={[
                {
                  type: "url",
                  warningOnly: true,
                  message: "Please input a valid URL",
                },
              ]}
            >
              <Input bordered={false} className="p-1 text-xl" />
            </Form.Item>

            {/* LOCATION */}
            <Form.Item
              label={
                <label
                  style={{ paddingBottom: 0 }}
                  className="font-medium text-xs text-gray-400 py-0"
                >
                  Your location
                </label>
              }
              className="outline-none border-b-4 text-black mb-5 p-0"
              name="location"
            >
              <Input bordered={false} className="p-1 text-xl" />
            </Form.Item>

            {/* ABOUT ME */}
            <label style={{ paddingBottom: 0 }}>About me</label>
            <Form.Item
              className="outline-none border-4 text-black mb-4 h-21"
              name="about"
            >
              {/* <div className="outline-none border-4 text-black mb-0 h-21"> */}
              <TextArea
                className="p-1 text-xl"
                autoSize={false}
                bordered={false}
                rows={3}
              />
              {/* </div> */}
            </Form.Item>

            {/* ACTIONS */}
            <div className="flex flex-row justify-end items-center">
              <Button
                className="mr-3"
                icon={<CloseCircleOutlined />}
                size="large"
                danger
                type="default"
                onClick={() => {
                  form.resetFields();
                  setEditMode(false);
                }}
              >
                Cancel
              </Button>

              <Button
                className="flex flex-row justify-start items-center"
                icon={<CheckOutlined />}
                size="large"
                type="primary"
                htmlType="submit"
              >
                Save
              </Button>
            </div>
          </Form>
        ) : (
          <>
            {/* ABOUT ME */}
            <div className="flex flex-row justify-start items-center">
              <h1 className="font-bold text-3xl mb-2 mr-1">About Me</h1>
              {auth_user_id === pathUserId ? (
                <Button
                  className="flex flex-row justify-start items-center"
                  type="text"
                  onClick={() => {
                    setEditMode(true);
                  }}
                  icon={<EditOutlined />}
                >
                  Update
                </Button>
              ) : null}
            </div>

            <p>{about}</p>

            {/* INFORMATION */}
            <h2 className="text-2xl font-bold mb-2">Information</h2>

            {/* SERVICES */}
            <div className="flex flex-wrap items-center gap-1">
              <div className="flex gap-2 items-center">
                <SettingOutlined className="text-xl" />
                <label>Services: </label>
              </div>
              {services.map((service, index) => (
                <button
                  key={index}
                  className="bg-gray-100 text-xs border-2 border-gray-700 py-0.5 px-2 rounded-full"
                >
                  {service}
                </button>
              ))}
            </div>

            {/* PORTTFOLIO */}
            <div className="flex flex-wrap items-center gap-1">
              <div className="flex items-center gap-2">
                <FolderOpenOutlined className="text-xl" />
                <label>Porttfolio:</label>
                <a
                  className="m-0"
                  target="_blank"
                  href={porttfolio}
                  rel="noreferrer"
                >
                  {porttfolio}
                </a>
              </div>
            </div>

            {/* COMPLETED JOBS */}
            <div className="flex flex-wrap items-center gap-1">
              <div className="flex items-center gap-2">
                <CheckOutlined className="text-xl" />
                <label>Completed TCC Jobs:</label>
              </div>
              <p className="m-0 bold">{completedJobs}</p>
            </div>

            {/* UBICATION */}
            <div className="flex flex-wrap items-center gap-1">
              <div className="flex items-center gap-2">
                <EnvironmentOutlined className="text-xl" />
                <label>{location}</label>
              </div>
            </div>

            {/* MEMBER SINCE */}
            <div className="flex flex-wrap items-center gap-1">
              <div className="flex items-center gap-2">
                <UserOutlined className="text-xl" />
                <label>Member Since: </label>
              </div>
              <p className="m-0 bold">{createdAt?.toDate()?.getFullYear()}</p>
            </div>
          </>
        )}
      </Spin>
    </div>
  );
};
