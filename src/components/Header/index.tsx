import { Text, View, StatusBar } from "react-native"

type HeaderProps = {
    title: string
}

const Header = (props: HeaderProps) => {
    return (
        <View className="flex w-full h-14 justify-center px-3 pb-3 bg-teal-600">
            <Text className="text-xl text-white">{props.title}</Text>
        </View>
    )
}

export default Header