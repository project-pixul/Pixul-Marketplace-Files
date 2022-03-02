import { Footer } from "./Footer/Footer";
import { Header } from "./Header/Header";

export const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div>{children}</div>
      <Footer />
    </>
  );
};
