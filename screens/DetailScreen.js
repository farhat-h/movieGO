import React, { PureComponent } from "react";
import { Text, View, StyleSheet, Image, ImageBackground } from "react-native";
import data from "../mock/detail.json";
import * as Colors from "../theme";
import * as API from "../api";
import StarRating from "../components/StarRating.js";
import { LinearGradient } from "expo";
import TRS from "../components/TRS.js";
import { TapGestureHandler, State } from "react-native-gesture-handler";
import Loading from "../components/Loading.js";

export default class DetailScreen extends PureComponent {
  state = {
    canShowGallery: false,
    loading: true,
    images: [],
    details: {}
  };

  componentDidMount = () => {
    const movieId = this.props.navigation.getParam("movieId");
    const detailURL = API.getDetails(movieId);
    fetch(API.getImagesURL(movieId))
      .then(res => res.json())
      .then(data => {
        this.setState({ images: data.posters, canShowGallery: true });
      });
    fetch(detailURL)
      .then(res => res.json())
      .then(data => this.setState({ loading: false, details: data }));
  };

  _tapGesture = ({ nativeEvent }) => {
    if (nativeEvent.oldState == State.ACTIVE && this.state.canShowGallery) {
      this.props.navigation.navigate("Gallery", { images: this.state.images });
    }
  };
  _renderGenres = () => {
    return this.state.details.genres.map((item, index) => (
      <Text
        numberOfLines={1}
        ellipsizeMode="clip"
        style={styles.genre}
        key={`${index}`}
      >
        {item.name}
        {index == this.state.details.genres.length - 1 ? "" : " / "}
      </Text>
    ));
  };
  render() {
    const backdrop = API.img_backDrop + this.state.details.backdrop_path;
    const poster = API.img_poster + this.state.details.poster_path;

    return this.state.loading ? (
      <Loading />
    ) : (
      <View style={styles.container}>
        <TapGestureHandler
          onGestureEvent={this._showModalHandler}
          onHandlerStateChange={this._tapGesture}
        >
          <View>
            <ImageBackground source={{ uri: backdrop }} style={styles.backdrop}>
              <LinearGradient
                style={styles.gradient}
                colors={["transparent", "rgba(0,0,0,0.8)"]}
              />
              <View style={styles.titleWrapper}>
                <Image style={styles.poster} source={{ uri: poster }} />
                <View>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="clip"
                    style={styles.title}
                  >
                    {this.state.details.original_title}
                  </Text>
                  <StarRating vote_average={this.state.details.vote_average} />
                </View>
              </View>
            </ImageBackground>
          </View>
        </TapGestureHandler>
        <View style={styles.content}>
          <TRS
            vote_average={this.state.details.vote_average}
            revenue={this.state.details.revenue}
            runtime={this.state.details.runtime}
          />
          <View style={styles.genres_wrapper}>{this._renderGenres()}</View>
          <Text style={styles.plot}>{this.state.details.overview}</Text>
          <View>
            <Text>Gallery goes here</Text>
          </View>
        </View>
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
    flexDirection: "row",
    alignItems: "center",
    width: "80%"
  },
  title: {
    maxWidth: "100%",
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
    marginRight: 16
  },
  genre: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
    opacity: 0.6
  },
  genres_wrapper: {
    flexDirection: "row",
    marginBottom: 16
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 16
  },
  plot: {
    lineHeight: 24,
    fontSize: 14,
    fontWeight: "300",
    color: "white"
  }
});
