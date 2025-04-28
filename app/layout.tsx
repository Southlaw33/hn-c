import "./globals.css";

import React, { PropsWithChildren } from "react";

const Rootlayout = (props: PropsWithChildren) => {
  return (
    <html>
      <body>{props.children}</body>
    </html>
  );
};

export default Rootlayout;
