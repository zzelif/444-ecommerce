import React from "react";
import { Toaster } from "react-hot-toast";

interface AddProductLayoutProps {
  children: React.ReactNode;
}

export default function AddProductLayout({ children }: AddProductLayoutProps) {
  return (
    <>
      {children}
      <Toaster position="bottom-right" />
    </>
  );
}