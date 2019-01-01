import React, { PureComponent } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import * as theme from "../theme";
import StarRating from "./StarRating";
import { img_poster } from "../api";
import { TapGestureHandler, State } from "react-native-gesture-handler";

class ListItem extends PureComponent {
  limitTitle = () => {
    let _title = this.props.title;
    if (_title.length > 25) {
      _title = _title.substring(0, 16) + "..";
    }
    return _title;
  };
  _onTap = ({ nativeEvent }) => {
    if (nativeEvent.oldState == State.ACTIVE) {
      this.props.onPress(this.props.id);
    }
  };
  render() {
    return (
      <TapGestureHandler onHandlerStateChange={this._onTap}>
        <View style={styles.wrapper}>
          <Image
            style={styles.image}
            source={{
              uri: img_poster + this.props.poster_path
            }}
          />
          <View>
            <Text style={styles.year}>
              {this.props.release_date.substring(0, 4)}
            </Text>
            <Text style={styles.title}>{this.limitTitle()}</Text>
            <StarRating vote_average={this.props.vote_average} />
          </View>
          <View style={styles.score_circle}>
            <Text style={styles.score}>{this.props.vote_average}</Text>
          </View>
        </View>
      </TapGestureHandler>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    height: 120,
    backgroundColor: theme.hightlight,
    marginVertical: 16,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 8,
    paddingHorizontal: 8
  },
  image: {
    width: 85,
    height: 110,
    borderRadius: 6,
    marginRight: 16
  },
  score_circle: {
    position: "absolute",
    backgroundColor: theme.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    right: 8,
    top: -8
  },
  score: {
    color: "white",
    fontWeight: "bold"
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 8
  },
  year: {
    color: "white",
    fontWeight: "500",
    fontSize: 14,
    opacity: 0.6
  }
});

export default ListItem;
