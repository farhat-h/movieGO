import React, { PureComponent } from "react";
import { Text, View, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { secondary, hightlight, background } from "../theme";
class StarRating extends PureComponent {
  render() {
    const { vote_average } = this.props;
    const score = vote_average / 2;
    return (
      <View style={{ flexDirection: "row" }}>
        {[1, 2, 3, 4, 5].map(star => {
          let fillColor = background;
          if (star <= score) {
            fillColor = secondary;
          }
          return (
            <FontAwesome
              key={`rate-${star}`}
              style={{ marginHorizontal: 6 }}
              name="star"
              color={fillColor}
              size={18}
            />
          );
        })}
      </View>
    );
  }
}

export default StarRating;
