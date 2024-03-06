import { View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import useCourses from '../../hooks/useCourses';
import { useEffect, useState } from 'react';
import { CoursesProps } from '../../types/courses';
import CourseForm from '../../components/CourseForm';

const ModalCourse = () => {
    const { id } = useLocalSearchParams()
    const { courses } = useCourses()
    const [course, setCourse] = useState<CoursesProps>()

    useEffect(() => {
        const courseId = id as string

        if (courseId) {
            setCourse(courses.find(item => item.id === courseId))
        } else {
            router.back()
        }
    }, [id, courses])

    return (
        <View className="flex w-full flex-1 justify-center items-center">
            {course && <CourseForm course={course} />}
        </View>
    )
}

export default ModalCourse