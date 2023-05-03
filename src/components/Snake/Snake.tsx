import React, { Component } from 'react'
import './Snake.css'

interface Props {
    segments: number[][]
}

export default function Snake(props: Props) {
    return (
        <>
            {props.segments.map((segment, i) => {
                const coord = {
                    top: `${segment[0]}px`,
                    left: `${segment[1]}px`
                }
                return (
                    <div className='Snake' key={i} style={coord}></div>
                )
            }
            )}
        </>
    )
}
