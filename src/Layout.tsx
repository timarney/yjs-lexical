import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Header />
      <main className="bg-gray-50">{children}</main>
      <Footer />
    </div>
  );
};
