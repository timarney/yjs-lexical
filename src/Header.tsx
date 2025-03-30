/**
 * External dependencies
 */
import { ReactNode } from "react";

/**
 * Internal dependencies
 */
import { Logo } from "./Logo";

export const Header = ({ children }: { children: ReactNode }) => {
  return (
    <header className="border-b p-4 border-gray-300 flex justify-between items-center">
      <Logo />
      <div>{children}</div>
    </header>
  );
};
