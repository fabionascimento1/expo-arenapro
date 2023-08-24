import React from "react";
import { Link, Redirect } from "expo-router";
import { ActivityIndicator, Text, View } from "react-native";
import { AuthContext } from "src/infra/storeManagements";

export default function App() {
  const { userToken } = React.useContext(AuthContext);
  if (userToken) {
    const { user } = JSON.parse(userToken);
    const { type } = user;

    if (userToken != null && type === "player") {
      return <Redirect href="/player-dashboard/" />;
    }
    if (userToken != null && type === "arena") {
      return <Redirect href="/arena-dashboard/" />;
    }
  }
  return (
    <View className="flex-1 items-center justify-center bg-primary ">
      <Text className="text-white">
        Open up App.js to start working on your app!5
      </Text>
      <Text className="text-white">
        <Link href="/signin/">Entrar no sistema</Link>
      </Text>
    </View>
  );
}
