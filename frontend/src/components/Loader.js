import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loader = () => {
    return (
        <Spinner animation="grow" variant="danger" style={{ width: '100px', height: '100px', margin: 'auto', display: 'block'}} />
    )
}

export default Loader
