import { StyleSheet, View, Dimensions } from "react-native";

import Colors from "../../constants/colors";

function Card({ children }) {
  return (
    <View style={styles.card}>{children}</View>
  );
}

const diviceWidth = Dimensions.get('window').width;

export default Card;

const styles = StyleSheet.create({
  card: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: diviceWidth < 380 ? 18 : 36,
    marginHorizontal: 24,
    padding: 16,
    backgroundColor: Colors.primary800,
    borderRadius: 8,

    // 그림자 효과
    elevation: 4, //안드로이드 그림자
    shadowColor: Colors.primary500, //ios 그림자
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
}); 