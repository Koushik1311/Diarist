"use client";

import React, { useState } from "react";
import { AlignLeft } from "lucide-react";

export default function SmallDeviceLeftBar() {
  const [showLeftBar, setShowLeftBar] = useState<boolean>(false);

  const onButtonClick = () => {
    setShowLeftBar(!showLeftBar);
  };

  return (
    <div>
      <button onClick={onButtonClick}>
        <AlignLeft />
      </button>
      {showLeftBar && <div>LeftBar</div>}
    </div>
  );
}
