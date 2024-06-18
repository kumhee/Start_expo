import { useState } from "react";
import { StyleSheet, TextInput, View, Alert } from "react-native";

import PrimaryButton from "../components/ui/PrimaryButton";
import Colors from "../constants/colors";
import Title from "../components/ui/Title";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";

function StartGameScreen({ onPickNumber }) {
  const [enteredNumber, setEnteredNumber] = useState("") // 입력된 숫자를 저장할 상태

  function numberInputHandler(enteredText) {  // 입력된 숫자를 저장하는 함수  
    setEnteredNumber(enteredText); // 입력된 숫자로 업데이트
  }

  function resetInputHandler() { // 리셋 버튼을 눌렀을 때 실행할 함수
    setEnteredNumber(""); // 입력된 숫자 초기화
  }

  function confirmInputHandler() { // 확인 버튼을 눌렀을 때 실행할 함수
    const chosenNumber = parseInt(enteredNumber); // 입력된 숫자를 정수로 변환

    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) { // 숫자인지 확인하고  0보다 작거나 99보다 크면
      Alert.alert(
        "잘못된 숫자입니다!",
        "1과 99 사이의 숫자이어야 합니다.",
        [{ text: "Okay", style: "destructive", onPress: resetInputHandler }]
      );
      return; // 함수 종료
    }

    //console.log("Valid Number"); 
    onPickNumber(chosenNumber); // 사용자가 선택한 숫자를 App.js로 전달
  }

  return (
    <View style={styles.rootContainer}>
      <Title> Guess My Number </Title>
      <Card>
        <InstructionText> Enter a Number </InstructionText>
        <TextInput
          style={styles.numberInput}
          maxLength={2}
          keyboardType="number-pad"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={numberInputHandler} // 입력된 숫자를 저장
          value={enteredNumber} // 입력된 숫자를 표시
        />
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={resetInputHandler}> Reset </PrimaryButton>
          </View>

          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={confirmInputHandler}> Confirm </PrimaryButton>
          </View>
        </View>
      </Card>
    </View>
  );
};

export default StartGameScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    marginTop: 100,
    alignItems: 'center',
  },

  numberInput: {
    width: 50,
    height: 50,
    fontSize: 32,
    borderBottomColor: Colors.primary500,
    borderBottomWidth: 2,
    color: Colors.primary500,
    marginVertical: 8,
    fontWeight: "bold",
    textAlign: "center",
  },

  buttonsContainer: {
    flexDirection: "row",
  },

  buttonContainer: {
    flex: 1,
  },
});