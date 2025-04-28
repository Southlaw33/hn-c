import Navbar from "@/components/Navbar";
import "./globals.css";

import React, { PropsWithChildren } from "react";

const RootLayout = (props: PropsWithChildren) => {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="p-4 max-w-3xl mx-auto">{props.children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
