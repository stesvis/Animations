import React, { useEffect, useState } from "react";
import { Button, ScrollView, StyleSheet, View } from "react-native";

const BottomSheetContent = ({ text }) => {
  const [val, setVal] = useState(text);

  useEffect(() => {
    return () => {
      setVal("");
    };
  }, []);

  return (
    <View style={styles.bottomSheetView}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ alignItems: "center", flex: 1 }}
      >
        <View style={styles.greenView} />
        <View style={styles.yellowView}>
          <Button title="Test Button" />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomSheetView: {
    backgroundColor: "#d3eff9",
    flex: 1,
    padding: 10,
    paddingBottom: 50,
  },
  scrollView: {},
  greenView: {
    backgroundColor: "green",
    borderWidth: 5,
    borderColor: "red",
    height: "50%",
    width: "100%",
  },
  yellowView: {
    backgroundColor: "yellow",
    borderWidth: 5,
    borderColor: "blue",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 30,
    height: "50%",
    width: "100%",
  },
});

export default BottomSheetContent;
