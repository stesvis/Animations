import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import BottomSheet from "./src/components/BottomSheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { useRef } from "react";

export default function App() {
  const bottomSheetRef = useRef();

  const handleToggle = () => {
    !bottomSheetRef?.current?.isActive()
      ? bottomSheetRef?.current?.scrollBottomSheetTo(-300)
      : bottomSheetRef?.current?.scrollBottomSheetTo(0);
  };

  return (
    <GestureHandlerRootView style={styles.root}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <TouchableOpacity onPress={handleToggle}>
          <Text style={styles.button}>Toggle bottom sheet</Text>
        </TouchableOpacity>
        <BottomSheet ref={bottomSheetRef} title="Hello World">
          <View style={styles.bottomSheetView}>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Text>
          </View>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  bottomSheetView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingBottom: 10,
    paddingTop: 25,
  },
  button: {
    color: "#21a5e4",
  },
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
  },
  root: {
    flex: 1,
  },
});
