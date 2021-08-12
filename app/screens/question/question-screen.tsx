/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/sort-styles */
import { NONE } from "apisauce"
import React, { Component } from "react"
import { StyleSheet, Button, ScrollView, Text, TextInput, View } from "react-native"
import { SimpleSurvey } from "react-native-simple-survey"
import { color, COLORS } from "../../theme/color"

const GREEN = "rgba(141,196,63,1)"
const DARKGRAY = "rgba(74, 87, 101,1)"
const LIGHTGRAY = "rgba(153, 180, 209,.5)"

const survey = [
  {
    questionType: "Info",
    questionText: "Welcome to My-Codi Survey",
  },
  {
    questionType: "TextInput",
    questionText: "Tell us what do you enjoy about My-Codi?",
    questionId: "opinion",
    placeholderText: "Tell us your My-Codi experience!",
  },
  {
    questionType: "NumericInput",
    questionText: "Rate us at the scale of 1-10",
    questionId: "scale",
    placeholderText: "10",
  },

  {
    questionType: "SelectionGroup",
    questionText: "Do you use My-Codi frequently?",
    questionId: "useBoolean",
    options: [
      {
        optionText: "Yes",
        value: "yes",
      },
      {
        optionText: "No",
        value: "no",
      },
    ],
  },
  {
    questionType: "SelectionGroup",
    questionText: "Do you recommend My-Codi frequently?",
    questionId: "recommendBoolean",
    options: [
      {
        optionText: "Yes",
        value: "yes",
      },
      {
        optionText: "No",
        value: "no",
      },
    ],
  },

  {
    questionType: "Info",
    questionText: "That is all for the demo, tap finish to see your results!",
  },
]

export default class SurveyScreen extends Component {
  // static navigationOptions = () => {
  //   return {
  //     headerStyle: {
  //       backgroundColor: "white",
  //       height: 100,
  //       elevation: 5,
  //     },
  //     headerTintColor: "#fff",
  //     headerTitle: "Sample Survey",
  //     headerTitleStyle: {
  //       flex: 1,
  //     },
  //   }
  // }

  surveyRef: any

  constructor(props) {
    super(props)
    this.state = { backgroundColor: DARKGRAY, answersSoFar: "" }
  }

  onSurveyFinished(answers) {
    /**
     *  By using the spread operator, array entries with no values, such as info questions, are removed.
     *  This is also where a final cleanup of values, making them ready to insert into your DB or pass along
     *  to the rest of your code, can be done.
     *
     *  Answers are returned in an array, of the form
     *  [
     *  {questionId: string, value: any},
     *  {questionId: string, value: any},
     *  ...
     *  ]
     *  Questions of type selection group are more flexible, the entirity of the 'options' object is returned
     *  to you.
     *
     *  As an example
     *  {
     *      questionId: "favoritePet",
     *      value: {
     *          optionText: "Dogs",
     *          value: "dog"
     *      }
     *  }
     *  This flexibility makes SelectionGroup an incredibly powerful component on its own. If needed it is a
     *  separate NPM package, react-native-selection-group, which has additional features such as multi-selection.
     */

    const infoQuestionsRemoved = [...answers]

    // Convert from an array to a proper object. This won't work if you have duplicate questionIds
    const answersAsObj = {}
    for (const elem of infoQuestionsRemoved) {
      answersAsObj[elem.questionId] = elem.value
    }
    this.props.navigation.navigate("SurveyCompleted", { surveyAnswers: answersAsObj })
  }

  /**
   *  After each answer is submitted this function is called. Here you can take additional steps in response to the
   *  user's answers. From updating a 'correct answers' counter to exiting out of an onboarding flow if the user is
   *  is restricted (age, geo-fencing) from your app.
   */
  onAnswerSubmitted(answer) {
    this.setState({ answersSoFar: JSON.stringify(this.surveyRef.getAnswers(), 2) })
    switch (answer.questionId) {
      case "opinion": {
        if (COLORS.includes(answer.value.toLowerCase())) {
          this.setState({ backgroundColor: answer.value.toLowerCase() })
        }
        break
      }
      default:
        break
    }
  }

  renderPreviousButton(onPress, enabled) {
    return (
      // eslint-disable-next-line react-native/no-inline-styles
      <View style={{ flexGrow: 1, maxWidth: 100, marginTop: 10, marginBottom: 10 }}>
        <Button
          backgroundColor={GREEN}
          color={GREEN}
          onPress={onPress}
          disabled={!enabled}
          title={"Previous"}
        />
      </View>
    )
  }

  renderNextButton(onPress, enabled) {
    return (
      // eslint-disable-next-line react-native/no-inline-styles
      <View style={{ flexGrow: 1, maxWidth: 100, marginTop: 10, marginBottom: 10 }}>
        <Button
          color={GREEN}
          onPress={onPress}
          disabled={!enabled}
          backgroundColor={GREEN}
          title={"Next"}
        />
      </View>
    )
  }

  renderFinishedButton(onPress, enabled) {
    return (
      // eslint-disable-next-line react-native/no-inline-styles
      <View style={{ flexGrow: 1, maxWidth: 100, marginTop: 10, marginBottom: 10 }}>
        <Button title={"Done"} onPress={onPress} disabled={!enabled} color={GREEN} />
      </View>
    )
  }

  renderButton(data, index, isSelected, onPress) {
    return (
      <View
        key={`selection_button_view_${index}`}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{ marginTop: 5, marginBottom: 5, justifyContent: "flex-start" }}
      >
        <Button
          title={data.optionText}
          onPress={onPress}
          color={isSelected ? GREEN : DARKGRAY}
          // eslint-disable-next-line react-native/no-inline-styles
          style={isSelected ? { fontWeight: "bold" } : {}}
          key={`button_${index}`}
        />
      </View>
    )
  }

  renderQuestionText(questionText) {
    return (
      // eslint-disable-next-line react-native/no-inline-styles
      <View style={{ marginLeft: 10, marginRight: 10 }}>
        <Text style={styles.questionText}>{questionText}</Text>
      </View>
    )
  }

  renderTextBox(onChange, value, placeholder, onBlur) {
    return (
      <View>
        <TextInput
          style={styles.textBox}
          onChangeText={(text) => onChange(text)}
          numberOfLines={1}
          underlineColorAndroid={"white"}
          placeholder={placeholder}
          placeholderTextColor={"rgba(184,184,184,1)"}
          value={value}
          multiline
          onBlur={onBlur}
          blurOnSubmit
          returnKeyType="done"
        />
      </View>
    )
  }

  renderNumericInput(onChange, value, placeholder, onBlur) {
    return (
      <TextInput
        style={styles.numericInput}
        onChangeText={(text) => {
          onChange(text)
        }}
        underlineColorAndroid={"white"}
        placeholderTextColor={"rgba(184,184,184,1)"}
        value={String(value)}
        placeholder={placeholder}
        keyboardType={"numeric"}
        onBlur={onBlur}
        maxLength={3}
      />
    )
  }

  renderInfoText(infoText) {
    return (
      // eslint-disable-next-line react-native/no-inline-styles
      <View style={{ marginLeft: 10, marginRight: 10 }}>
        <Text style={styles.infoText}>{infoText}</Text>
      </View>
    )
  }

  render() {
    return (
      <View style={[styles.background, { backgroundColor: this.state.backgroundColor }]}>
        <View style={styles.container}>
          <SimpleSurvey
            ref={(s) => {
              this.surveyRef = s
            }}
            survey={survey}
            renderSelector={this.renderButton.bind(this)}
            containerStyle={styles.surveyContainer}
            selectionGroupContainerStyle={styles.selectionGroupContainer}
            navButtonContainerStyle={{ flexDirection: "row", justifyContent: "space-around" }}
            renderPrevious={this.renderPreviousButton.bind(this)}
            renderNext={this.renderNextButton.bind(this)}
            renderFinished={this.renderFinishedButton.bind(this)}
            renderQuestionText={this.renderQuestionText}
            onSurveyFinished={(answers) => this.onSurveyFinished(answers)}
            onAnswerSubmitted={(answer) => this.onAnswerSubmitted(answer)}
            renderTextInput={this.renderTextBox}
            renderNumericInput={this.renderNumericInput}
            renderInfo={this.renderInfoText}
          />
        </View>

        {/* <ScrollView style={styles.answersContainer}>
          <Text style={{ textAlign: "center" }}>JSON output</Text>
          <Text>{this.state.answersSoFar}</Text>
        </ScrollView> */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  // eslint-disable-next-line react-native/no-unused-styles
  answersContainer: {
    backgroundColor: color.palette.white,
    borderRadius: 10,
    elevation: 10,
    marginBottom: 20,
    marginTop: 50,
    maxHeight: "20%",
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: "90%",
  },
  background: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    maxHeight: 700,
    minHeight: 700,
  },

  container: {
    alignItems: "stretch",
    borderRadius: 10,
    elevation: 10,
    flex: 1,
    justifyContent: "center",
    maxWidth: "100%",
    minWidth: "100%",
  },
  infoText: {
    fontSize: 20,
    marginBottom: 20,
    marginLeft: 10,
  },
  // eslint-disable-next-line react-native/no-color-literals
  numericInput: {
    backgroundColor: "white",
    borderColor: "rgba(204,204,204,1)",
    borderRadius: 10,
    borderWidth: 1,
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
    textAlignVertical: "top",
  },
  questionText: {
    fontSize: 22,
    marginBottom: 20,
  },
  // eslint-disable-next-line react-native/no-color-literals
  selectionGroupContainer: {
    alignSelf: "center",
    alignContent: "center",
    backgroundColor: NONE,
    flexDirection: "column",
    width: "25%",
  },
  // eslint-disable-next-line react-native/no-color-literals
  surveyContainer: {
    alignContent: "center",
    alignSelf: "center",
    backgroundColor: LIGHTGRAY,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    flexGrow: 0,
    padding: 5,
    width: "100%",
    height: "30%",
  },
  // eslint-disable-next-line react-native/no-color-literals
  textBox: {
    backgroundColor: "white",
    borderColor: "rgba(204,204,204,1)",
    borderRadius: 10,
    borderWidth: 1,
    // marginLeft: 10,
    // marginRight: 10,
    width: "100%",
    padding: 10,
    textAlignVertical: "top",
    fontSize: 18,
  },
})
