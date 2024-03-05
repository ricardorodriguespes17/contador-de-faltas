import AsyncStorage from '@react-native-async-storage/async-storage'
import { CoursesProps } from '../../types/courses'

export const setLocalCourses = async (data: CoursesProps[]) => {
    try {
        await AsyncStorage.setItem('courses', JSON.stringify(data))
    } catch (error) {
        console.log('Erro ao salvar os dados localmente:', error)
    }
}

export const getLocalCourses = async (): Promise<CoursesProps[]> => {
    try {
        const data = await AsyncStorage.getItem('courses');
        if (data !== null) {
            return JSON.parse(data)
        }
        return []
    } catch (error) {
        return []
    }
}