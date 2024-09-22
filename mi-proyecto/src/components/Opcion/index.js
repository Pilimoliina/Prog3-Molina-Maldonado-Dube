import React from 'react'
import {Link} from 'react-router-dom'

export default function Opcion(props) {
  return (
    <Link to={props.data.ruta}>
        {props.data.nombre}
      </Link>
  )
}