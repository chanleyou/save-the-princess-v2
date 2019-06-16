import { PlayerActionType, PlayerActions } from '../actions/player'

type Player = {
  currentLife: number
  maxLife: number
}

const initialPlayer: Player = {
  currentLife: 12,
  maxLife: 12,
}

const player = (player = initialPlayer, action: PlayerActionType) => {
  switch (action.type) {
    case PlayerActions.GainLife:
      return {
        ...player,
        currentLife:
          player.currentLife + action.value > player.maxLife
            ? player.maxLife
            : player.currentLife + action.value,
      }
    case PlayerActions.LoseLife:
      player.currentLife - action.value <= 0 && console.log('Lost Game!')

      return {
        ...player,
        currentLife: player.currentLife - action.value,
      }
    default:
      return player
  }
}

export default player
