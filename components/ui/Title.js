
import { Text, StyleSheet } from "react-native";

function Title({children}) {
  return (
    <Text style={styles.title}> {children} </Text>
  );
}

export default Title;

const styles = {
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 24,
    //fontWeight: 'bold',
    //color: 'white',
    textAlign: 'center',
    borderWidth: 2,
    padding: 12,
    borderRadius: 8,
  },
};