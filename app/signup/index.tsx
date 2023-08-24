import { Header } from "src/components/Header";
import { Link, Redirect, useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import { set, useForm } from "react-hook-form";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  ActivityIndicator,
  Pressable,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import { AuthContext } from "src/infra/storeManagements";

export default function Signup() {
  const [typeSelected, setTypeSelected] = useState<string>("player");
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
    await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(async (response) => {
      const data = await response.json();
      if (!response.ok) {
        setError(
          "Houve um erro ao criar a sua conta, tente novamente mais tarde."
        );
        setLoading(false);
      } else {
        login(data);
        router.push("/");
        setLoading(false);
      }
    });
  };
  const handleChoose = (type: string) => {
    setValue("type", type);
    setTypeSelected(type);
  };
  return (
    <View className="flex-1 items-center justify-center">
      <Header />
      <View className="p-4 w-full mt-5">
        <View className="flex-row gap-3">
          <TouchableOpacity
            className="bg-black rounded mb-3 flex-1 p-3 h-13 gap-1 flex-row items-center"
            onPress={() => handleChoose("player")}
          >
            <Text
              className={
                typeSelected === "player" ? "text-secondary" : "text-zinc-400"
              }
            >
              Player
            </Text>
            {typeSelected === "player" && (
              <Ionicons name="md-checkmark-circle" size={22} color="#C1FF00" />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-black rounded mb-3 flex-1 p-3 h-13 gap-1 flex-row items-center"
            onPress={() => handleChoose("arena")}
          >
            <Text
              className={
                typeSelected === "arena" ? "text-secondary" : "text-zinc-400"
              }
            >
              Arena
            </Text>
            {typeSelected === "arena" && (
              <Ionicons name="md-checkmark-circle" size={22} color="#C1FF00" />
            )}
          </TouchableOpacity>
        </View>
        <View className="container mb-6">
          <Text className="text-zinc-700 mb-1">Nome completo</Text>
          <TextInput
            className="bg-zinc-300 rounded p-2 h-10 mb-3"
            onChangeText={(text) => setValue("name", text)}
          />
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
                <Text className="text-white font-bold text-lg">
                  Criar sua conta!
                </Text>
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
