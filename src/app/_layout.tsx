import { Stack } from "expo-router"
import CoursesProvider from "../contexts/coursesContext"
import { darkMode, lightMode } from "../config/appConfig"
import { useColorScheme } from "nativewind";
import Header from "../components/Header";

const Layout = () => {
    const { colorScheme } = useColorScheme();
    const theme = colorScheme === 'dark' ? darkMode : lightMode

    return (
        <CoursesProvider>
            <Stack
                screenOptions={{
                    headerStyle: {
                        backgroundColor: theme.primaryColor,
                    },
                    header: (props => <Header title={props.options.title || ""} />),
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
                        title: "Contador de faltas",
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
    )
}

export default Layout