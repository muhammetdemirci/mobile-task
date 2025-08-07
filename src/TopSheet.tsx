import React, { useRef, useCallback, useImperativeHandle, forwardRef, useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, PanResponder } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';

export interface TopSheetProps {
  children: React.ReactNode;
  initialIndex?: number;
  snapPoints: (string | number)[];
}

const SCREEN_HEIGHT = Dimensions.get('window').height;
const ANIMATION_DURATION_FOR_WHOLE_SCREEN = 1000;
export const TopSheet = forwardRef(({ children, initialIndex = -1, snapPoints }: TopSheetProps, ref) => {
  const [snapIndex, setSnapIndex] = useState(initialIndex);

  const sheetRef = useRef<BottomSheet>(null);

  const getTranslateYValue = useCallback((snapIndex: number) => {
    return snapIndex === -1 ?
      -SCREEN_HEIGHT :
      (typeof snapPoints[snapIndex] === 'number' ?
        snapPoints[snapIndex] - SCREEN_HEIGHT :
        ((Number(snapPoints[snapIndex].replace('%', '')) * SCREEN_HEIGHT) / 100) - SCREEN_HEIGHT
      );
  }, [snapPoints, SCREEN_HEIGHT, snapIndex]);

  const translateY = useSharedValue(-SCREEN_HEIGHT);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  useEffect(() => {
    const translateYValue = getTranslateYValue(snapIndex);
    translateY.value = withTiming(translateYValue, {
      duration: (ANIMATION_DURATION_FOR_WHOLE_SCREEN / SCREEN_HEIGHT) * Math.abs(translateYValue)
    });
  }, [snapIndex]);

  const expand = useCallback(() => {
    if (snapIndex + 1 < snapPoints.length) {
      setSnapIndex(snapIndex + 1);
    }
  }, [snapIndex]);

  const collapse = useCallback(() => {
    if (snapIndex >= 0) {
      setSnapIndex(snapIndex - 1);
    }
  }, [snapIndex]);

  const close = useCallback(() => {
    setSnapIndex(-1);
  }, [snapIndex]);


  useImperativeHandle(ref, () => ({
    expand,
    collapse,
    close,
  }));

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: (_, gestureState) => {
      return Math.abs(gestureState.dy) > 5;
    },
    onPanResponderGrant: () => {
      console.log('Pan responder granted');
    },
    onPanResponderMove: (event, gestureState) => {
      console.log('Pan move - dy:', gestureState.dy);
      if (gestureState.dy < -15) {
        console.log('Swipe up detected - closing!');
        close()
      }
      if (gestureState.dy > 15) {
        console.log('Swipe down detected - expanding!');
        expand()
      }
    },
    onPanResponderTerminationRequest: () => false,
  });

  return (
    <BottomSheet
      ref={sheetRef}
      style={[styles.topSheet, animatedStyle as any]}
      handleComponent={null}
      enableContentPanningGesture={false}
      enablePanDownToClose={false}
      enableOverDrag={false}
    >
      <BottomSheetView style={styles.contentContainer}>
        <View style={styles.childrenContainer}>
          {children}
        </View>
        <Animated.View style={styles.bottomHandle} {...panResponder.panHandlers}>
          <View style={styles.bottomHandleLine} />
        </Animated.View>
      </BottomSheetView>
    </BottomSheet >
  );
});

const styles = StyleSheet.create({
  topSheet: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  contentContainer: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    backgroundColor: 'red',
    height: SCREEN_HEIGHT - 32,
  },
  childrenContainer: {
    flex: 1,
  },
  bottomHandle: {
    backgroundColor: 'black',
    borderRadius: 2.5,
    width: '100%',
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  bottomHandleLine: {
    backgroundColor: 'white',
    height: 5,
    width: 40,
    borderRadius: 2.5,
    alignSelf: 'center',
  },
});
