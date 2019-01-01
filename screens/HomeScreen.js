import React, { PureComponent } from "react";
import { Text, View, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import ListItem from "../components/ListItem.js";
import * as theme from "../theme";
import SearchHeader from "../components/SearchHeader.js";
import Loading from "../components/Loading.js";
import { getApi } from "../api";

export default class HomeScreen extends PureComponent {
  state = {
    movies: [],
    loading: true,
    mode: "latest",
    pageLimit: -1
  };
  _api = getApi();
  componentDidMount = () => {
    this._api.setMode(this.state.mode).then(data => {
      this.setState({
        pageLimit: data.total_pages,
        movies: data.results,
        loading: false
      });
    });
  };
  _loadMoreData = () => {
    if (this._api.getPage() <= this.state.pageLimit) {
      this._api.getNext().then(data => {
        this.setState({
          loading: false,
          movies: [...this.state.movies, ...data.results]
        });
      });
    }
  };
  _renderItem = ({ item, index }) => {
    return <ListItem onPress={this._navigate} {...item} />;
  };
  _keyExtractor = item => `${item.id}`;
  _search = textString => {
    this.setState({
      loading: true
    });
    this._api.search(textString).then(data =>
      this.setState({
        movies: data.results,
        loading: false,
        pageLimit: data.total_pages
      })
    );
  };
  _navigate = movieId => {
    this.props.navigation.navigate("DetailStack", { movieId });
  };
  render() {
    return (
      <View style={styles.container}>
        <SearchHeader onSearch={this._search} />
        {!this.state.loading && (
          <Text style={styles.title}>
            {this.state.mode.charAt(0).toUpperCase() + this.state.mode.slice(1)}
          </Text>
        )}
        {this.state.loading ? (
          <Loading />
        ) : (
          <FlatList
            onEndReached={this._loadMoreData}
            onEndReachedThreshold={0.6}
            keyExtractor={this._keyExtractor}
            data={this.state.movies}
            renderItem={this._renderItem}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    paddingTop: 48
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    color: "white",
    marginLeft: 16
  }
});
