import { Text, View } from "react-native"
import Button from "../Button"
import useCourses from "../../hooks/useCourses"
import EmptyAnimation from "../EmptyAnimation"
import { router } from "expo-router"
import Icon from "../Icon"
import useAuth from "../../hooks/useAuth"
import CoursesTableItem from "./CoursesTableItem"

const CoursesTable = () => {
  const { courses } = useCourses()
  const { user } = useAuth()

  const handleAdd = () => {
    router.push('/course/create')
  }

  return (
    <View className="flex flex-1 items-center">
      <Text className="text-xl my-2 dark:text-white">Olá, {user?.name} 👋</Text>

      {courses.map(course => (
        <CoursesTableItem key={course.id} course={course} />
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
        <Icon
          name="plus-circle"
          size={30}
        />
      </Button>
    </View>
  )
}

export default CoursesTable