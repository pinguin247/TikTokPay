import {
  StyleSheet,
  Image,
  ImageBackground,
  ImageBackgroundBase,
} from "react-native";
import ListInfo from "../../components/ListInfo";
import { Text, View } from "../../components/Themed";
import globalStyles from "../../constants/styles";
import { Card } from "react-native-paper";
import IconButton from "../../components/IconButton";
import * as React from "react";
import { Link } from "expo-router";
import { useNavigation } from "@react-navigation/native";

export default function TabOneScreen() {
  const navigation = useNavigation();
  const handleTransferPress = () => {
    // Handle button press action here
    navigation.navigate('transfer');
  };

  const handleTopUpPress = () => {
    // Handle button press action here
    navigation.navigate('topup');
  };

  const handleScanPress = () => {
    // Handle button press action here
    console.log("Scan");
  };

  return (
    <View style={globalStyles.container}>
      <ImageBackground
        style={styles.backgroundimage}
        source={require("../../assets/images/background.png")}
      >
        <View style={{ position: "absolute", marginLeft: 220, marginTop: 60 }}>
          <ImageBackground source={require("../../assets/images/card.png")} />
        </View>
        <View style={styles.headerSection}>
          <Image source={require("../../assets/images/Logo.png")} />
          <Text style={styles.title}>$245.00</Text>
        </View>
        <Card style={styles.card}>
          <View style={styles.iconRow}>
            <View style={{ backgroundColor: "none", alignItems: "center" }}>
              <IconButton
                icon="wallet"
                onPress={handleTopUpPress}
                color="red"
                size={32}
              />
              <View
                style={{
                  backgroundColor: "none",
                  position: "absolute",
                  top: 36,
                  left: 37,
                }}
              >
                <Image source={require("../../assets/images/add.png")} />
              </View>
              <Text style={{ color: "black", fontWeight: "400" }}>Top up</Text>
            </View>
            <View style={{ backgroundColor: "none", alignItems: "center" }}>
              <IconButton
                icon="qrcode"
                onPress={handleScanPress}
                color="red"
                size={32}
              />
              <Text style={{ color: "black", fontWeight: "400" }}>
                Scan/Pay
              </Text>
            </View>
            <View style={{ backgroundColor: "none", alignItems: "center" }}>
              <IconButton
                icon="bank-transfer"
                onPress={handleTransferPress}
                color="red"
                size={32}
              />
              <Text style={{ color: "black", fontWeight: "400" }}>
                Transfer
              </Text>
            </View>
          </View>
        </Card>

      </ImageBackground>
      <Card style={styles.transactionscard}>
        <View
          style={{ backgroundColor: "none", flex: 1, flexDirection: "row" }}
        >
          <Text style={styles.cardHeader}>Latest Transactions</Text>
          <View
            style={{ backgroundColor: "none", marginTop: 6, marginLeft: 80 }}
          >
            <Link style={styles.linkText} href="/transactions">
              View All
            </Link>
          </View>
         
          </View> 
          <View style={styles.separator} />
          <ListInfo icon="wallet-plus" transferAccount="From Bank" transferAction="Top Up" add={true} amount="200.00" date="03 Sep" />
          <ListInfo icon="account-arrow-right" transferAccount="To Sarah" transferAction="Transfer" add={false} amount="50.00" date="03 Sep" />
          <ListInfo icon="data-matrix-scan" transferAccount="To Chicken Rice Stall" transferAction="Scan/Pay" add={false} amount="3.50" date="03 Sep" />
          <ListInfo icon="account-arrow-left" transferAccount="From Sarah" transferAction="Transfer" add={true} amount="50.00" date="02 Sep" />
          <ListInfo icon="data-matrix-scan" transferAccount="To Duck Rice Stall" transferAction="Scan/Pay" add={false} amount="3.50" date="02 Sep" />
      </Card>
        
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundimage:{
    width:'100%',
    height:'78%',
  },
  title: {
    color: '#000', // Color in React Native is specified using a string, e.g., 'black' or '#000'
    fontSize: 45, // Font size is in numeric values, not pixels
    fontWeight: '700', // Font weight can be specified as 'normal', 'bold', etc.
    lineHeight: undefined, // Line height is set automatically based on font size
  },
  headerSection: {
    marginTop:100,
    paddingLeft:20,
    backgroundColor:'none'
  },
  card:{
    marginTop: 40,
    width: '90%',
    alignSelf: 'center',
    flex: 0.25,
    justifyContent:"center",
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    paddingBottom:6
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignContent:'center',
    backgroundColor:'none',
    flex:1
  },
  transactionscard:{
    top: 375,
    position: 'absolute',
    width: '90%',
    alignSelf: 'center',
    height:'50%',
    padding:15,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  cardHeader:{
    color: '#000', // Color in React Native is specified using a string, e.g., 'black' or '#000'
    fontSize: 22, // Font size is in numeric values, not pixels
    lineHeight: undefined, // Line height is set automatically based on font size
  },
  separator: {
    marginTop:15,
    height: 1,
    width: '100%',
    backgroundColor:"rgba(57, 118, 132, 0.5)"
  },
  linkText:{
    color:"#FA6B99"
  }
});
