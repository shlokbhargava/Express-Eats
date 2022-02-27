import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Modal, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listAddress } from '../actions/addressAction'
import Address from '../components/Address'
import AddressModal from '../components/AddressModal'
import Message from '../components/Message'
import Progress from '../components/Progress'

const ShippingScreen = ({ history }) => {
    const [show, setShow] = useState(false)

    const addressList = useSelector((state) => state.addressList)
    const { addresses, error } = addressList

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const addAddress = useSelector((state) => state.addAddress)
    const { success } = addAddress

    const addressDetail = useSelector((state) => state.addressDetail)
    const { success: addressSuccess } = addressDetail

    const addressDelete = useSelector((state) => state.addressDelete)
    const { success: successDelete } = addressDelete

    const dispatch = useDispatch()

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        }

        if (success || successDelete) {
            setShow(false)
            dispatch(listAddress())
        }

        dispatch(listAddress())
    }, [success, dispatch, userInfo, history, successDelete])

    const submitHandler = () => {
        history.push('/payment')
    }

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
                <h2 className='float-start'>Delivery</h2>
                <Button className='float-end' variant='dark' size="sm" onClick={() => setShow(true)}>
                    <i className="fas fa-plus"></i> Add New Address
                </Button>
                {/* { loading && <Loader />} */}
                <br></br>
                <br></br>
                <Row>
                    <Col className='flex' md={10}>
                        { addresses && addresses.map((address) => (
                            <div key={address._id}>
                                <Address address={address} />
                            </div>
                        ))}
                    </Col>
                    { addressSuccess && 
                        <Col md={2}>
                            <br></br>
                            <div className="d-grid gap-2">
                                <Button variant="secondary" onClick={submitHandler}>
                                    Continue &nbsp;<i className="fas fa-arrow-circle-right"></i>
                                </Button>
                            </div>
                        </Col>
                    }
                </Row>
            </Container>
        </>
    )
}

export default ShippingScreen
