import { useContext } from "react"
import { CoursesContext } from "../contexts/coursesContext"

const useCourses = () => {
    return useContext(CoursesContext)
}

export default useCourses