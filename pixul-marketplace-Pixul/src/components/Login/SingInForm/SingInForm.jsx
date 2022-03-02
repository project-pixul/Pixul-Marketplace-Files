import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import "./singinform.css";

const SingInForm = () => {
  const [form] = Form.useForm();
  return (
    <Form form={form} layout="vertical" onFinish={() => {}}>
      <Form.Item label="User Name" required>
        <Input placeholder="Example: joaquin coronado" />
      </Form.Item>
      <Form.Item required label="Password">
        <Input type="password" placeholder="your password" />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Button style={{ float: "right" }} type="primary">
          {"Enter TCC >"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SingInForm;
