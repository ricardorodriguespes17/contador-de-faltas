import { Formik } from "formik"
import { Text } from "react-native"
import Button from "../Button"
import InputField from "../InputField"
import useCourses from "../../hooks/useCourses"
import { router } from "expo-router"
import { CoursesProps } from "../../types/courses"
import FormBase from "../FormBase"

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

  const validate = (values: FormValueProps) => {
    const errors = {} as any

    if (!values.name.trim()) {
      errors.name = 'O nome é obrigatório'
    }

    if (!values.absencesPerDay.trim()) {
      errors.absencesPerDay = 'O número de faltas é obrigatório'
    } else if(values.absencesPerDay.match(/[^0-9]/g)) {
      errors.absencesPerDay = 'Faltas por dias deve ser um número'
    }

    if (!values.absenceLimit.trim()) {
      errors.absenceLimit = 'O limite de faltas é obrigatório'
    } else if(values.absenceLimit.match(/[^0-9]/g)) {
      errors.absenceLimit = 'O limite de faltas deve ser um número'
    }

    return errors
  }

  return (
    <Formik<FormValueProps>
      initialValues={{
        name: course?.name || '',
        absencesPerDay: course?.absencesPerDay.toString() || '2',
        absenceLimit: course?.absenceLimit.toString() || '15'
      }}
      onSubmit={onSubmit}
      validate={validate}
      validateOnChange={false}
    >
      {({ values, setFieldValue, handleSubmit, errors }) => (
        <FormBase
          textButton="Adicionar"
          handleSubmit={handleSubmit}
        >
          <InputField
            label="Nome"
            value={values.name}
            error={errors.name}
            onChangeText={(value) => setFieldValue('name', value)}
          />

          <InputField
            label="Faltas por dia"
            value={values.absencesPerDay}
            error={errors.absencesPerDay}
            onChangeText={(value) => setFieldValue('absencesPerDay', value)}
          />

          <InputField
            label="Limite de faltas"
            value={values.absenceLimit}
            error={errors.absenceLimit}
            onChangeText={(value) => setFieldValue('absenceLimit', value)}
          />
        </FormBase>
      )}
    </Formik>
  )
}

export default CourseForm