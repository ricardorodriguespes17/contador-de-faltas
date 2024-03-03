import { View } from 'react-native';
import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const ModalCourse = () => {
    const isPresented = router.canGoBack();

    return (
        <View className="flex flex-1 justify-center items-center">
            {!isPresented && <Link href="../">Dismiss</Link>}
            <StatusBar style="dark" />
        </View>
    )
}

export default ModalCourse