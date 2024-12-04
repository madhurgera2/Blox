import Footer from "../utils/Footer";
import Header from "../utils/Header";
import {useState, useEffect, useRef} from 'react';
import {Link, useParams, useNavigate} from 'react-router-dom'
import axios from "axios";

const Cart = (props) => {

    const [cartItems, setCartItems] = useState([]);
    const [token, setToken] = useState();
    const [change, setChange] = useState(false);
    const addressRef1 = useRef();
    const addressRef2 = useRef();
    const [couponList, setCouponList] = useState([]);
    const [couponApplied, setCouponApplied] = useState(false);
    const [orderSummary, setOrderSummary] = useState({})


    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        setToken(token);
        const callback = async () => {
            const url = "http://localhost:8000/product/get/all";
            const config = {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            }
            const response = await axios.get(url,config);


            if(response.data.success){
                const prodArr = response.data.body;
                let sum = 0;
                for(let prod of prodArr){
                    sum += prod.price
                }
                setOrderSummary({
                    totalPrice: sum,
                    discountedPrice: 0,
                    orderPrice: sum
                })
                setCartItems(response.data.body)
            }

            console.log(response.data.body)
            return 0;
        }
        callback();
    }, [change])

    const removeHandler = async (id) => {
        const url = `http://localhost:8000/cart/remove`;
        const config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Authorization': token
            }
        }
        const body = {productId: id};
        const response = await axios.post(url, body, config);
        setChange(!change);
        return 0;
    }

    const viewCouponsHandler = async () => {
        // get all the coupons of this user
        const url = `http://localhost:8000/cart/coupon/all`;
        const config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Authorization': token
            }
        }
        const response = await axios.get(url, config);

        setCouponList(response.data.body);
        return 0;
    }

    const placeOrderHandler = async () => {
        const url = `http://localhost:8000/cart/order`;
        const config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Authorization': token
            }
        }
        const body = {
            couponApplied: couponApplied
        }

        const response = await axios.post(url, body, config);

        if(response.data.success){
            navigate('/thank')
        }
        return 0;

    }

    const applyCouponHandler = async (id) => {
        const url = `http://localhost:8000/cart/coupon/verify`;
        const config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Authorization': token
            }
        }
        
        const body = {
            couponId: id,
            totalPrice: orderSummary.totalPrice
        }
        console.log(body)
        const totalPrice = orderSummary.totalPrice;

        const response = await axios.post(url, body, config);

        console.log(response)

        setOrderSummary({
            totalPrice: totalPrice,
            discountedPrice: response.data.body.discountPrice,
            orderPrice: response.data.body.newPrice
        })
        setCouponApplied(true);
    }

    return (
        <div>
            <Header page="cart" />
            <div className="flex w-full px-[30px] space-x-10 mb-[40px] mt-[20px]">
                <div className="w-[65%] space-y-5">
                    {
                        cartItems.length === 0 ? (null) : (
                            <div className="w-full border-[1px] border-grey rounded-[10px] px-[10px] py-[10px] overflow-x-scroll flex items-center space-x-3">
                                {
                                    cartItems.map((item, key) => {
                                        return (
                                            <div className="w-[200px] px-[5px] py-[5px] border-[1px] rounded-[5px]">
                                                <img src={item.imgUrl} className="h-[150px]" alt="img" />
                                                <div className="flex items-center justify-between px-[5px] mt-[5px]">
                                                    <p className="font-medium text-[#6c757d] ">{item.name}</p>
                                                    {/* <div className="flex items-center justify-center bg-[#bc6c25] px-[8px] rounded-[3px] text-[14px]"><p className="text-white">{item.rating}</p></div> */}
                                                </div>
                                                <p className="px-[5px] font-medium">Price: ₹{item.price}</p>
                                                <button onClick={() => removeHandler(item.productId)} className="hover:cursor-pointer w-full text-center bg-[#22223b] mt-[5px] py-[3px] rounded-[4px] text-white">Remove</button>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    }

                    {/* <div className="w-full shadow-lg px-[20px] py-[20px] flex justify-between">
                        <p className="text-[#6c757d] font-bold">LOGIN</p>
                    </div> */}
                    <div className="w-full shadow-lg px-[20px] py-[20px]">
                        <p className="text-[#6c757d] font-bold">ADDRESS</p>
                        <div className="mt-[10px] flex space-x-5">
                            <div className="flex flex-col w-full">
                                <label>First address line*</label>
                                <input ref={addressRef1} type="text" placeholder="H-123/XYZ, 12897" className="border-[1px] border-grey px-[10px] py-[5px] mt-[5px] rounded-[5px]" />
                            </div>
                            <div className="flex flex-col w-full">
                                <label>Second address line*</label>
                                <input ref={addressRef2} type="text" placeholder="Near some place, New Delhi" className="border-[1px] border-grey px-[10px] py-[5px] mt-[5px] rounded-[5px]" />
                            </div>
                        </div>
                    </div>
                    {
                        couponApplied ? null : (
                            <div className="w-full shadow-lg px-[20px] py-[20px]">
                                <p className="text-[#6c757d] font-bold">COUPONS</p>
                                <div className="">
                                    <button onClick = {() => viewCouponsHandler()} className="bg-[#f3722c] text-center text-white font-medium px-[10px] py-[7px] w-full mt-[10px] rounded-[4px]">My Coupons</button>
                                </div>
                                <div className="mt-[10px]">
                                    {
                                        couponList.length === 0 ? (
                                            <p className="text-center">:( Seems like you don't have any coupons yet! Shop more to get exciting coupons!</p>
                                        ) : (
                                            <div className="grid grid-cols-2 mt-[20px]">
                                                {
                                                    couponList.map((coupon, key) => {
                                                        return (
                                                            <div className="border-[1px] border-grey flex justify-between w-full px-[5px] py-[5px] space-x-3">
                                                                <p className="rounded-[3px] w-full border-[1px] border-grey px-[6px] py-[3px]">{coupon.name}</p>
                                                                <button onClick = {() => applyCouponHandler(coupon.couponId)} className="text-center px-[13px] py-[3px] rounded-[3px] bg-[#f3722c] text-white">APPLY</button>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
                <div className="w-[35%] shadow-lg px-[20px] py-[20px] h-[100%] min-h-[120px]">
                    <p className="text-[#6c757d] font-bold">ORDER SUMMARY</p>
                    <hr />
                    <div className="mt-[20px]">
                        <div className="mt-[10px]">
                            <p className="text-[18px]">Total Purchase:</p>
                            <p className="font-bold text-[#d00000]">₹{orderSummary.totalPrice}</p>
                        </div>
                    </div>
                    <div className="">
                        <div className="mt-[10px]">
                            <p className="text-[18px]">Discount Applied:</p>
                            <p className="font-bold">₹{orderSummary.discountedPrice}</p>
                        </div>
                    </div>
                    <div className="">
                        <div className="mt-[10px]">
                            <p className="text-[18px]">Overall Order Price:</p>
                            <p className="font-bold text-[#2b9348]">₹{orderSummary.orderPrice}</p>
                        </div>
                    </div>
                    <div className="mt-[20px]">
                        <button onClick={() => placeOrderHandler()} className="font-medium text-white bg-[#023e8a] text-center w-full rounded-[5px] px-[10px] py-[6px]">Place Order</button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Cart;