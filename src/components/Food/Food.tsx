import React from 'react'
import './Food.css'

interface Props {
    foodCoord: number[]
}

export default function Food(props: Props) {
    const coord = {
        top: `${props.foodCoord[0]}px`,
        left: `${props.foodCoord[1]}px`
    }   

  return (
    <div className='Food' style={coord}></div>
  )
}