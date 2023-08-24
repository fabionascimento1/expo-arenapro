import { Header } from "src/components/Header";
import { Link, Redirect, useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { AuthContext } from "src/infra/storeManagements";

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const { setValue, handleSubmit } = useForm();
  const { login, userToken } = useContext(AuthContext);

  if (userToken != null) {
    return <Redirect href="/" />;
  }

  const onSubmit = async (data) => {
    setLoading(true);
    await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(async (response) => {
      const data = await response.json();
      if (!response.ok) {
        setError(data.error);
        setLoading(false);
      } else {
        login(data);
        router.push("/");
        setLoading(false);
      }
    });
  };

  return (
    <View className="flex-1 items-center justify-center">
      <Header />
      <View className="p-4 w-full mt-5">
        <View className="container mb-6">
          <Text className="text-zinc-700 mb-1">E-mail</Text>
          <TextInput
            className="bg-zinc-300 rounded p-2 h-10 mb-3"
            onChangeText={(text) => setValue("email", text)}
          />
          <Text className="text-zinc-700 mt-1 mb-1">Senha</Text>
          <TextInput
            className="bg-zinc-300 rounded p-2 h-10"
            onChangeText={(text) => setValue("password", text)}
          />
          {error && (
            <Text className="text-red-600 font-semibold mt-5">{error}</Text>
          )}
          <View className="mt-8">
            <Pressable
              className="bg-primary  rounded p-3 justify-center items-center"
              onPress={handleSubmit(onSubmit)}
            >
              {loading ? (
                <ActivityIndicator size={25} color="white" />
              ) : (
                <Text className="text-white font-bold text-lg">Entrar</Text>
              )}
            </Pressable>
          </View>
        </View>
        <Text className="">
          <Link href={() => router.back()}>Voltar</Link>
        </Text>
      </View>
    </View>
  );
}
