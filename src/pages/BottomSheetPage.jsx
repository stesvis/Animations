import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import AppContext from "../context/appContext";
import BottomSheetForm from "../components/bottomSheet/BottomSheetForm";

const BottomSheetPage = (props) => {
  const { openBottomSheet } = useContext(AppContext);

  const handleToggle = () => {
    openBottomSheet({ title: "Type a comment", content: <BottomSheetForm /> });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleToggle}>
        <Text style={styles.button}>Open bottom sheet</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    color: "#21a5e4",
  },
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default BottomSheetPage;
