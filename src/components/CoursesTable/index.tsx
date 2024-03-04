import { Text, View } from "react-native"
import Button from "../Button"
import { Link } from "expo-router"
import useCourses from "../../hooks/useCourses"
import Incrementor from "../Incrementor"
import EmptyAnimation from "../EmptyAnimation"
import { router } from "expo-router"
import { lightMode } from "../../config/appConfig"
import Icon from "../Icon"

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
                        <Link className="text-xl dark:text-white" href={`/course/${course.id}`}>{course.name}</Link>
                    </Button>

                    <Button
                        className="w-8 mr-3"
                        onClick={() => removeCourse(course.id)}
                    >
                        <Icon name="trash" size={20} color={lightMode.accentColor} />
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
                    <Text className="text-xl dark:text-white">Nenhuma matéria encontrada, adicione</Text>
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