import React from 'react'
import { Modal, Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { getStringPrice } from '../utility'

const OrderModal = ({ order }) => {

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    return (
        <>
            <Modal.Header>
                <Modal.Title>ORDER DETAILS # {order._id}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            { !userInfo.isSeller &&<h4><strong>Order From : </strong>{order.restaurant.name}</h4>}
                <Table responsive="sm">
                    <thead>
                    <tr className='text-center'>
                        <th><strong>Item</strong></th>
                        <th><strong>Quantity</strong></th>
                        <th><strong>Price</strong></th>
                        <th><strong>Item Total</strong></th>
                    </tr>
                    </thead>
                    <tbody>
                    { order.orderItems.map((item) => (
                        <tr className='text-center' key={item._id}>
                            <td>{item.name}</td>
                            <td>{item.qty}</td>
                            <td>₹{getStringPrice(item.price)}</td>
                            <td>₹{getStringPrice(item.qty*item.price)}</td>
                        </tr>
                    )) }
                        <tr className='text-center'>
                            <td></td>
                            <td></td>
                            <td>Items Total + GST</td>
                            <td>₹{getStringPrice(order.itemPrice)} + ₹{getStringPrice(order.gst)}</td>
                        </tr>
                        <tr className='text-center'>
                            <td></td>
                            <td></td>
                            <td>Packaging Charges + Delivery Charges</td>
                            <td>₹{getStringPrice(order.packagingPrice)} + ₹{getStringPrice(order.deliveryPrice)}</td>
                        </tr>
                        <tr className='text-center'>
                            <td></td>
                            <td></td>
                            <td><strong>Order Total</strong></td>
                            <td>₹{getStringPrice(order.totalPrice)}</td>
                        </tr>
                    </tbody>
                </Table>
            </Modal.Body>  
        </>
    )
}

export default OrderModal
