import { useContext, useState } from "react";
import {
  Form,
  Input,
  DatePicker,
  Select,
  Modal as AntModal,
  Spin,
  message,
  InputNumber,
  Space,
} from "antd";
import moment from "moment";
import AuthContext from "../AuthForm/AuthContext";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { getCurrentWalletConnected } from "../../utils/walletInteract";

const Escrow = ({
  closeModal,
  isModalOpen,
  isCheckout = false,
  onSubmit,
  escrow = {},
  hiddenButton = false,
  escrowId,
  sendersId,
  messageId,
  chatId,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const [form] = Form.useForm();
  const { Option } = Select;

  const {
    coin,
    completionDate: currentCompletionDate,
    jobName,
    payment,
    status,
  } = escrow;

  const finishEscrow = async () => {
    const userEscrowJobRef = doc(
      db,
      "users",
      sendersId,
      "recentJobs",
      escrowId
    );
    const loggedUserEscrowJobRef = doc(
      db,
      "users",
      authState.user_id,
      "recentJobs",
      escrowId
    );
    await updateDoc(userEscrowJobRef, { status: "finished" });
    await updateDoc(loggedUserEscrowJobRef, { status: "finished" });
    await updateDoc(doc(db, "users", sendersId), {
      completedJobs: firebase.firestore.FieldValue.increment(1),
    });
    await updateDoc(doc(db, "chats", chatId, "messages", messageId), {
      disabled: true,
    });
    closeModal();
  };

  const { authState } = useContext(AuthContext);

  const submitForm = async formValues => {
    const { coin, completionDate, jobName, payment } = formValues;

    let wallet;
    try {
      setIsLoading(true);
      wallet = await getCurrentWalletConnected();
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }

    let payeeAddress = wallet?.address;

    if (!payeeAddress) {
      message.error("Error getting payee address");
      return;
    }

    formValues.payeeAddress = payeeAddress;
    const coinValues = coin.split(":");

    const preparedFormValues = {
      coin: { name: coinValues[0], address: coinValues[1] },
      completionDate: completionDate.format("YYYY-MM-DD"),
      jobName: jobName,
      payment: payment,
      payeeAddress: payeeAddress,
    };

    //Send escrow to the chat
    onSubmit(preparedFormValues);

    //Clean sent data
    form.resetFields();

    closeModal();
  };

  const payEscrow = () => {
    finishEscrow();
  };

  const finishJob = () => {
    console.log("Job completed");
    console.log("Escrow", escrow);
  };

  const generateTextButton = () => {
    if (isCheckout) {
      return "SEND TOKENS TO ESCROW";
    } else {
      if (sendersId === authState.user_id) {
        return "Finish job";
      }
      return "Submit";
    }
  };

  const generateOnFinishForm = formValues => {
    if (isCheckout) {
      submitForm(formValues);
      return;
    } else {
      if (sendersId === authState.user_id) {
        finishJob();
        return;
      }
      payEscrow();
      return;
    }
  };

  const generateSubmitButton = () => {
    if (hiddenButton) {
      return null;
    }

    if (status === "finished") {
      return (
        <div className="flex justify-center items-center text-green-500 bold font-bold rounded py-2 text-base">
          <span>Congratulations, work finished</span>
        </div>
      );
    } else {
      return (
        <button
          className="bold bg-gray-700 text-white font-bold rounded py-2 text-base"
          type="submit"
        >
          {generateTextButton()}
        </button>
      );
    }
  };

  function disabledDate(current) {
    // Can not select days before today and today
    return current && current < moment().endOf("day");
  }

  const coins = [
    {
      address: "0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D41",
      name: "Bitcoin",
    },
    {
      address: "0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D42",
      name: "Ethereum",
    },
    {
      address: "0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D43",
      name: "Litecoin",
    },
    {
      address: "0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D44",
      name: "Cardano",
    },
    {
      address: "0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D45",
      name: "Tether",
    },
    {
      address: "0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D46",
      name: "Binance Coin",
    },
    {
      address: "0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D47",
      name: "Solana",
    },
    {
      address: "0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D48",
      name: "USD Coin",
    },
  ];

  return (
    <AntModal
      visible={isModalOpen}
      onCancel={() => closeModal(false)}
      footer={null}
      closable={false}
      destroyOnClose={true}
    >
      <Spin spinning={isLoading}>
        <Form
          form={form}
          onFinish={generateOnFinishForm}
          layout="vertical"
          className="flex flex-col gap-5"
        >
          <h1 className="text-center text-3xl font-bold">Job Sumary</h1>
          {isCheckout ? (
            <div>
              <Form.Item
                className="mb-2"
                name="jobName"
                label={<label className="font-bold text-lg">Job Name</label>}
                rules={[
                  {
                    required: true,
                    message: "Please input the Job Name",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                className="mb-2"
                name="completionDate"
                label={
                  <label className="font-bold text-lg">
                    Job Completion Date
                  </label>
                }
                rules={[
                  {
                    required: true,
                    message: "Please input the Completion Date",
                  },
                ]}
              >
                <DatePicker
                  disabledDate={disabledDate}
                  className="text-lg w-full"
                />
              </Form.Item>

              <Form.Item
                className="mb-2"
                name="coin"
                label={
                  <label className="font-bold text-lg">Token/Coin Name</label>
                }
                rules={[
                  {
                    required: true,
                    message: "Please select a coin",
                  },
                ]}
              >
                <Select allowClear>
                  {coins.map(coin => (
                    <Option
                      key={coin.address}
                      value={`${coin.name}:${coin.address}`}
                    >
                      {coin.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label={
                  <label className="font-bold text-lg">Payment (USD)</label>
                }
              >
                <Space>
                  <Form.Item
                    noStyle
                    name="payment"
                    className="w-1/2"
                    rules={[
                      {
                        type: "number",
                        message: "Please input a valid number",
                      },
                      {
                        required: true,
                        message: "Please input the payment",
                      },
                    ]}
                  >
                    <InputNumber
                      type="number"
                      min={0}
                      style={{ width: 230 }}
                      bordered={true}
                      className="p-0 text-sm w-full"
                    />
                  </Form.Item>

                  <span className="w-full font-bold text-lg">
                    = XXX.XX Tokens/Coins
                  </span>
                </Space>
              </Form.Item>
            </div>
          ) : (
            <>
              <label className="font-bold text-lg">
                Job Name:{" "}
                <span className="text-gray-500 italic">{jobName}</span>
              </label>
              <label className="font-bold text-lg">
                Job Completion Date:{" "}
                <span className="text-gray-500 italic">
                  {currentCompletionDate}
                </span>
              </label>
              <label className="font-bold text-lg italic">
                Token/Coin Name:{" "}
                <span className="text-gray-500 italic">{coin?.name}</span>
              </label>
              <div className="font-bold text-lg italic">
                <label>Payment (USD)</label>
                <p className="text-gray-500">{`${payment} USD = XXX.XX Tokens/Coins`}</p>
              </div>
            </>
          )}
          <p className="text-xs text-gray-500">
            *TOKENOMICS DISCLAIMER: As a creatoy, you must understand each
            token/coin may have different set ot tokenomics. Certaing
            tokens/coins may have a transaction "taxt". These "taxes" are not
            automatically included in the above price (located in the Payment
            section).
          </p>
          {generateSubmitButton()}
        </Form>
      </Spin>
    </AntModal>
  );
};

export default Escrow;
