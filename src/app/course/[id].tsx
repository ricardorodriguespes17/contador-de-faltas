import { Text, View } from 'react-native';
import { Link, router, useLocalSearchParams } from 'expo-router';

const ModalCourse = () => {
    const isPresented = router.canGoBack();
    const { id } = useLocalSearchParams()

    return (
        <View className="flex flex-1 justify-center items-center">
            {!isPresented && <Link href="../">Dismiss</Link>}
            <Text>Matéria {id}</Text>
        </View>
    )
}

export default ModalCourse