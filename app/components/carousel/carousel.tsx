/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Component } from "react"
import { Text, View, Dimensions, StyleSheet } from "react-native"

import Carousel from "react-native-snap-carousel" // Version can be specified in package.json
import { color } from "../../theme"
import SurveyScreen from "../survey/survey"
import { scrollInterpolator, animatedStyles } from "../../utils/animations"
// import QuestionStoreModel from "../../models/question-store/question-store"
const questionData = require("../../models/question-store/question-data.json")
const SLIDER_WIDTH = Dimensions.get("window").width
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7)
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 3) / 4)
const DATA = [questionData]
for (let i = 0; i < 4; i++) {
  DATA.push(i)
}

export default class MyCarousel extends Component {
  state = {
    index: 0,
  }

  carousel: Carousel<any>

  constructor(props) {
    super(props)
    this._renderItem = this._renderItem.bind(this)
  }

  _renderItem({ item }) {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.itemLabel}>
          <SurveyScreen />
        </Text>
      </View>
    )
  }

  render() {
    return (
      <View>
        <Carousel
          ref={(c) => (this.carousel = c)}
          data={DATA}
          renderItem={this._renderItem}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          containerCustomStyle={styles.carouselContainer}
          inactiveSlideShift={0}
          onSnapToItem={(index) => this.setState({ index })}
          scrollInterpolator={scrollInterpolator}
          slideInterpolatedStyle={animatedStyles}
          useScrollView={true}
        />
        <Text style={styles.counter}>{this.state.index}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  carouselContainer: {
    marginTop: 50,
  },
  counter: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 25,
    textAlign: "center",
  },

  itemContainer: {
    alignItems: "center",
    backgroundColor: color.palette.offWhite,
    height: ITEM_HEIGHT,
    justifyContent: "center",
    width: ITEM_WIDTH,
  },

  itemLabel: {
    color: color.palette.white,
    fontSize: 24,
  },
})
