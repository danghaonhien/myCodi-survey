import React, { Component } from "react"
import { ScrollView, StyleSheet, Text, View } from "react-native"

const GREEN = "rgba(141,196,63,1)"
const PURPLE = "rgba(108,48,237,1)"
const defaultAnswers = {
  opinion: "nothing",
  scale: "0",
  useBoolean: "nothing",
  recommendBoolean: "nothing",
}
export default class SurveyCompletedScreen extends Component {
  static navigationOptions = () => {
    return {
      headerStyle: {
        backgroundColor: GREEN,
        height: 40,
        elevation: 5,
      },
      headerTintColor: "#fff",
      headerTitle: "Survey Results",
      headerTitleStyle: {
        flex: 1,
      },
    }
  }

  render() {
    const answers = this.props.navigation.getParam("surveyAnswers", defaultAnswers)

    return (
      <View style={styles.background}>
        <View style={styles.container}>
          <ScrollView>
            <Text style={styles.questionText}>The results are in!</Text>
            <Text style={styles.questionText}>
              Tell us what do you enjoy about My-Codi?: {answers.opinion}
            </Text>
            <Text style={styles.questionText}>
              Rate us at the scale of 1-10: {answers.scale.value}
            </Text>
            <Text style={styles.questionText}>
              Do you use My-Codi frequently? {answers.useBoolean.value}
            </Text>
            <Text style={styles.questionText}>
              Do you recommend My-Codi frequently? {answers.recommendBoolean.value}
            </Text>
            <Text>
              Raw JSON: {JSON.stringify(this.props.navigation.getParam("surveyAnswers", {}))}
            </Text>
          </ScrollView>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  background: {
    alignItems: "center",
    backgroundColor: PURPLE,
    flex: 1,
    justifyContent: "center",
  },
  // eslint-disable-next-line react-native/no-color-literals
  container: {
    alignItems: "stretch",
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 20,
    justifyContent: "center",
    maxHeight: "80%",
    maxWidth: "90%",
    minWidth: "70%",
  },
  questionText: {
    fontSize: 20,
    marginBottom: 20,
  },
})
