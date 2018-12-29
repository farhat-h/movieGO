import React, { PureComponent } from "react";
import { Text, View, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { hightlight } from "../theme";
import { Feather } from "@expo/vector-icons";
export default class SearchHeader extends PureComponent {
  _inputRef = React.createRef();
  _inputText = "";
  _onChangeText = newText => {
    this._inputText = newText;
  };
  clear = () => {
    this._inputRef.current.clear();
  };
  _onSubmit = () => {
    if (this._inputText !== "") {
      this.props.onSearch(this._inputText);
      this._inputText = "";
      this.clear();
    }
  };
  render() {
    return (
      <View style={styles.wrapper}>
        <Feather style={styles.icon} name="search" color="#ABABAB" size={32} />
        <TextInput
          style={styles.textinput}
          ref={this._inputRef}
          onSubmitEditing={this._onSubmit}
          placeholder="Search movie"
          placeholderTextColor="#ABABAB"
          onChangeText={this._onChangeText}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#040919",
    borderRadius: 6,
    height: 48,
    marginHorizontal: 8,
    marginVertical: 16,
    alignItems: "center",
    flexDirection: "row"
  },
  textinput: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginLeft: 20,
    flex: 1
  },
  icon: {
    marginLeft: 16
  }
});
