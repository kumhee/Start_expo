import { useState, useEffect } from 'react';
import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';
import Colors from './constants/colors';

export default function App() {
  // 숫자가 확인되었는지 추적하기 위해 userNumber 상태를 추가
  const [userNumber, setUserNumber] = useState(); // 사용자가 선택한 숫자를 저장할 상태
  const [gameIsOver, setGameIsOver] = useState(true); // 게임 종료 여부
  const [guessRounds, setGuessRounds] = useState(0); //추측 라운드 수

  // 폰트 로드 상태 설정
  const [fontLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });

  // 폰트가 로드되면 스플래시 화면 숨기기
  useEffect(() => {
    if (fontLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontLoaded]);

  // 폰트가 로드되지 않으면 아무것도 렌더링하지 않음
  if (!fontLoaded) {
    return null;
  }

  // 사용자가 숫자를 선택했을 때 호출되는 함수
  function pickedNumberHandler(pickedNumber) {  
    setUserNumber(pickedNumber); // 사용자가 선택한 숫자로 업데이트
    setGameIsOver(false); // 게임 상태를 시작으로 변경
  }

  function GameOverHandler(numberOfRounds) {
    setGameIsOver(true);
    setGuessRounds(numberOfRounds)
  }

  function startNewGameHandler() {
    setUserNumber(null); // 사용자가 선택한 숫자 초기화
    setGuessRounds(0); //추측 라운드 수 초기화
  }

  // 초기화면설정
  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />

  // 사용자가 숫자를 선택했을 때 GameScreen으로 전환
  if (userNumber) {
    screen = <GameScreen userNumber={userNumber} onGameOver={GameOverHandler} />
  }
  
  // 게임이 종료되었을 때 GameOverScreen으로 전환
  if (gameIsOver && userNumber) {
    screen = <GameOverScreen 
      userNumber={userNumber}
      roundsNumber={guessRounds}
      onStartNewGame={startNewGameHandler} />
  }

  // guessRounds가 특정시점에 변경되도록

  return (
    <LinearGradient colors={[Colors.primary600, Colors.accent400]} // 그라데이션 색상 배열
      style={styles.rootScreen}>
      <ImageBackground
        source={require('./assets/images/background.png')}
        resizeMode='cover'
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
        <SafeAreaView style={styles.rootScreen}>
          {screen}
        </SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1, // 화면 전체를 차지하도록 설정
  },

  backgroundImage: {
    opacity: 0.3, // 배경 이미지 투명도 조절
  },
});
