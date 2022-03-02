import { Button } from "antd";
export const Nav = ({ items, onClick }) => {
  return (
    <nav className="flex flex-col">
      {items.map(item => (
        <Button
          key={item}
          type="text"
          className="h-10 mr-5 cursor-pointer flex justify-start"
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
