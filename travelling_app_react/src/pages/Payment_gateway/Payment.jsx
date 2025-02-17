import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';


const Payment = ({ amount, check_in_date, check_out_date, hotel_id,
    number_of_rooms, btnName, flight_id, number_of_seats, price }) => {
    const [orderInfo, setOrderInfo] = useState(null);
    axios.defaults.withCredentials = true;
    const url = useSelector((state) => state.backendUrl.url);


    useEffect(() => {
        const createOrder = async () => {
            try {
                axios.post(`${url}/payment/createOrder`, { amount: amount * Number(number_of_rooms ? number_of_rooms : number_of_seats) })
                    .then((response) => setOrderInfo(response.data))
                    .catch((error) => {
                        console.error('Error creating order:', error);
                        if (error.status == 401) localStorage.removeItem("user_login");
                    })

            } catch (error) {
                console.error('Error creating order:', error);
                if (error.status == 401) localStorage.removeItem("user_login");
            }
        };

        createOrder();

        const handlePayment = () => {
            const options = {
                key: orderInfo,
                amount: orderInfo?.amount, // amount in paise
                currency: 'INR',
                name: 'Your Company Name',
                description: 'Test Transaction',
                image: 'https://www.logologo.com/logos/abstract-isometric-logo-design-free-logo.jpg',
                order_id: orderInfo?.order_id,
                handler: function (response) {
                    alert("Your payment has been successfully processed. A confirmation receipt has been sent to your registered email. If you require any assistance or have any inquiries, please don’t hesitate to contact our support team. ");
                    // if (btnName == "Book Flight") {

                    // }
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

        if (orderInfo) {
            handlePayment()
        }

    }, [amount, number_of_rooms, btnName, check_in_date, check_out_date, flight_id, hotel_id, number_of_seats, orderInfo, price]);

    return (
        <div>

            {/* {
                btnName == "Book Flight" &&
                <button onClick={handlePayment} className='payment-btn'>{btnName}</button>
            } */}
        </div>
    );
};

export default Payment;