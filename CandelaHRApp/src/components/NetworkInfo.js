import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";

import { moderateScale } from "../utility/UIScale";

const NetworkInfo = () => {
  const netInfo = useNetInfo();

  return netInfo.isConnected ? null : (
    <View style={styles.container}>
      <Text style={styles.text}>No Internet Connection</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#b52424",
    marginTop: moderateScale(-1),
    alignItems: "center",
    padding: moderateScale(5)
  },

  text: {
    fontSize: moderateScale(13),
    color: "white"
  }
});

export default NetworkInfo;
