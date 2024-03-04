import { Text, View } from "react-native"
import Button from "../Button"
import Icon from "react-native-vector-icons/FontAwesome5"
import { Link } from "expo-router"
import useCourses from "../../hooks/useCourses"
import Incrementor from "../Incrementor"
import EmptyAnimation from "../EmptyAnimation"
import { router } from "expo-router"

const CoursesTable = () => {
    const { courses, removeCourse, incrementAbsences, decrementAbsences } = useCourses()

    const handleAdd = () => {
        router.push('/course/create')
    }

    return (
        <View className="flex flex-1 items-center">
            {courses.map(course => (
                <View
                    key={course.id}
                    className="flex flex-row w-full h-12 px-3"
                >
                    <Button className="flex-1 items-start">
                        <Link className="text-xl" href={`/course/${course.id}`}>{course.name}</Link>
                    </Button>

                    <Button
                        className="w-8"
                        onClick={() => removeCourse(course.id)}
                    >
                        <Icon name="trash" size={20} color="#FF5A5F" />
                    </Button>

                    <Incrementor
                        value={course.absences}
                        onDecrement={() => decrementAbsences(course.id)}
                        onIncrement={() => incrementAbsences(course.id)}
                    />
                </View>
            ))}

            {courses.length === 0 && (
                <View className="flex w-full items-center mt-3">
                    <EmptyAnimation />
                    <Text className="text-xl">Nenhuma matéria encontrada, adicione</Text>
                </View>
            )}

            <Button
                className="mt-3"
                onClick={handleAdd}
            >
                <Icon name="plus-circle" size={30} />
            </Button>
        </View>
    )
}

export default CoursesTable