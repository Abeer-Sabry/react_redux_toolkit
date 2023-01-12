import React from "react";
import BounceLoader from "react-spinners/BounceLoader";

const Spinner = () => {
  const CSSProperties = {
    display: "block",
    textAlign: "center",
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        width: "100%",
      }}
    >
      <BounceLoader
        color={"#56ab2f"}
        cssOverride={CSSProperties}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Spinner;
