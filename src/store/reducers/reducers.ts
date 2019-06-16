import { combineReducers } from 'redux'
import { Tile } from '../../utils/classes/tile'
import player from './player'

interface Action {
  type: string
  tile: Tile
}

type GameState = {
  tileClickHandler: Function
}

const initialGameState = {
  tileClickHandler: (value: any) => console.log(value),
}

const game = (state: GameState = initialGameState, action: Action) => {
  switch (action.type) {
    case 'TILE_CLICK':
      state.tileClickHandler(action.tile)
    default:
      return state
  }
}

export default combineReducers({
  player,
  game,
})
