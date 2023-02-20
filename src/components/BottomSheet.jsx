import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
} from "react";

const { height: SCREEN_HEIGHT } = Dimensions.get("screen");
const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 50;

const BottomSheet = forwardRef(({ children, title, ...otherProps }, ref) => {
  const translateY = useSharedValue(0);
  const context = useSharedValue({ y: 0 });
  const active = useSharedValue(false);

  const bottomSheetAnimatedStyle = useAnimatedStyle(() => {
    const borderRadius = interpolate(
      translateY.value,
      [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
      [15, 5],
      Extrapolate.CLAMP
    );

    return {
      borderRadius: borderRadius,
      transform: [{ translateY: translateY.value }],
    };
  });

  const scrollBottomSheetTo = useCallback((to) => {
    "worklet";
    console.log("scrollBottomSheetTo");
    translateY.value = withSpring(to, { damping: 50 });
    active.value = to !== 0;
  }, []);

  const isActive = useCallback(() => active.value);

  useImperativeHandle(
    ref,
    () => ({
      isActive,
      scrollBottomSheetTo,
    }),
    [isActive, scrollBottomSheetTo]
  );

  useEffect(() => {
    // make it visible at the beginning
    // translateY.value = withTiming(-SCREEN_HEIGHT / 3);
    scrollBottomSheetTo(-300);
  }, []);

  const panGesture = Gesture.Pan()
    .onStart((e) => {
      console.log("onStart", e);
      context.value = { y: translateY.value };
    })
    .onUpdate((e) => {
      console.log("onUpdate", e);
      translateY.value = e.translationY + context.value.y;
      // avoid dragging above the top of the screen
      translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
    })
    .onEnd((e) => {
      console.log("onEnd", e);
      if (translateY.value > -SCREEN_HEIGHT / 3) scrollBottomSheetTo(0);
      else if (translateY.value < -SCREEN_HEIGHT / 1.5)
        scrollBottomSheetTo(MAX_TRANSLATE_Y);
    });

  const handleCloseButton = () => {
    scrollBottomSheetTo(0);
  };

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[styles.bottomSheet, bottomSheetAnimatedStyle]}>
        <View style={styles.line} />
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity
          onPress={handleCloseButton}
          style={styles.closeButton}
        >
          <Text>X</Text>
        </TouchableOpacity>
        <View style={styles.separatorLine} />
        {children}
      </Animated.View>
    </GestureDetector>
  );
});

const styles = StyleSheet.create({
  bottomSheet: {
    backgroundColor: "#ffffff",
    borderRadius: 15,
    height: SCREEN_HEIGHT,
    position: "absolute",
    top: SCREEN_HEIGHT,
    width: "100%",
  },
  closeButton: {
    position: "absolute",
    right: 0,
    top: 0,
    marginTop: 5,
    marginRight: 15,
  },
  line: {
    alignSelf: "center",
    backgroundColor: "#94a3b8",
    borderRadius: 2,
    height: 4,
    marginTop: 5,
    width: "25%",
  },
  separatorLine: { backgroundColor: "#e2e8f0", height: 1, marginVertical: 10 },
  title: {
    fontWeight: "bold",
    marginTop: 15,
    paddingHorizontal: 20,
    textAlign: "center",
    width: "100%",
  },
});

export default BottomSheet;
