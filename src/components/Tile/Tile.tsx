import React from 'react'
import { connect } from 'react-redux'
import { Unit } from '../../utils/classes/unit'
import { Tile as TileClass } from '../../utils/classes/tile'
import { BoardActions } from '../../store/actions/actions'
import './Tile.css'

const { tileClick } = BoardActions

type TileProps = {
  tile: TileClass
  tileClick: Function
}

const UnitComponent = ({ name, sprite, life, maxLife }: Unit) => (
  <div className="unit">
    <div className="life-bar">
      <div className="current-life" />
    </div>
    <div className="hover">
      <label>
        {name} ({life} / {maxLife})
      </label>
    </div>
    <img src={require('../../assets/sprites/' + sprite)} />
  </div>
)

const Tile = ({ tile, tileClick }: TileProps) => {
  const { isWall, unit } = tile
  return (
    <div
      onClick={() => {
        tileClick(tile)
      }}
      className={isWall ? 'tile wall' : 'tile'}
    >
      {unit && <UnitComponent {...unit} />}
    </div>
  )
}

export default connect(
  null,
  { tileClick }
)(Tile)
