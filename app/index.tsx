import React from "react";
import { Link, Redirect } from "expo-router";
import { ActivityIndicator, Text, View } from "react-native";
import { AuthContext } from "src/infra/storeManagements";

export default function App() {
  const { isLoading, userToken } = React.useContext(AuthContext);
  if (isLoading) {
    return (
      <View>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }
  if (userToken !== null) {
    return <Redirect href="/dashboard" />;
  }
  return (
    <View className="flex-1 items-center justify-center bg-black ">
      <Text className="text-white">
        Open up App.js to start working on your app!5
      </Text>
      <Text className="text-white">
        <Link href="/login/">Login</Link>
      </Text>
    </View>
  );
}
