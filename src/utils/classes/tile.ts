import { Unit } from './unit'

export class Tile {
  isWall: boolean
  unit: Unit | null

  constructor(readonly x: number, readonly y: number, isWall: boolean = false, unit = null) {
    this.unit = unit
    this.isWall = isWall
  }

  get isPassable() {
    return !this.isWall && this.unit === null
  }
}

type Coordinates = [number, number]
type Path = Coordinates[]

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
        row.push(new Tile(x, y))
      }
      this.grid.push(row)
    }
  }

  validate(...tiles: Tile[]) {
    ;[...tiles].forEach(tile => {
      const { x, y } = tile
      if (this.get(x, y) !== tile) throw new Error('Tile does not belong in grid.')
    })
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
    const { x, y } = origin
    const output: Path[][] = [[[[x, y]]]]
    const checked = new Set([origin])
    let done = false
    let distance = 0

    while (done === false) {
      let length = output.length

      output[distance].forEach(path => {
        const [x, y] = path[path.length - 1]
        let newCoords: Coordinates[] = [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]]

        newCoords.forEach(coords => {
          const tile = this.get(...coords)
          if (tile !== null && !checked.has(tile)) {
            checked.add(tile)
            const { isPassable, x, y } = tile
            if (isPassable) {
              const newDistance = distance + 1

              const newPath: Path = [...path, [x, y]]
              output[newDistance]
                ? output[newDistance].push(newPath)
                : (output[newDistance] = [newPath])
            }
          }
        })
      })

      if (length === output.length) {
        done = true
      }

      distance++
    }

    return output
  }
}
