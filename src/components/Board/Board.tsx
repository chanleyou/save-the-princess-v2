import React from 'react'
import { Grid } from '../../utils/classes/tile'
import TileComponent from '../Tile/Tile'
import './Board.css'

interface BoardProps {
  grid: Grid
}

const Board = ({ grid }: BoardProps) => (
  <div className="grid">
    {grid.grid.map((row, x) => (
      <div className="column" key={x}>
        {row.map((tile, y) => (
          <TileComponent tile={tile} key={`${x},${y}`} />
        ))}
      </div>
    ))}
  </div>
)

export default Board
