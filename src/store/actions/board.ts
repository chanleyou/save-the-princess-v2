import { Tile } from '../../utils/classes/tile'

type BoardAction = {
  type: string
  tile?: Tile
}

export const tileClick = (tile: Tile): BoardAction => ({
  type: 'TILE_CLICK',
  tile,
})

export default {
  tileClick,
}
