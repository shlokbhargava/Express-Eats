import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loader = () => {
    return (
        <Spinner animation="border" variant="dark" style={{ width: '150px', height: '150px', margin: 'auto', display: 'block'}} />
    )
}

export default Loader
