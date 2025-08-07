import { Button, ScrollView, StatusBar, StyleSheet, Text, TextInput, useColorScheme, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { TopSheet } from './TopSheet';
import { useRef } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const topSheetRef = useRef<BottomSheet>(null);

  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <View style={{ marginTop: 100 }}>
          <Button title="Expand" onPress={() => topSheetRef.current?.expand()} />
          <Button title="Collapse" onPress={() => topSheetRef.current?.collapse()} />
          <Button title="Close" onPress={() => topSheetRef.current?.close()} />

        </View>
        <TopSheet ref={topSheetRef} initialIndex={0} snapPoints={[200, '58%']}>
          <View style={styles.contentContainer}>
            <Text style={styles.contentTitle}>Hello Swipe or click </Text>
            <TextInput style={styles.contentInput} />
            <Button title="Expand" onPress={() => topSheetRef.current?.expand()} />
            <Button title="Collapse" onPress={() => topSheetRef.current?.collapse()} />
            <Button title="Close" onPress={() => topSheetRef.current?.close()} />
          </View>
        </TopSheet>
        <ScrollView />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'yellow'
  },
  contentTitle: {
    color: 'red',
    fontSize: 20,
    fontWeight: 'bold'
  },
  contentInput: {
    width: '100%',
    backgroundColor: 'white',
    color: 'black',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10
  }
});

export default App;
