import { Stack } from "expo-router"

const Layout = () => {
    return (
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
        </Stack>
    )
}

export default Layout