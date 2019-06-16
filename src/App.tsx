import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './store/reducers/reducers'
import Board from './components/Board/Board'
import { Grid } from './utils/classes/tile'

export const store = createStore(rootReducer)

const App = () => {
  const grid = new Grid(10, 10)
  grid.grid[4][4].isWall = true

  return (
    <Provider store={store}>
      <h1>Testing!</h1>
      <Board grid={grid} />
    </Provider>
  )
}

export default App
