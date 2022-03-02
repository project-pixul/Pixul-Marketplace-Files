import { SearchOutlined } from "@ant-design/icons";
import { Form, Input, Button } from "antd";
import { fetchUsersWithSearch } from "../../../utils/fetchUsersWithSearch";

export const MarketPlaceFilter = ({ setCreators }) => {
  const onFinish = values => {
    async function setCreatorsBySearchCriteria() {
      const creatorsList = await fetchUsersWithSearch(values.search)
      setCreators(creatorsList)
    }
    setCreatorsBySearchCriteria()
  };

  return (
    <Form
      onFinish={onFinish}
      className="flex items-start bg-gray-300 rounded-xl w-full mb-1 md:w-1/2"
    >
      <Button
        className="rounded-l-xl"
        type="text"
        htmlType="submit"
        icon={<SearchOutlined />}
      />
      <Form.Item name="search" className="bg-gray-300 mb-0 w-full rounded-r-xl">
        <Input className="rounded-r-xl" placeholder="Search" bordered={false} />
      </Form.Item>
    </Form>
  );
};
