import { Unit } from './unit'

export class Tile {
  isWall: boolean
  unit: Unit | null

  constructor(
    readonly x: number,
    readonly y: number,
    readonly grid: Grid,
    isWall: boolean = false,
    unit = null
  ) {
    this.unit = unit
    this.isWall = isWall
  }

  get isPassable() {
    return !this.isWall && this.unit === null
  }
}

export class Grid {
  readonly width: number
  readonly height: number
  readonly grid: Tile[][]

  constructor(width: number, height: number = width) {
    this.width = width
    this.height = height
    this.grid = []
    for (let y = 0; y < height; y++) {
      const row: Tile[] = []
      for (let x = 0; x < width; x++) {
        const grid = this
        row.push(new Tile(x, y, grid))
      }
      this.grid.push(row)
    }
  }

  private validate(a: Tile, b: Tile = a) {
    if (a.grid !== this || b.grid !== this) {
      throw new Error('Tile(s) must belong to the grid.')
    }
  }

  get(x: number, y: number) {
    if (x >= 0 && x < this.width && y >= 0 && y < this.width) {
      return this.grid[x][y]
    } else {
      return null
    }
  }

  /** ignores obstacles */
  getDistance(a: Tile, b: Tile) {
    this.validate(a, b)
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y)
  }

  dijkstra(origin: Tile) {
    this.validate(origin)

    const output: Tile[][] = [[origin]]
    const checked = [origin]
    let done = false
    let distance = 0

    while (done === false) {
      let length = output.length

      output[distance].forEach(tile => {
        let { x, y } = tile
        let newCoords: [number, number][] = [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]]

        newCoords.forEach(xy => {
          const tile = this.get(...xy)
          if (tile instanceof Tile) {
            if (!checked.includes(tile)) {
              checked.push(tile)
              const { isPassable } = tile
              if (isPassable) {
                const newDistance = distance + 1
                output[newDistance]
                  ? output[newDistance].push(tile)
                  : (output[newDistance] = [tile])
              }
            }
          }
        })
      })

      if (length === output.length) {
        done = true
      }

      distance++
    }

    const objOutput: any = {}

    output.forEach((row, index) => {
      objOutput[index] = [...row]
    })

    return objOutput
  }
}
