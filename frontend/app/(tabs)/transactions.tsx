import { StyleSheet } from "react-native";

import ListInfo from "../../components/ListInfo";
// import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import globalStyles from "../../constants/styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useState } from "react";
import {
  transactionsDataAugust,
  transactionsDataJuly,
  transactionsDataSeptember,
} from "../../constants/mockData";

const data = {
  months: ["SEP 2023", "AUG 2023", "JUL 2023"],
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
      <View></View>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />

      {/* September */}
      {selectedMonth === "SEP 2023" && (
        <View style={styles.list}>
          {transactionsMonthsFilters.Sep.map((sep_t_data) => (
            <View key={sep_t_data.header}>
              <Text style={styles.dateHeader}>{sep_t_data.header}</Text>
              {transactionsDataSeptember.map((t_data) => {
                if (t_data.date === sep_t_data.dateKey) {
                  return (
                    <ListInfo
                      key={t_data.id}
                      icon={t_data.icon}
                      transferAccount={t_data.transferAccount}
                      transferAction={t_data.transferAction}
                      add={t_data.add}
                      amount={t_data.amount.toFixed(2)}
                      date={t_data.date}
                    />
                  );
                }
              })}
            </View>
          ))}
        </View>
      )}
      {/* August */}
      {selectedMonth === "AUG 2023" && (
        <View style={styles.list}>
          {transactionsMonthsFilters.Aug.map((aug_t_data) => (
            <View key={aug_t_data.header}>
              <Text style={styles.dateHeader}>{aug_t_data.header}</Text>
              {transactionsDataAugust.map((t_data) => {
                if (t_data.date === aug_t_data.dateKey) {
                  return (
                    <ListInfo
                      key={t_data.id}
                      icon={t_data.icon}
                      transferAccount={t_data.transferAccount}
                      transferAction={t_data.transferAction}
                      add={t_data.add}
                      amount={t_data.amount.toFixed(2)}
                      date={t_data.date}
                    />
                  );
                }
              })}
            </View>
          ))}
        </View>
      )}
      {/* July */}
      {selectedMonth === "JUL 2023" && (
        <View style={styles.list}>
          {transactionsMonthsFilters.Jul.map((jul_t_data) => (
            <View key={jul_t_data.header}>
              <Text style={styles.dateHeader}>{jul_t_data.header}</Text>
              {transactionsDataJuly.map((t_data) => {
                if (t_data.date === jul_t_data.dateKey) {
                  return (
                    <ListInfo
                      key={t_data.id}
                      icon={t_data.icon}
                      transferAccount={t_data.transferAccount}
                      transferAction={t_data.transferAction}
                      add={t_data.add}
                      amount={t_data.amount.toFixed(2)}
                      date={t_data.date}
                    />
                  );
                }
              })}
            </View>
          ))}
        </View>
      )}
      {/* Filter transaction data according to months */}
    </View>
  );
}

const transactionsMonthsFilters = {
  Sep: [
    { header: "03 September 2023", dateKey: "03 Sep" },
    { header: "02 September 2023", dateKey: "02 Sep" },
    { header: "01 September 2023", dateKey: "01 Sep" },
  ],
  Aug: [
    { header: "31 August 2023", dateKey: "31 Aug" },
    { header: "25 August 2023", dateKey: "25 Aug" },
    { header: "18 August 2023", dateKey: "18 Aug" },
  ],
  Jul: [
    { header: "29 July 2023", dateKey: "29 Jul" },
    { header: "28 July 2023", dateKey: "28 Jul" },
    { header: "27 July 2023", dateKey: "27 Jul" },
  ],
};

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
    backgroundColor: "none",
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
  list: {
    backgroundColor: "none",
    width: "90%",
    padding: 10,
  },
  dateHeader: {
    fontSize: 16,
    color: "#858585",
    marginTop: 13,
    marginBottom: 5,
  },
});
