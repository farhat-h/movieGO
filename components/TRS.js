import React, { PureComponent } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import * as theme from "../theme";
import { minutesToString, moneyString } from "../api";
export default class TRS extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.cell}>
          <Feather
            style={styles.icon}
            name="clock"
            color={theme.tertiary}
            size={24}
          />
          <Text style={styles.label}>
            {minutesToString(this.props.runtime)}
          </Text>
        </View>

        <View style={styles.cell}>
          <Feather
            style={styles.icon}
            name="dollar-sign"
            color={theme.secondary}
            size={24}
          />
          <Text style={styles.label}>{moneyString(this.props.revenue)}</Text>
        </View>

        <View style={styles.cell}>
          <Feather
            style={styles.icon}
            name="star"
            color={theme.primary}
            size={24}
          />
          <Text style={styles.label}>{this.props.vote_average} </Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingVertical: 16
  },
  cell: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  rightBorder: {
    borderRightWidth: StyleSheet.hairlineWidth,
    borderColor: "white"
  },
  label: {
    color: "white",
    fontSize: 16
  },
  icon: {
    marginRight: 8
  }
});
