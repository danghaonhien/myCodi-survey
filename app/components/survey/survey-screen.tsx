import { createStackNavigator } from "react-navigation-stack"
import { createAppContainer } from "react-navigation"
import SurveyCompletedScreen from "./survey-completed"
import SurveyScreen from "./survey"
const stackNav = createStackNavigator({
  Survey: {
    screen: SurveyScreen,
  },
  SurveyCompleted: {
    screen: SurveyCompletedScreen,
  },
})

const AppContainer = createAppContainer(stackNav)

export default AppContainer
