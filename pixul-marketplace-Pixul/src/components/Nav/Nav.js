import { Button } from "antd";

export const Nav = ({ items, onClick }) => {
  return (
    <nav className="marketplace-nav">
      {items.map(item => (
        <Button
          key={item}
          type="text"
          onClick={() => {
            onClick(item);
          }}
        >
          <span type="link" key={item}>
            {item}
          </span>
        </Button>
      ))}
    </nav>
  );
};
