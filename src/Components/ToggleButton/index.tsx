import { useState } from "react";

interface Props {
  // onToggle: (isOn: boolean) => void;
}
const ToggleButton: React.FC<Props> = ({}) => {
  const [isOn, setIsOn] = useState<boolean>(false);
  const handleClick = () => {
    setIsOn(!isOn);
  };
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <button
        onClick={handleClick}
        style={{
          backgroundColor: "rgb(237,112,46)",
          borderRadius: "30px",
          width: "60px",
          height: "30px",
          display: "flex",
          justifyContent: "space-between",
          padding: "5px",
          position: "relative",
          border: "none",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "50%",
            width: "20px",
            height: "20px",
            position: "absolute",
            top: "5px",
            left: isOn ? "35px" : "5px",
            transition: "left 0.3s ease-in-out",
          }}
        />
      </button>
      <label style={{ marginLeft: "5px" }}>Auto Save</label>
    </div>
  );
};

export default ToggleButton;
