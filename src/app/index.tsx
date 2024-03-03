import { View } from "react-native"
import CoursesTable from "../components/CoursesTable"

const Home = () => {
    return (
        <View className="flex flex-col">
            <CoursesTable />
        </View>
    )
}

export default Home