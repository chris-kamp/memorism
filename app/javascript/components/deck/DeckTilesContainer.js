import React from 'react'
import {GridContainer} from "../styled/DeckStyledComponents"


const DeckTilesContainer = ({children}) => {
  return (
    <GridContainer>
      {children}
    </GridContainer>
  )
}

export default DeckTilesContainer
