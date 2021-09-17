export default survey = [
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
