import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";

import { Text, View } from "react-native";

export default function Contato() {
  return (
    <View className="flex-1 items-center justify-center bg-black ">
      <Text className="text-white">Dasboard</Text>
      <StatusBar style="auto" />
    </View>
  );
}
