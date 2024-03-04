import { View } from "react-native"
import CoursesTable from "../components/CoursesTable"

const Home = () => {
    return (
        <View className="flex h-screen w-screen flex-col">
            <CoursesTable />
        </View>
    )
}

export default Home