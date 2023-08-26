import { Header } from "src/components/Header";
import { Link, Redirect, useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
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

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const SignUpSchema = z.object({
  name: z.string({
    required_error: "Nome é obrigatório",
  }),
  email: z
    .string({
      required_error: "Email é obrigatório",
    })
    .email("Email inválido"),
  password: z
    .string({
      required_error: "Senha é obrigatório",
    })
    .min(6, {
      message: "Senha deve conter no mínimo 6 caracteres",
    })
    .max(20, {
      message: "Senha deve conter no máximo 20 caracteres",
    }),
});

type SignUpSchemaType = z.infer<typeof SignUpSchema>;

export default function Signup() {
  const [typeSelected, setTypeSelected] = useState<string>("player");
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const {
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchemaType>({ resolver: zodResolver(SignUpSchema) });
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
      <View className="p-5 w-full mt-5">
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
              <Ionicons name="md-checkmark-circle" size={21} color="#C1FF00" />
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
              <Ionicons name="md-checkmark-circle" size={21} color="#C1FF00" />
            )}
          </TouchableOpacity>
        </View>
        <View className="container mb-6">
          <View className="mb-3">
            <Text className="text-zinc-500 mb-1">Nome completo</Text>
            <TextInput
              className="bg-zinc-200 rounded p-2 h-10"
              placeholder="Digite seu nome completo"
              placeholderTextColor="#B5B5B5"
              onChangeText={(text) => setValue("name", text)}
            />
            {errors.name && (
              <Text className="text-red-600">{errors.name.message}</Text>
            )}
          </View>
          <View className=" mb-3">
            <Text className="text-zinc-500 mb-1">E-mail</Text>
            <TextInput
              placeholder="Digite o seu e-mail"
              placeholderTextColor="#B5B5B5"
              autoCapitalize="none"
              keyboardType="email-address"
              className="bg-zinc-200 rounded p-2 h-10"
              onChangeText={(text) => setValue("email", text)}
            />
            {errors.email && (
              <Text className="text-red-600">{errors.email.message}</Text>
            )}
          </View>
          <View>
            <Text className="text-zinc-500 mt-1 mb-1">Senha</Text>
            <TextInput
              placeholder="Digite a sua senha"
              placeholderTextColor="#B5B5B5"
              secureTextEntry={true}
              autoCapitalize="none"
              keyboardType="default"
              className="bg-zinc-200 rounded p-2 h-10"
              onChangeText={(text) => setValue("password", text)}
            />
            {errors.password && (
              <Text className="text-red-600">{errors.password.message}</Text>
            )}
          </View>
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
          <Link href="/signin/">Voltar</Link>
        </Text>
      </View>
    </View>
  );
}
