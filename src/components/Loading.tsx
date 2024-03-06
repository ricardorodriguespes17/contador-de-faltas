import { View } from "react-native"
import { useColorScheme } from 'nativewind';
import LottieView from "lottie-react-native"
import LoadingLightLottie from '../../assets/animations/loading-light.json'
import LoadingDarkLottie from '../../assets/animations/loading-dark.json'

const Loading = () => {
  const { colorScheme } = useColorScheme()

  return (
    <View className="w-full h-full flex justify-center items-center">
      <LottieView
        autoPlay
        loop
        source={colorScheme === 'dark' ? LoadingDarkLottie : LoadingLightLottie}
        style={{ height: 300, width: 300 }}
      />
    </View>
  )
}

export default Loading