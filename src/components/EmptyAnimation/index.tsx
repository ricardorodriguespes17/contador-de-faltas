import React from 'react';
import LottieView from 'lottie-react-native';
import EmptyLottie from '../../../assets/empty.json'

const EmptyAnimation = () => {
    return (
        <LottieView source={EmptyLottie} style={{ width: '100%', height: 350 }} autoPlay loop />
    )
}

export default EmptyAnimation