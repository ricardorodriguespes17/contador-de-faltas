import { Text, View } from "react-native"
import Button from "../Button"
import Icon from "react-native-vector-icons/FontAwesome5"
import { Link } from "expo-router"
import useCourses from "../../hooks/useCourses"

const CoursesTable = () => {
    const { courses, removeCourse, incrementAbsences, decrementAbsences } = useCourses()

    return (
        <View>
            {courses.map(course => (
                <View
                    key={course.id}
                    className="flex flex-row w-full h-12 px-3"
                >
                    <Button className="flex-1 items-start" textClassName="text-xl">
                        <Link href={`/course/${course.id}`}>{course.name}</Link>
                    </Button>
                    
                    <Button
                        className="w-8"
                        onClick={() => removeCourse(course.id)}
                    >
                        <Icon name="trash" size={24} color="#f55252" />
                    </Button>

                    <View className="flex flex-row">
                        <Button
                            className="w-10"
                            textClassName="text-xl"
                            children="-"
                            onClick={() => decrementAbsences(course.id)}
                        />
                        <View className="flex justify-center items-center w-6 h-full">
                            <Text>
                                {course.absences}
                            </Text>
                        </View>
                        <Button
                            className="w-10"
                            children="+"
                            textClassName="text-xl"
                            onClick={() => incrementAbsences(course.id)}
                        />
                    </View>
                </View>
            ))}
        </View>
    )
}

export default CoursesTable