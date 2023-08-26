import { Image, View } from "react-native";

export function Header() {
  return (
    <View className="pt-4">
      <Image
        className="mb-3"
        source={require("/assets/images/logo-arena-pro-dark.png")}
        style={{ height: 45, resizeMode: "contain" }}
      />
    </View>
  );
}
