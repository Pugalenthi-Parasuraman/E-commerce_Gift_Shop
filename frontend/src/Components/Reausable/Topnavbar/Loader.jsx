import React from "react";
import { ThreeDots } from "react-loader-spinner";

function Loader() {
  return (
    <div className="flex justify-center items-center h-screen">
      <ThreeDots
        visible={true}
        height="80"
        width="80"
        color="#f97316"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}

export default Loader;
