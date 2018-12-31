import React, { PureComponent } from "react";
import { Text, View, StyleSheet, Image, ImageBackground } from "react-native";
import data from "../mock/detail.json";
import * as Colors from "../theme";
import * as API from "../api";
import StarRating from "../components/StarRating.js";
import { LinearGradient } from "expo";

export default class DetailScreen extends PureComponent {
  render() {
    const backdrop = API.img_backDrop + data.backdrop_path;
    const genres = data.genres.map((item, index) => (
      <Text style={styles.genre} key={`${index}`}>
        {item.name}
        {index == data.genres.length - 1 ? "" : " / "}
      </Text>
    ));
    return (
      <View style={styles.container}>
        <ImageBackground source={{ uri: backdrop }} style={styles.backdrop}>
          <LinearGradient
            style={styles.gradient}
            colors={["transparent", "rgba(0,0,0,0.8)"]}
          />
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>{data.original_title}</Text>
            <StarRating vote_average={data.vote_average} />
          </View>
        </ImageBackground>
        <View style={styles.genres_wrapper}>{genres}</View>
        <Text style={{ color: "white" }}>{data.overview}</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1,
    paddingTop: 24
  },
  titleWrapper: {
    position: "absolute",
    bottom: 8,
    left: 16,
    width: "80%"
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8
  },
  backdrop: {
    width: "100%",
    height: 250
  },
  gradient: {
    width: "100%",
    height: "100%",
    left: 0,
    height: 250,
    position: "absolute",
    top: 0
  },
  poster: {
    width: 85,
    height: 110,
    borderRadius: 6,
    position: "absolute",
    top: -50,
    left: 32
  },
  genre: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
    opacity: 0.6
  },
  genres_wrapper: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingTop: 16
  }
});
