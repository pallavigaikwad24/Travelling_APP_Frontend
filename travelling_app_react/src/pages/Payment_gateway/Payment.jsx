import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Payment = ({ amount, check_in_date, check_out_date, hotel_id, number_of_rooms }) => {
    const [orderInfo, setOrderInfo] = useState(null);
    const url = useSelector((state) => state.backendUrl.url);

    useEffect(() => {
        const createOrder = async () => {
            try {
                const response = await axios.post(`${url}/payment/createOrder`, { amount });
                console.log("Response 12:", response);
                setOrderInfo(response.data);
            } catch (error) {
                console.error('Error creating order:', error);
            }
        };

        createOrder();
    }, [url, amount]);

    const handlePayment = () => {
        const options = {
            key: orderInfo,
            amount: orderInfo.amount, // amount in paise
            currency: 'INR',
            name: 'Your Company Name',
            description: 'Test Transaction',
            image: 'https://www.logologo.com/logos/abstract-isometric-logo-design-free-logo.jpg',
            order_id: orderInfo.order_id,
            handler: function (response) {
                alert("Your payment has been successfully processed. A confirmation receipt has been sent to your registered email. If you require any assistance or have any inquiries, please don’t hesitate to contact our support team. ");
                // alert(response.razorpay_order_id);
                // alert(response.razorpay_signature);
                axios.post(`${url}/hotel/hotel-booking`, { check_in_date, check_out_date, hotel_id, number_of_rooms })
                    .then((response) => console.log("37:", response.data))
                    .catch((err) => console.log(err));
            },
            prefill: {
                name: orderInfo.name,
                email: orderInfo.email,
                contact: orderInfo.contact,
            },
            notes: {
                address: 'Razorpay Corporate Office',
            },
            theme: {
                color: '#3399cc',
            },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    return (
        <div>
            <button onClick={handlePayment}>Pay Now</button>
        </div>
    );
};

export default Payment;