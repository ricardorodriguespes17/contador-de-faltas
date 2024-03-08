import { View } from "react-native"

type ProgressBarProps = {
  value: number
  maxValue: number
}

const ProgressBar = ({ value, maxValue }: ProgressBarProps) => {
  const percent = (value / maxValue) * 100
  let color = 'red'

  if (percent < 40) {
    color = 'green'
  } else if (percent < 60) {
    color = 'yellow'
  } else if (percent < 85) {
    color = 'orange'
  } else if (percent >= 100) {
    color = 'black'
  }


  return (
    <View className="w-52 h-2 max-h-full bg-slate-400/40 rounded-md border-[1px] border-slate-400/40">
      <View
        style={{
          width: `${percent > 100 ? 100 : percent}%`,
          backgroundColor: color
        }}
        className="h-full rounded-md"
      />
    </View>
  )
}

export default ProgressBar