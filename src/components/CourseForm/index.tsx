import { Formik } from "formik"
import { KeyboardAvoidingView, Text, View } from "react-native"
import Button from "../Button"
import InputField from "../InputField"
import useCourses from "../../hooks/useCourses"
import { router } from "expo-router"

type FormValueProps = {
  name: string,
  absencesPerDay: string
}

const CourseForm = () => {
  const { createCourse } = useCourses()

  const onSubmit = (values: FormValueProps) => {
    if (isNaN(parseInt(values.absencesPerDay))) {
      return
    }

    createCourse({
      name: values.name,
      absencesPerDay: parseInt(values.absencesPerDay)
    })

    router.back()
  }

  return (
    <Formik<FormValueProps>
      initialValues={{ name: '', absencesPerDay: '2' }}
      onSubmit={onSubmit}
    >
      {({ values, setFieldValue }) => (
        <KeyboardAvoidingView
          behavior="height"
          className="flex h-full justify-center items-center px-20"
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

          <Button
            className="bg-teal-600 h-10 w-full rounded-md dark:bg-teal-900"
            onClick={() => onSubmit(values)}
          >
            <Text className="text-xl text-white">Adicionar</Text>
          </Button>
        </KeyboardAvoidingView>
      )}
    </Formik>
  )
}

export default CourseForm