import { View } from "react-native"
import { Redirect } from "expo-router"
import useAuth from "../../hooks/useAuth"
import CoursesTable from "../../components/CoursesTable"

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