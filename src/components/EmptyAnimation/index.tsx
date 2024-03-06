import React from 'react';
import LottieView from 'lottie-react-native';
import EmptyLightLottie from '../../../assets/animations/empty-light.json'
import EmptyLottieDark from '../../../assets/animations/empty-dark.json'
import { useColorScheme } from 'nativewind';

const EmptyAnimation = () => {
  const { colorScheme } = useColorScheme()

  return (
    <LottieView
      autoPlay
      loop
      source={colorScheme === 'dark' ? EmptyLottieDark : EmptyLightLottie}
      style={{ width: '100%', height: 450 }}
    />
  )
}

export default EmptyAnimation