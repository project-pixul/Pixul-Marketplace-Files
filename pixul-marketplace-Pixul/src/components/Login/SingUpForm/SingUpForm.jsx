import React from "react";
import { Form, Input, Button } from "antd";
import "./singupform.css";

const SingUpForm = () => {
  const [form] = Form.useForm();
  return (
    <Form form={form} layout="vertical" onFinish={() => {}}>
      <Form.Item label="Full Name" required>
        <Input />
      </Form.Item>
      <Form.Item label="User Name" required>
        <Input />
      </Form.Item>
      <Form.Item label="Email" required>
        <Input />
      </Form.Item>
      <Form.Item required label="Password">
        <Input type="password" placeholder="your password" />
      </Form.Item>
      <Form.Item>
        <Button style={{ float: "right" }} type="primary">
          {"Join TCC >"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SingUpForm;
