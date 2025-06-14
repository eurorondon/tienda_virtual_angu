import React from "react";
import { Colors } from "../utils/colors";
import MyText from "./MyText";

export default function MyInputs({
  label,
  value,
  onChange,
  secureTextEntry,
  ...otherProps
}) {
  console.log(otherProps);
  return (
    <div style={styles.container}>
      <MyText
        style={{ fontWeight: "bold", marginBottom: "5px" }}
        type="caption"
      >
        {label}
      </MyText>

      <input
        type={secureTextEntry ? "password" : "text"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={styles.input}
        placeholder={label}
        {...otherProps}
      />
    </div>
  );
}

const styles = {
  container: {
    marginBottom: "15px",
  },
  input: {
    width: "100%",
    height: 45,
    // justifyContent: "center",

    paddingLeft: 10,
    backgroundColor: Colors.ligth,
    borderRadius: 10,
    border: `1px solid ${Colors.primary}`,
  },
  // input: {
  //   width: "100%",
  //   height: "100%",
  //   border: "none",
  //   outline: "none",
  // },
};
