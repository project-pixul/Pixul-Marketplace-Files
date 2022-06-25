import { SearchOutlined } from "@ant-design/icons";
import { Form, Input, Button } from "antd";
import { fetchUsersWithSearch } from "../../../utils/fetchUsersWithSearch";

import "../marketplace.css";

export const MarketPlaceFilter = ({ setCreators }) => {
  const onFinish = values => {
    async function setCreatorsBySearchCriteria() {
      const creatorsList = await fetchUsersWithSearch(values.search);
      setCreators(creatorsList);
    }
    setCreatorsBySearchCriteria();
  };

  return (
    <Form onFinish={onFinish} className="marketplace-search">
      <Form.Item name="search">
        <span className="search-icon">{<SearchOutlined />}</span>
        <Input placeholder="Search" bordered={false} />
      </Form.Item>
      <button type="submit">Submit</button>
    </Form>
  );
};
