import { Text, View } from "react-native"
import Button from "../Button"
import Icon from "../Icon"

type IncrementorProps = {
    value: number
    onIncrement: () => void
    onDecrement: () => void
}

const Incrementor = ({ value, onDecrement, onIncrement }: IncrementorProps) => {
    return (
        <View className="flex flex-row">
            <Button
                className="w-10"
                onClick={onDecrement}
            >
                <Icon name="minus" size={12} />
            </Button>

            <View className="flex justify-center items-center w-8 h-full">
                <Text className="text-2xl dark:text-white">{value}</Text>
            </View>

            <Button
                className="w-10"
                onClick={onIncrement}
            >
                <Icon name="plus" size={12} />
            </Button>
        </View>
    )
}

export default Incrementor