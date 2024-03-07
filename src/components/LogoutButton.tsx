import useAuth from "../hooks/useAuth"
import Button from "./Button"
import Icon from "./Icon"
import { Alert } from "react-native"

type LogoutButtonProps = {
  tintColor?: string
}

const LogoutButton = ({ tintColor }: LogoutButtonProps) => {
  const { onLogout } = useAuth()

  const handleLogout = async () => {
    const response = await onLogout()

    if(response === "OK") return

    Alert.alert('Logout', response)
  }

  return (
    <Button onClick={handleLogout}>
      <Icon name="power-off" size={20} color={tintColor} />
    </Button>
  )
}

export default LogoutButton