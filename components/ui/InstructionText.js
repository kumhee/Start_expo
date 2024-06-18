import { StyleSheet, Text } from "react-native";

function InstructionText({ children, style }) {
  return (
    <Text style={[styles.instructionText, style]}> {children} </Text>
  );
}

export default InstructionText;

const styles = StyleSheet.create({
  instructionText: {
    fontFamily: 'open-sans',
    fontSize: 18,
  },
});
