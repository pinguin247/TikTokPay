import { StyleSheet } from 'react-native';

import ListInfo from '../../components/ListInfo';
import { Text, View } from '../../components/Themed';
import globalStyles from '../../constants/styles';

export default function TopUpScreen() {
  return (
    <View style={globalStyles.container}>
      <Text style={styles.title}>Top up</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <ListInfo path="app/(tabs)/two.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
