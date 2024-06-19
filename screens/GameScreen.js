import { StyleSheet, View, Alert, FlatList, useWindowDimensions } from "react-native";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons"

import Title from "../components/ui/Title";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import GuessLogItem from "../components/game/GuessLogItem";

/**
 * 주어진 범위 내에서 무작위 숫자를 생성하는 함수
 * @param {number} min - 최소 범위
 * @param {number} max - 최대 범위
 * @param {number} exclude - 제외할 숫자
 */
function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min; // min과 max 사이의 난수 생성

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude); // 생성된 난수가 제외할 숫자(exclude)와 같다면 재귀 호출로 다시 난수 생성
  } else {
    return rndNum; // 난수 반환
  }
}

let minBoundary = 1; // 최소 범위
let maxBoundary = 100; // 최대 범위

function GameScreen({ userNumber, onGameOver }) {
  const initialGuess = generateRandomBetween(1, 100, userNumber); // 초기 추측 숫자를 생성
  const [currentGuess, setCurrentGuess] = useState(initialGuess); // 현재 추측 숫자를 
  const [guessRounds, setGuessRounds] = useState([initialGuess]);
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver(guessRounds.length); // 현재 추측 숫자가 사용자가 선택한 숫자와 같으면 게임 종료
    }
  }, [currentGuess, userNumber, onGameOver]);

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

  /**
   * 다음 추측 숫자를 생성하는 함수
   * @param {string} direction - 다음 추측 숫자가 더 높은지 낮은지 여부('lower' | 'greater') 
   *
   * */
  function nextGuessHandler(direction) {
    if (
      (direction === 'lower' && currentGuess < userNumber) ||
      (direction === 'greater' && currentGuess > userNumber)
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong...", [
        { text: "Sorry!", style: "cancel" }
      ]);
      return; // 방향이 잘못되었을 때 경고를 표시하고 함수 종료
    }

    if (direction === 'lower') {
      maxBoundary = currentGuess; // 다음 추측 숫자가 더 낮아야 하면 최대 범위를 현재 추측 숫자로 설정
    } else {
      minBoundary = currentGuess + 1; // 다음 추측 숫자가 더 높아야 하면 최소 범위를 현재 추측 숫자 + 1로 설정
    }
    //console.log(minBoundary, maxBoundary)
    const newRndNumber = generateRandomBetween(minBoundary, maxBoundary, currentGuess);
    setCurrentGuess(newRndNumber); // 새로운 추측 숫자로 업데이트
    setGuessRounds(prevGuessRounds => [newRndNumber, ...prevGuessRounds]); // 새로운 추측 숫자를 배열 앞에 추가하여 추측 라운드 업데이트
  }

  // 새 라운드가 추가될 때마다 guessRoundsListLength를 다시 계산
  const guessRoundsListLength = guessRounds.length;

  let content = (
    <>
      <NumberContainer> {currentGuess} </NumberContainer>
      <Card>
        <InstructionText style={styles.instructionText}>Higher or lower?</InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
              <Ionicons name="remove" size={24} color="white" />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
              <Ionicons name="add" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </Card>
    </>
  );

  if (width > 500) {
    content = (
      <>
        <View style={styles.buttonContainerWide}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
              <Ionicons name="remove" size={24} color="white" />
            </PrimaryButton>
          </View>

          <NumberContainer> {currentGuess} </NumberContainer>

          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
              <Ionicons name="add" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </>
    )
  }

  return (
    <View style={styles.screen}>
      <Title> Opponent's Guess </Title>
      {content}
      <View style={styles.listContainer}>
        {/* {guessRounds.map(guessRounds => <Text key={guessRounds}>{guessRounds}</Text>)} */}

        {/* FlatList : 성능 최적화된 목록을 렌더링하기 위한 컴포넌트 */}
        <FlatList
          data={guessRounds}
          renderItem={(itemData) => (
            <GuessLogItem roundNumber={guessRoundsListLength - itemData.index}
              guess={itemData.item}
            />
          )}
          keyExtractor={(item) => item} />
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
  },

  instructionText: {
    marginBottom: 12,
  },

  buttonsContainer: {
    flexDirection: "row",
  },

  buttonContainer: {
    flex: 1,
  },

  buttonContainerWide: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  listContainer: {
    flex: 1,
    padding: 16
  }
});

export default GameScreen;