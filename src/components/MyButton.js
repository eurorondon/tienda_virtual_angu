import React from "react";
import { Colors } from "../utils/colors";

export default function MyButton({
  title,
  onPress,
  variant = "primary",
  style,
  ...otherProps
}) {
  return (
    <button
      style={{ ...styles[variant], ...style }}
      onClick={onPress}
      {...otherProps}
    >
      <span style={styles.buttonText}>{title}</span>
    </button>
  );
}

const styles = {
  primary: {
    width: "100%",
    height: 45,
    backgroundColor: Colors.black,
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: Colors.ligth,
  },
  secondary: {
    width: "100%",
    height: 45,
    backgroundColor: Colors.ligth,
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: Colors.black,
    border: "1px solid #ccc",
  },
  terciario: {
    width: "100%",
    height: 45,
    backgroundColor: Colors.Green,
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: Colors.ligth,
    border: "none",
  },
  buttonText: {
    // color: Colors.ligth,
    fontSize: 16,
    fontWeight: "bold",
  },
};
