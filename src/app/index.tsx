import { StatusBar, View } from "react-native"
import Header from "../components/Header"
import CoursesTable from "../components/CoursesTable"

const Home = () => {
    return (
        <View className="flex flex-col">
            <StatusBar barStyle="light-content" backgroundColor="#0d9488" />
            <Header title="Contador de faltas" />

            <CoursesTable />
        </View>
    )
}

export default Home