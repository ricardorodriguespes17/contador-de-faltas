import { Formik } from "formik"
import { KeyboardAvoidingView, Text } from "react-native"
import Button from "../Button"
import InputField from "../InputField"
import useCourses from "../../hooks/useCourses"
import { router } from "expo-router"
import { CoursesProps } from "../../types/courses"

type FormValueProps = {
  name: string,
  absencesPerDay: string
  absenceLimit: string
}

type CourseFormProps = {
  course?: CoursesProps
}

const CourseForm = ({ course }: CourseFormProps) => {
  const { createCourse, updateCourse } = useCourses()

  const onSubmit = async (values: FormValueProps) => {
    if (isNaN(parseInt(values.absencesPerDay))
      || isNaN(parseInt(values.absenceLimit))) {
      return
    }

    if (course) {
      await updateCourse({
        id: course.id,
        name: values.name,
        absencesPerDay: parseInt(values.absencesPerDay),
        absenceLimit: parseInt(values.absenceLimit)
      })
    } else {
      await createCourse({
        name: values.name,
        absencesPerDay: parseInt(values.absencesPerDay),
        absenceLimit: parseInt(values.absenceLimit)
      })
    }

    router.back()
  }

  return (
    <Formik<FormValueProps>
      initialValues={{ 
        name: course?.name || '', 
        absencesPerDay: course?.absencesPerDay.toString() || '2', 
        absenceLimit: course?.absenceLimit.toString() || '15' 
      }}
      onSubmit={onSubmit}
    >
      {({ values, setFieldValue }) => (
        <KeyboardAvoidingView
          behavior="height"
          className="flex w-full h-full justify-center items-center px-20"
        >
          <InputField
            label="Nome"
            value={values.name}
            onChangeText={(value) => setFieldValue('name', value)}
          />

          <InputField
            label="Faltas por dia"
            value={values.absencesPerDay}
            onChangeText={(value) => setFieldValue('absencesPerDay', value)}
          />

          <InputField
            label="Limite de faltas"
            value={values.absenceLimit}
            onChangeText={(value) => setFieldValue('absenceLimit', value)}
          />

          <Button
            className="bg-teal-600 h-10 w-full rounded-md dark:bg-teal-900"
            onClick={() => onSubmit(values)}
          >
            <Text className="text-xl text-white">
              {course ? "Editar" : "Adicionar"}
            </Text>
          </Button>
        </KeyboardAvoidingView>
      )}
    </Formik>
  )
}

export default CourseForm