import { Text, View } from "react-native"
import { Courses } from "../../types/courses"
import Button from "../Button"
import { useState } from "react"
import Icon from "react-native-vector-icons/FontAwesome5"
import { Link } from "expo-router"

const CoursesTable = () => {
    const [courses, setCourses] = useState<Courses[]>([
        { id: 0, name: 'Sociologia', absences: 0, absencesPerDay: 2 },
        { id: 1, name: 'Redes de Computadores I', absences: 0, absencesPerDay: 2 },
        { id: 2, name: 'Paradigmas de LP', absences: 0, absencesPerDay: 3 },
        { id: 3, name: 'Sistemas Inteligentes', absences: 0, absencesPerDay: 2 },
    ])

    return (
        <View>
            {courses.map(course => (
                <View
                    key={course.id}
                    className="flex flex-row w-full h-12 px-3"
                >
                    <Button className="flex-1 items-start" textClassName="text-xl">
                        <Link href="/modal">{course.name}</Link>
                    </Button>
                    
                    <Button
                        className="w-8"
                        onClick={() => setCourses(courses.filter(item => item.id !== course.id))}
                    >
                        <Icon name="trash" size={24} color="#f55252" />
                    </Button>

                    <View className="flex flex-row">
                        <Button
                            className="w-10"
                            textClassName="text-xl"
                            children="-"
                            onClick={() =>
                                setCourses(courses.map(item => {
                                    if (item.id === course.id && item.absences - item.absencesPerDay >= 0) {
                                        return { ...item, absences: item.absences - item.absencesPerDay }
                                    }
                                    return item
                                }))
                            }
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
                            onClick={() =>
                                setCourses(courses.map(item => {
                                    if (item.id === course.id) {
                                        return { ...item, absences: item.absences + item.absencesPerDay }
                                    }
                                    return item
                                }))
                            }
                        />
                    </View>
                </View>
            ))}
        </View>
    )
}

export default CoursesTable