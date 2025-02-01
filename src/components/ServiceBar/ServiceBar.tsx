import type { FC } from "react";
import "./styles.css";

interface ServiceBarProps {
  children: React.ReactNode;
}

export const ServiceBar: FC<ServiceBarProps> = ({ children }) => {
  return <div className="service-bar">{children}</div>;
};
