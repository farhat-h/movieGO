import React, { PureComponent } from "react";
import {
  Text,
  View,
  Image,
  ActivityIndicator,
  StyleSheet,
  Dimensions
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { tertiary, background } from "../theme";
import { img_gallery } from "../api";

const { width: _width, height: _height } = Dimensions.get("window");
export default class Gallery extends PureComponent {
  _renderImages = (image, index) => {
    const uri = img_gallery + image.file_path;

    return (
      <Image
        key={`image-${index}`}
        source={{ uri }}
        defaultSource={require("../assets/icon.png")}
        style={styles.image}
      />
    );
  };

  render() {
    return (
      <ScrollView horizontal pagingEnabled>
        {this.props.navigation.getParam("images").map(this._renderImages)}
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: background
  },
  image: {
    height: _height,
    width: _width,
    resizeMode: "cover"
  }
});
