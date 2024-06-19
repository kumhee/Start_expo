
import { Text, StyleSheet, Platform } from "react-native";

function Title({ children }) {
  return (
    <Text style={styles.title}> {children} </Text>
  );
}

export default Title;

const styles = StyleSheet.create({
  title: {
    fontFamily: 'open-sans-bold',
    // fontSize: Platform.select({ios: 28, android: 24}),
    fontSize: 24,
    //fontWeight: 'bold',
    //color: 'white',
    textAlign: 'center',
    // borderWidth: Platform.OS === 'android' ? 2 : 0,
    // borderWidth: Platform.select({ios: 0, android: 2}),
    borderWidth: 2,
    padding: 12,
    borderRadius: 8,
    maxWidth: '85%',
    width: 300
  },
});