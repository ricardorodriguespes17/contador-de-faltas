import { Stack } from "expo-router"
import CoursesProvider from "../contexts/coursesContext"
import { darkMode, lightMode } from "../config/appConfig"
import { NativeWindStyleSheet, useColorScheme } from "nativewind";
import UserProvider from "../contexts/userContext";
import LogoutButton from "../components/LogoutButton";

NativeWindStyleSheet.setOutput({
  default: "native",
});

const Layout = () => {
  const { colorScheme, setColorScheme } = useColorScheme();
  setColorScheme('light')
  const theme = colorScheme === 'dark' ? darkMode : lightMode

  return (
    <UserProvider>
      <CoursesProvider>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: theme.primaryColor,
            },
            navigationBarColor: theme.primaryColor,
            headerTintColor: theme.textPrimaryColor,
            statusBarStyle: theme.statusBarTheme,
            statusBarColor: theme.primaryColor,
            contentStyle: {
              backgroundColor: theme.appBackground,
            },
          }}
        >
          <Stack.Screen
            name="index"
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="auth/login"
            options={{
              title: "Login",
            }}
          />
          <Stack.Screen
            name="home/index"
            options={{
              title: "Contador de faltas",
              headerRight: (props) => <LogoutButton tintColor={props.tintColor} />
            }}
          />
          <Stack.Screen
            name="auth/register"
            options={{
              title: "Criação de conta",
            }}
          />
          <Stack.Screen
            name="course/[id]"
            options={{
              title: "Editar máteria",
              presentation: "modal",
            }}
          />
          <Stack.Screen
            name="course/create"
            options={{
              title: "Adicionar máteria",
              presentation: "modal",
            }}
          />
        </Stack>
      </CoursesProvider>
    </UserProvider>
  )
}

export default Layout