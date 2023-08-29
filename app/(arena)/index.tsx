import { Redirect } from "expo-router";
import { useContext } from "react";
import { Button, Text, View } from "react-native";
import { AuthContext } from "src/infra/storeManagements";

export default function Index() {
  const { logout, userToken } = useContext(AuthContext);
  if (userToken === null) {
    return <Redirect href="/" />;
  }
  return (
    <View className="flex-1 items-center justify-center bg-black">
      <Text className="text-slate-50">Index Arena1</Text>
      <Button onPress={() => logout()} title="Logout" />
    </View>
  );
}
