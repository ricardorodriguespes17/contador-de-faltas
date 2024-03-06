import { useContext } from "react"
import { UserContext } from "../contexts/userContext"

const useAuth = () => {
  return useContext(UserContext)
}

export default useAuth