import { getAverage } from 'tiny-toolkit'
import { roundTo } from 'round-to'

const makeGetAverageDuration = (list: number[]) => (): number => {
  const averageDuration = getAverage(list.length > 0 ? list : [0])
  const roundedAverageDuration = roundTo(averageDuration, 3)

  list.length = 0

  return roundedAverageDuration
}

export default makeGetAverageDuration
