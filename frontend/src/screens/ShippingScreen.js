import React, { useEffect, useState } from 'react'
import { Button, Container, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listAddress } from '../actions/addressAction'
import Address from '../components/Address'
import AddressModal from '../components/AddressModal'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Progress from '../components/Progress'

const ShippingScreen = () => {
    const [show, setShow] = useState(false)

    const addressList = useSelector((state) => state.addressList)
    const { addresses, loading, error } = addressList

    const addAddress = useSelector((state) => state.addAddress)
    const { success } = addAddress

    const dispatch = useDispatch()

    useEffect(() => {
        if (success) {
            setShow(false)
            dispatch(listAddress())
        }

        dispatch(listAddress())
    }, [success, dispatch])

    return (
        <>
            <Progress step2 />
            { error && <Message variant='danger'>{error}</Message> }

            { show && 
                <Modal show={show} onHide={() => setShow(false)} backdrop="static" keyboard={false}>
                    <AddressModal />
                </Modal>
            }   

            <Container className='mt-3 justify-content-center'>
                <h2 className='float-start'>Shipping Address</h2>
                <Button className='float-end' variant='dark' size="sm" onClick={() => setShow(true)}>
                    <i className="fas fa-plus"></i> Add New Address
                </Button>
                { loading && <Loader />}
                <br></br>
                <br></br>
                <div className='flex'>
                    { addresses && addresses.map((address) => (
                        <div key={address._id}>
                            <Address address={address} />
                        </div>
                    ))}
                </div>
            </Container>
            {/* <div className='flex'>

            </div> */}
        </>
    )
}

export default ShippingScreen
