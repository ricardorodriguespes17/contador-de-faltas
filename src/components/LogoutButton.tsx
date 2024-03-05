import { router } from "expo-router"
import useAuth from "../hooks/useAuth"
import Button from "./Button"
import Icon from "./Icon"

type LogoutButtonProps = {
    tintColor?: string
}

const LogoutButton = ({ tintColor }: LogoutButtonProps) => {
    const { onLogout } = useAuth()

    const handleLogout = async () => {
        await onLogout()
    }

    return (
        <Button onClick={handleLogout}>
            <Icon name="power-off" size={20} color={tintColor} />
        </Button>
    )
}

export default LogoutButton