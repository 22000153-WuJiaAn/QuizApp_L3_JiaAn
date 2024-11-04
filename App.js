import React, { useState } from 'react';
import { View, Text, Button, Alert, Image, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const QuizApp = () => {
  // State to track answers and the correct answers
  const [answers, setAnswers] = useState(["", "", ""]);
  const correctAnswers = ["Elephant", "Leopard", "Kingfisher"];

  // Images for each question
  const images = [
    { source: require('./img/elephant.jpg'), label: "What animal is this?", options: ["Elephant", "Giraffe", "Penguin"] },
    { source: require('./img/leopard.jpg'), label: "What animal is this?", options: ["Leopard", "Tiger", "Crocodile"] },
    { source: require('./img/kingfisher.jpg'), label: "What animal is this?", options: ["Kingfisher", "Owl", "Peacock"] },
  ];

  // Function to update the answer for each question
  const updateAnswer = (value, index) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  // Function to check answers and show result
  const submitAnswers = () => {
    let correctCount = 0;
    answers.forEach((answer, index) => {
      if (answer === correctAnswers[index]) {
        correctCount++;
      }
    });

    // Display different messages based on correct count
    if (correctCount === 0) {
      Alert.alert("Try again!", "You have 0 correct");
    } else if (correctCount === 3) {
      Alert.alert("Congratulations!", "You are an animal expert, you have 3 correct!");
    } else {
      Alert.alert(`You have ${correctCount} correct answer(s)!`);
    }
  };

  return (
      <ScrollView style={{ padding: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}>
          Animal Quiz
        </Text>

        {images.map((item, index) => (
            <View key={index} style={{ marginBottom: 20 }}>
              <Image source={item.source} style={{ width: '100%', height: 150 }} />
              <Text>{item.label}</Text>


              <Picker
                  selectedValue={answers[index]}
                  onValueChange={(value) => updateAnswer(value, index)}
                  style={{ height: 50, width: '100%' }}
              >
                <Picker.Item label="Select an item..." value="" />
                {item.options.map((option, optIndex) => (
                    <Picker.Item key={optIndex} label={option} value={option} />
                ))}
              </Picker>
            </View>
        ))}

        <Button title="Submit Answers" onPress={submitAnswers} />
      </ScrollView>
  );
};

export default QuizApp;
