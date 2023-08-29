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

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const SignUpSchema = z.object({
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

export default function Signin() {
  const { login, userToken } = useContext(AuthContext);
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const {
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchemaType>({ resolver: zodResolver(SignUpSchema) });

  if (userToken != null) {
    return <Redirect href="/" />;
  }

  const onSubmit = async (data: SignUpSchemaType) => {
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
      <View className="p-5 w-full mt-5">
        <View className="container mb-6">
          <View className="mb-3">
            <Text className="text-zinc-500 mb-1">E-mail</Text>
            <TextInput
              id="input-email"
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
          <Text className="text-zinc-500 mt-1 mb-1">Senha</Text>
          <TextInput
            id="input-password"
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
          {error && (
            <Text className="text-red-600 font-semibold mt-5">{error}</Text>
          )}
          <View className="mt-8">
            <Pressable
              id="button-entrar"
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
        <View className="gap-5">
          <Link href="/signup/">Criar a sua conta!</Link>
          <Link href={() => router.back()}>Voltar</Link>
        </View>
      </View>
    </View>
  );
}
