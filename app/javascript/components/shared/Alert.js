import React from 'react'
import styled from "styled-components"


const AlertSection = styled.section`
  width: 100%;
  border-radius: 0.25rem;
  background-color: #b0d1e8;
  padding: 0 1rem;
`

const AlertHeading = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
`

const AlertItem = styled.li`
  font-size: 1.25rem;
`

const Alert = ({alerts}) => {
  return (
    <>
      {alerts.length > 0 && (
        <AlertSection>
          <AlertHeading>Alert:</AlertHeading>
          <ul>
            {alerts.map((alert, index) => {
              return <AlertItem key={`alert${index}`}>{alert}</AlertItem>
            })}
          </ul>
        </AlertSection>
      )}
    </>
  )
}

export default Alert
