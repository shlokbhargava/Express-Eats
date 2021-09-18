import React, { useState } from 'react'
import { Card, Form, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import AddressModal from './AddressModal'

const Address = ({ address }) => {
    const [show, setShow] = useState(false)

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    return (
        <>
            { show && 
                <Modal show={show} onHide={() => setShow(false)} backdrop="static" keyboard={false}>
                    <AddressModal item={address} />
                </Modal>
            }   

            <Card className="my-3 rounded" style={{ width: '18rem', boxShadow: '0 2px 5px 0 rgb(0 0 0 / 20%), 0 2px 5px 0 rgb(0 0 0 / 10%)' }}>
                <Card.Body>
                    <Card.Title><strong>{userInfo.name}</strong></Card.Title>
                    <p>
                        {address.address} <br></br>
                        {address.city}, {address.state} {address.postalCode} <br></br>
                        {address.country} <br></br>
                        Contact Number: {address.contact} <br></br>
                    </p>
                    <OverlayTrigger placement='top' overlay={<Tooltip>Edit</Tooltip>}>
                        <i className="far fa-edit fa-lg text-dark" type="button" onClick={() => setShow(true)}></i>
                    </OverlayTrigger>
                    &nbsp;&nbsp;
                    <OverlayTrigger placement='top' overlay={<Tooltip>Delete</Tooltip>}>
                        <i className="far fa-trash-alt fa-lg text-danger" type="button"></i>
                    </OverlayTrigger>
                    <Form>
                        <Form.Group className='mt-3'>
                            <Form.Check type="checkbox" label="Deliver here"  />
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}

export default Address
