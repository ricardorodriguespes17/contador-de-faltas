import { Text, View } from "react-native"
import Button from "../Button"
import Icon from "react-native-vector-icons/FontAwesome5"
import { Link } from "expo-router"
import useCourses from "../../hooks/useCourses"
import Incrementor from "../Incrementor"

const CoursesTable = () => {
    const { courses, removeCourse, incrementAbsences, decrementAbsences } = useCourses()

    return (
        <View>
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
                        <Icon name="trash" size={20} color="#f55252" />
                    </Button>

                    <Incrementor
                        value={course.absences}
                        onDecrement={() => decrementAbsences(course.id)}
                        onIncrement={() => incrementAbsences(course.id)}
                    />
                </View>
            ))}
        </View>
    )
}

export default CoursesTable