import React, { PureComponent } from "react";
import { View, StyleSheet } from "react-native";
import { DangerZone } from "expo";
import _animJson from "../assets/movie_loader_coco.json";
import { background } from "../theme";
const { Lottie } = DangerZone;
export default class Loading extends PureComponent {
  _animation = React.createRef();
  componentDidMount = () => {
    this._animation.current.play();
  };

  render() {
    return (
      <View style={styles.wrapper}>
        <Lottie
          style={styles.animation}
          ref={this._animation}
          source={_animJson}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: background,
    alignItems: "center",
    justifyContent: "center"
  },
  animation: {
    marginTop: -100,
    width: 250,
    height: 250
  }
});
