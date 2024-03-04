import { Stack } from "expo-router"
import CoursesProvider from "../contexts/coursesContext"

const Layout = () => {
    return (
        <CoursesProvider>
            <Stack
                screenOptions={{
                    headerStyle: {
                        backgroundColor: "#0d9488",
                    },
                    navigationBarColor: "#0d9488",
                    headerTintColor: "#fff",
                    statusBarStyle: "light"
                }}
            >
                <Stack.Screen
                    name="index"
                    options={{
                        title: "Contador de faltas"
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