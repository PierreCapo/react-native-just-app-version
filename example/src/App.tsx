import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { getAppVersion, getBuildNumber } from 'react-native-just-app-version';

export default function App() {
  const [result, setResult] = React.useState('');

  React.useEffect(() => {
    setResult(getAppVersion() + ' - ' + getBuildNumber());
  }, []);

  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
