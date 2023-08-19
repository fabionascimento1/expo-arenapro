import { Link, useRouter, LinkProps } from "expo-router";
import React from "react";

import { Text, View } from "react-native";

export default function Contato() {
  const router = useRouter();
  return (
    <View className="flex-1 items-center justify-center bg-black ">
      <Text className="text-white">Login</Text>
      <Text className="text-white">
        <Link href={() => router.back()}>Voltar</Link>
      </Text>
    </View>
  );
}
