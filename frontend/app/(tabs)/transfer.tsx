import { StyleSheet } from "react-native";

import ListInfo from "../../components/ListInfo";
import { Text, View } from "../../components/Themed";
import globalStyles from "../../constants/styles";

export default function TransferScreen() {
  return (
    <View style={globalStyles.container}>
      {/* Separator */}
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />

      {/* Transfer to yourself */}
      <View style={styles.transferSection}>
        <Text style={styles.transferSectionHeader}>Transfer to yourself</Text>
      </View>

      {/* Transfer to other users */}
      <View style={styles.transferSection}>
        <Text style={styles.transferSectionHeader}>
          Transfer to other users
        </Text>
        <View
          style={styles.transferSectionSeparator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
      </View>

      {/* <ListInfo path="app/(tabs)/transactions.tsx" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    height: 1,
    width: "100%",
    boxShadow: "0px 4px 4px #397684",
  },
  transferSection: {
    alignSelf: "flex-start",
    marginTop: 24,
    paddingHorizontal: 24,
    width: "100%",
  },
  transferSectionHeader: {
    color: "#858585",
    fontWeight: "600",
  },
  transferSectionSeparator: {
    height: 2,
    width: "100%",
    marginTop: 4,
  },
});
