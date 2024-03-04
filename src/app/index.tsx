import { View } from "react-native"
import CoursesTable from "../components/CoursesTable"
import CoursesProvider from "../contexts/coursesContext"

const Home = () => {
    return (
        <CoursesProvider>
            <View className="flex flex-col">
                <CoursesTable />
            </View>
        </CoursesProvider>
    )
}

export default Home