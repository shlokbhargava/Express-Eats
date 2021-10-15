import React, { useState } from 'react'
import { Card, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAddress, listAddressDetails } from '../actions/addressAction'
import AddressModal from './AddressModal'

const Address = ({ address }) => {
    const [show, setShow] = useState(false)

    const dispatch = useDispatch()

    const cart = useSelector((state) => state.cart)
    const { cartItems } = cart

    const deleteHandler = () => {
        if (window.confirm('Are you sure you want to delete the address')) {
            dispatch(deleteAddress(address._id))
        }
    }

    const getDeliveryAddress = (id) => {
        dispatch(listAddressDetails(id))
    }

    return (
        <>
            { show && 
                <Modal show={show} onHide={() => setShow(false)} backdrop="static" keyboard={false}>
                    <AddressModal item={address} />
                </Modal>
            }

            <Card key={address._id} className="my-3 rounded" style={{ width: '18rem', boxShadow: '0 2px 5px 0 rgb(0 0 0 / 20%), 0 2px 5px 0 rgb(0 0 0 / 10%)' }}>
                <Card.Body>
                    <Card.Title><strong>{address.name}</strong></Card.Title>
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
                        <i className="far fa-trash-alt fa-lg text-danger" type="button" onClick={deleteHandler}></i>
                    </OverlayTrigger>  
                    <br></br>
                    <br></br>
                    <fieldset className="form-group">
                        <div className="form-check">
                            <label className="form-check-label">
                            <input type="radio" className="form-check-input" name="optionsRadios" value={address._id} onChange={(e) => getDeliveryAddress(e.target.value)} disabled={address.state !== cartItems[0].restaurant.state && address.city !== cartItems[0].restaurant.state}></input>
                            Deliver Here 
                            </label>
                        </div> 
                    </fieldset>
                </Card.Body>
            </Card>
        </>
    )
}

export default Address
