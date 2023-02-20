import React, { useEffect, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

const BottomSheetForm = ({ text }) => {
  const [val, setVal] = useState(text);

  useEffect(() => {
    return () => {
      setVal("");
    };
  }, []);

  return (
    <View style={styles.bottomSheetView}>
      <TextInput
        autoFocus
        multiline
        onChangeText={setVal}
        style={{
          backgroundColor: "#f0f0f0",
          borderWidth: 1,
          borderColor: "#dddddd",
          textAlignVertical: "top",
          height: 100,
          width: "100%",
        }}
        value={val}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bottomSheetView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingBottom: 10,
    paddingTop: 25,
    paddingHorizontal: 10,
  },
});

export default BottomSheetForm;
