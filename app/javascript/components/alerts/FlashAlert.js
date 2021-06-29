import React from 'react'
import { AlertSection, FlashHeading, FlashItem } from "../styled/FlashStyledComponents"

const FlashAlert = ({alerts}) => {
  return (
    <>
      {alerts.length > 0 && (
        <AlertSection>
          <FlashHeading>Alert:</FlashHeading>
          <ul>
            {alerts.map((alert, index) => {
              return <FlashItem key={`alert${index}`}>{alert}</FlashItem>
            })}
          </ul>
        </AlertSection>
      )}
    </>
  )
}

export default FlashAlert
