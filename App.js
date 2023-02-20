import {
  Dimensions,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useRef, useState } from "react";

import AppContext from "./src/context/appContext";
import BottomSheet from "./src/components/bottomSheet/BottomSheet";
import BottomSheetForm from "./src/components/bottomSheet/BottomSheetForm";
import BottomSheetPage from "./src/pages/BottomSheetPage";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";

const { height: SCREEN_HEIGHT } = Dimensions.get("screen");

export default function App() {
  const [bottomSheetOptions, setBottomSheetOptions] = useState({
    title: null,
    content: null,
  });
  const bottomSheetRef = useRef();

  const appContextValue = {
    openBottomSheet: ({ title, content }) => {
      if (!bottomSheetRef?.current?.isActive()) {
        setBottomSheetOptions({ title: title, content: content });
        bottomSheetRef?.current?.scrollBottomSheetTo(-SCREEN_HEIGHT * 0.75);
      }
    },
    closeBottomSheet: () => {
      if (Keyboard.isVisible()) Keyboard.dismiss();
      bottomSheetRef?.current?.scrollBottomSheetTo(0);
      setBottomSheetOptions({ title: null, content: null });
    },
  };

  return (
    <GestureHandlerRootView style={styles.root}>
      <AppContext.Provider value={appContextValue}>
        <StatusBar style="auto" />
        <BottomSheetPage />
        <BottomSheet ref={bottomSheetRef} title={bottomSheetOptions?.title}>
          {bottomSheetOptions?.content}
        </BottomSheet>
      </AppContext.Provider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
