import type ParkMiller from 'park-miller'

export default function createRandom(random: ParkMiller) {
  return {
    ...random,
    chance: (percentage: number): boolean => {
      if (percentage < 1 || percentage > 99) {
        throw new Error(
          `random: percentage needs to be between 1 and 99, got ${percentage}`,
        )
      }

      return random.integerInRange(1, 100) <= percentage
    },
  }
}
