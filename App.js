import React, { useState } from 'react';
import { View, Text, Button, Alert, Image, ScrollView, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const QuizApp = () => {
  const [answers, setAnswers] = useState(["", "", ""]);

  const correctAnswers = ["Elephant", "Leopard", "Kingfisher"];

  const images = [
    { source: require('./img/elephant.jpg'), label: "What animal is this?", options: ["Elephant", "Giraffe", "Penguin"] },
    { source: require('./img/leopard.jpg'), label: "What animal is this?", options: ["Leopard", "Tiger", "Crocodile"] },
    { source: require('./img/kingfisher.jpg'), label: "What animal is this?", options: ["Kingfisher", "Owl", "Peacock"] },
  ];

  const updateAnswer = (value, index) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const submitAnswers = () => {
    let correctCount = 0;
    answers.forEach((answer, index) => {
      if (answer === correctAnswers[index]) {
        correctCount++;
      }
    });

    if (correctCount === 0) {
      Alert.alert("Try again!", "You have 0 correct");
    } else if (correctCount === 3) {
      Alert.alert("Congratulations!", "You are an animal expert, you have 3 correct!");
    } else {
      Alert.alert(`You have ${correctCount} correct answer(s)!`);
    }
  };

  return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.header}>🐾 Animal Quiz</Text>

        {images.map((item, index) => (
            <View key={index} style={styles.card}>
              <Image source={item.source} style={styles.image} />
              <Text style={styles.question}>{item.label}</Text>

              <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={answers[index]}
                    onValueChange={(value) => updateAnswer(value, index)}
                    style={styles.picker}
                >
                  <Picker.Item label="Select an item..." value="" />
                  {item.options.map((option, optIndex) => (
                      <Picker.Item key={optIndex} label={option} value={option} />
                  ))}
                </Picker>
              </View>
            </View>
        ))}

        <View style={styles.buttonContainer}>
          <Button title="Submit Answers" onPress={submitAnswers} color="#1E90FF" />
        </View>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: '#ffffff',
  },
  contentContainer: {
     padding: 20,
     paddingBottom: 60,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 20,
    color: '#000000',
  },
  card: {
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: '#ffffff',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  question: {
    backgroundColor: '#1E90FF',
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 10,
  },
  pickerContainer: {
    borderTopWidth: 1,
    borderColor: '#dcdcdc',
    paddingHorizontal: 10,
  },
  picker: {
    width: '100%',
    height: 50,
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
});

export default QuizApp;
