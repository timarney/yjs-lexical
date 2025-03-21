import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto]">
      <Header />
      <main className="bg-gray-50">{children}</main>
      <Footer />
    </div>
  );
};
