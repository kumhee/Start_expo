import { StyleSheet, View, Text, Dimensions } from "react-native";

import Colors from "../../constants/colors";

function NumberContainer({ children }) {
  return (
    <View style={styles.container}>
      <Text style={styles.numberText}> {children} </Text>
    </View>
  )
}

export default NumberContainer;

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    borderWidth: 4,
    borderColor: Colors.accent400,
    padding: deviceWidth < 380 ? 12 : 24, // 화면 너비가 380보다 작으면 12, 그렇지 않으면 24로 패딩을 설정
    margin: deviceWidth < 380 ? 12 : 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  numberText: {
    color: Colors.primary500, 
    fontSize: deviceWidth < 380 ? 28 : 36,
    // fontWeight: 'bold',
    fontFamily: 'open-sans-bold'
  },
});