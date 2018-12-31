import { createStackNavigator, createAppContainer } from "react-navigation";
import Home from "../screens/HomeScreen";
import Detail from "../screens/DetailScreen";

const Navigator = createStackNavigator(
  {
    Home,
    Detail
  },
  {
    initialRouteName: "Detail",
    defaultNavigationOptions: {
      header: null
    }
  }
);
export default createAppContainer(Navigator);
