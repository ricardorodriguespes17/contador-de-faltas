import { Text, View } from "react-native"
import Button from "../Button"
import { Link } from "expo-router"
import Icon from "../Icon"
import { lightMode } from "../../config/appConfig"
import Incrementor from "../Incrementor"
import { CoursesProps } from "../../types/courses"
import useCourses from "../../hooks/useCourses"
import { useState } from "react"
import CircleProgress from "../ProgressBar"

type CoursesTableItemProps = {
  course: CoursesProps
}

const CoursesTableItem = ({ course }: CoursesTableItemProps) => {
  const { removeCourse, incrementAbsences, decrementAbsences } = useCourses()
  const [isOpenDetails, setIsOpenDetails] = useState(false)

  return (
    <View
      className="flex flex-col w-full px-4"
    >
      <View className="flex flex-row w-full h-16">
        <Button className="px-2 pt-1 h-full" onClick={() => setIsOpenDetails(!isOpenDetails)}>
          <Icon
            name={isOpenDetails ? "chevron-up" : "chevron-down"}
            size={24}
            color={lightMode.textAppColor}
          />
        </Button>

        <Button className="flex flex-1 items-start">
          <Link className="text-2xl dark:text-white" href={`/course/${course.id}`}>
            {course.name}
          </Link>
        </Button>

        <Button
          className="w-8 mr-3"
          onClick={() => removeCourse(course.id)}
        >
          <Icon name="trash" size={20} color={lightMode.accentColor} />
        </Button>

        <Incrementor
          value={course.absences}
          limit={course.absenceLimit}
          onDecrement={() => decrementAbsences(course.id)}
          onIncrement={() => incrementAbsences(course.id)}
        />
      </View>

      <View
        style={{ height: isOpenDetails ? 50 : 0 }}
        className="flex flex-row items-center w-full bg-gray-800/10 px-3 border-t-2 border-gray-800/30"
      >
        <View className="flex-1 flex justify-center">
          <Text className="text-base dark:text-white">Limite: {course.absenceLimit} faltas</Text>
        </View>

        {course.absences / course.absenceLimit >= 1 && isOpenDetails && (
          <View className="bg-black/90 rounded-md p-1 mr-1">
            <Text>☠️</Text>
          </View>
        )}

        <CircleProgress value={course.absences} maxValue={course.absenceLimit} />
      </View>
    </View>
  )
}

export default CoursesTableItem