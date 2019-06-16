export type PlayerActionType = {
  type: PlayerActions
  value: number
}

export enum PlayerActions {
  GainLife = 'PLAYER_GAIN_LIFE',
  LoseLife = 'PLAYER_LOSE_LIFE',
}

export const playerLoseLife = (value: number): PlayerActionType => {
  return {
    type: PlayerActions.GainLife,
    value,
  }
}

export const playerGainLife = (value: number): PlayerActionType => {
  return {
    type: PlayerActions.LoseLife,
    value,
  }
}

export default {
  playerLoseLife,
  playerGainLife,
}
