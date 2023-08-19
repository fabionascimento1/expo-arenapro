import { StatusBar } from "expo-status-bar";
import React from "react";
import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-black ">
      <Text className="text-white">
        Open up App.js to start working on your app!{" "}
        <Link href="/contato">About</Link>
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}
