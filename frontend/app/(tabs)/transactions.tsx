import { StyleSheet } from "react-native";

import ListInfo from "../../components/ListInfo";
// import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import globalStyles from "../../constants/styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useState } from "react";

const data = {
  months: ["AUG 2023", "SEP 2023", "OCT 2023"],
};

export default function TransactionsScreen() {
  const [selectedMonth, setSelectedMonth] = useState<string>(data.months[0]);

  return (
    <View style={globalStyles.container}>
      {/* Months Selector */}
      <View style={styles.monthsTabs}>
        {data.months.map((month) => (
          <TouchableOpacity key={month} onPress={() => setSelectedMonth(month)}>
            <Text
              style={[
                styles.monthsTab,
                selectedMonth === month && styles.monthsTabHighlighted,
              ]}
            >
              {month}
            </Text>
            {selectedMonth === month && (
              <View style={styles.highlightedColorPill} />
            )}
          </TouchableOpacity>
        ))}
      </View>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />

      {/* Filter transaction data according to months */}

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
  monthsTabs: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
    backgroundColor:'none'
  },
  monthsTab: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#858585",
  },
  monthsTabHighlighted: {
    color: "black",
  },
  highlightedColorPill: {
    backgroundColor: "#FF0050",
    height: 12,
    width: "130%",
    transform: "translateY(-70%) translateX(-12%)",
    opacity: 0.2,
    borderRadius: 20,
  },
});
