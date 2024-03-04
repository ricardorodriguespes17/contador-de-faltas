import React from 'react';
import LottieView from 'lottie-react-native';
import EmptyLottie from '../../../assets/empty.json'
import EmptyLottieDark from '../../../assets/empty-dark.json'
import { useColorScheme } from 'nativewind';

const EmptyAnimation = () => {
    const { colorScheme } = useColorScheme()

    return (
        <LottieView
            autoPlay
            loop
            source={colorScheme === 'dark' ? EmptyLottieDark : EmptyLottie}
            style={{ width: '100%', height: 350 }}
        />
    )
}

export default EmptyAnimation