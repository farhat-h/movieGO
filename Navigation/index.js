import { createStackNavigator, createAppContainer } from "react-navigation";
import Home from "../screens/HomeScreen";
import Detail from "../screens/DetailScreen";
import Gallery from "../screens/Gallery";

const DetailStack = createStackNavigator(
  {
    Detail,
    Gallery
  },
  {
    mode: "modal",
    headerMode: "none"
  }
);
const Navigator = createStackNavigator(
  {
    Home,
    DetailStack
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      header: null
    }
  }
);

export default createAppContainer(Navigator);
