import ParkMiller from 'park-miller'

export default class ExtendedParkMiller extends ParkMiller {
  chance(percentage: number): boolean {
    if (percentage < 1 || percentage > 99) {
      throw new Error(
        `random: percentage needs to be between 1 and 99, got ${percentage}`,
      )
    }

    return this.integerInRange(1, 100) <= percentage
  }
}
