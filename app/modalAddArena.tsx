import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, View, Text } from "react-native";

export default function modalAddArena() {
  return (
    <View style={styles.container}>
      <Link href="/(arena)/arenas">Voltar</Link>
      <Text style={styles.title}>Modal</Text>
      <View style={styles.separator} />
      <Text>dsds</Text>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
