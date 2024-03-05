import { View } from "react-native"
import CoursesTable from "../components/CoursesTable"
import useAuth from "../hooks/useAuth"
import { Redirect } from "expo-router"

const Home = () => {
    const { user } = useAuth()

    if(!user) {
        return <Redirect href="/auth/login" />
    }

    return (
        <View className="flex h-screen w-screen flex-col">
            <CoursesTable />
        </View>
    )
}

export default Home