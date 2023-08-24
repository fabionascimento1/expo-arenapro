import { Slot, Tabs } from "expo-router";
import { useContext } from "react";

import AuthProvider, {
  AuthContext,
} from "src/infra/storeManagements/AuthContext";

export default function () {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Arena",
        }}
      />
    </Tabs>
  );
}
