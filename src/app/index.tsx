import { View } from "react-native"
import CoursesTable from "../components/CoursesTable"
import Button from "../components/Button"
import Icon from "react-native-vector-icons/FontAwesome5"
import { router } from "expo-router"

const Home = () => {

    const handleAdd = () => {
        router.push('/course/create')
    }

    return (
        <View className="flex flex-col">
            <CoursesTable />
            <Button
                className="mt-3"
                onClick={handleAdd}
            >
                <Icon name="plus-circle" size={30} />
            </Button>
        </View>
    )
}

export default Home