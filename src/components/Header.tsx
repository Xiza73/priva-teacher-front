import { Props } from "@/interfaces";

export interface HeaderProps extends Props {}

export const Header: React.FC<HeaderProps> = ({ children }) => (
  <h1 className="text-3xl text-gray-700 mb-4">{children}</h1>
);

export const Title: React.FC<HeaderProps> = ({ children }) => (
  <h2 className="text-2xl text-gray-700 mb-4">{children}</h2>
);

export const Subtitle: React.FC<HeaderProps> = ({ children }) => (
  <h3 className="text-xl text-gray-700 mb-4">{children}</h3>
);
