import { Text, View } from 'react-native';
import { Link, router, useLocalSearchParams, useNavigation } from 'expo-router';
import useCourses from '../../hooks/useCourses';
import { useEffect, useState } from 'react';
import { CoursesProps } from '../../types/courses';

const ModalCourse = () => {
    const isPresented = router.canGoBack();
    const { id } = useLocalSearchParams()
    const { courses } = useCourses()
    const [course, setCourse] = useState<CoursesProps>()
    const { goBack } = useNavigation()

    useEffect(() => {
        const courseId = parseInt(id as string)

        if (!isNaN(courseId)) {
            setCourse(courses.find(item => item.id === courseId))
        } else {
            goBack()
        }
    }, [id, courses])

    return (
        <View className="flex flex-1 justify-center items-center">
            {!isPresented && <Link href="../">Dismiss</Link>}
            <Text>{course?.name}</Text>
        </View>
    )
}

export default ModalCourse