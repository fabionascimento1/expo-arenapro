import { Slot } from "expo-router";

import "./global.css";
import AuthProvider from "src/infra/storeManagements/AuthContext";

export default function () {
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
}
