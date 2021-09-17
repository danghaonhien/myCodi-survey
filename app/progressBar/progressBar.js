/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import React, { useState, useRef } from "react"
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
  Modal,
  Animated,
} from "react-native"
import { COLORS, SIZES } from "../theme/color"
import survey from "../data/surveyData"

const ProgressBar = () => {
  const allQuestions = survey
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [currentOptionSelected, setCurrentOptionSelected] = useState(null)
  const [answer, setAnswer] = useState(1)
  const [showNextButton, setShowNextButton] = useState(false)
  const [showScoreModal, setShowScoreModal] = useState(false)

  // Handle NExt
  const handleNext = () => {
    if (currentQuestionIndex == allQuestions.length - 1) {
      // Last Question
      // Show Score Modal
      setShowScoreModal(true)
    } else {
      //   setTextQuestions(currentQuestionIndex + 1);
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setCurrentOptionSelected(null)
      //   setCurrentTextQuestions(null);
      //   setCorrectOption(null);
      setIsOptionsDisabled(false)
      setShowNextButton(false)
    }
    Animated.timing(progress, {
      toValue: currentQuestionIndex + 1,
      duration: 1000,
      useNativeDriver: false,
    }).start()
  }

  // Restart
  //   const restartQuiz = () => {
  //     setShowScoreModal(false)
  //     setCurrentQuestionIndex(0)
  //     setAnswer(0)
  //     setCurrentOptionSelected(null)
  //     setCurrentTextQuestions(null)
  //     // setCorrectOption(null);
  //     setIsOptionsDisabled(false)
  //     setShowNextButton(false)
  //     Animated.timing(progress, {
  //       toValue: 0,
  //       duration: 1000,
  //       useNativeDriver: false,
  //     }).start()
  //   }

  // Next Button

  const renderNextButton = () => {
    if (showNextButton) {
      return (
        <TouchableOpacity
          onPress={handleNext}
          style={{
            marginTop: 20,
            width: "100%",
            backgroundColor: COLORS.accent,
            padding: 20,
            borderRadius: 5,
          }}
        >
          <Text style={{ fontSize: 20, color: COLORS.white, textAlign: "center" }}>Next</Text>
        </TouchableOpacity>
      )
    } else {
      return null
    }
  }

  /// /Render Progress Bar
  const [progress, setProgress] = useState(new Animated.Value(0))
  const progressAnim = progress.interpolate({
    inputRange: [0, allQuestions.length],
    outputRange: ["0%", "100%"],
  })

  const renderProgressBar = () => {
    return (
      <View
        style={{
          width: "100%",
          height: 20,
          borderRadius: 20,
          backgroundColor: "#00000020",
        }}
      >
        <Animated.View
          style={[
            {
              height: 20,
              borderRadius: 20,
              backgroundColor: COLORS.accent,
            },
            {
              width: progressAnim,
            },
          ]}
        />
      </View>
    )
  }
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <View
        style={{
          flex: 1,
          paddingVertical: 40,
          paddingHorizontal: 16,
          backgroundColor: COLORS.background,
          position: "relative",
        }}
      >
        {/* ProgressBar */}
        {renderProgressBar()}

        {/* Next Button */}
        {renderNextButton()}
      </View>
    </SafeAreaView>
  )
}
export default ProgressBar
