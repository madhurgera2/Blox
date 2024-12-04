import axios from 'axios';
import {useState, useEffect, useRef} from 'react';
import {Link, useParams} from 'react-router-dom';
import Footer from '../utils/Footer';
import Header from '../utils/Header';

const ProductDetails = (props) => {

    const [productDetails, setProductDetails] = useState({});
    const [token, setToken] = useState();
    const params = useParams();


    useEffect(() => {
        //fetch the id in parameter and get the product details
        const productId = params.id;
        const token = localStorage.getItem("token");
        setToken(token);
        const callback = async () => {
            const url = `http://localhost:8000/product/get/${params.id}`;
            const config = {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            }

            const product = await axios.get(url, config);
            setProductDetails(product.data.body);
        }

        callback();
    }, []);

    async function addToCartHandler(){
        console.log(token)
        const url = 'http://localhost:8000/cart/add';
        const config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Authorization': token
            }
        }

        const body = {
            productId: params.id
        }

        const response = await axios.post(url, body, config);
        console.log(response);
        return 0;
    }

    

    return (
        <div>
            <Header page={"homepage"} />
            <div className='flex items-start w-full px-[40px] py-[30px] space-x-10'>
                <div className='w-[35%] rounded-[10px] border-grey border-[1px] p-[20px]'>
                    <img src={productDetails.imgUrl} className='' alt="item-image" />
                    <div className='w-full space-x-3 mt-[30px] flex items-center'>
                        <button onClick={() => addToCartHandler()} className='bg-[#f3722c] flex justify-center items-center w-[50%] py-[10px] rounded-[5px] hover:shadow-xl'><p className='text-white font-medium'>Add to Cart</p></button>
                        <button className='bg-[#023e8a] flex justify-center items-center w-[50%] py-[10px] rounded-[5px] hover:shadow-xl'><p className='text-white font-medium'>Buy Now</p></button>
                    </div>
                </div>
                <div className='w-[65%] '>
                    <div className='rounded-[10px] border-grey border-[1px] p-[15px]'>
                        <p className='text-[20px] text-[#6c757d]'>{productDetails.name}</p>
                        <p className='text-[22px] font-medium'>{productDetails.description}</p>
                        <div className='flex items-center space-x-4 mt-[10px]'>
                            <p className='bg-[#bc6c25] text-white font-medium px-[10px] rounded-[5px]'>{productDetails.rating}</p>
                            <p className='text-[18px]'><span className='font-bold'>{productDetails.reviews}</span> Ratings & <span className='font-bold'>{productDetails.prevMonth}</span> users bought the product last month</p>
                        </div>
                        <p className='text-[#007200] font-medium mt-[10px]'>Special Price</p>
                        <p className='text-[32px] font-medium'>₹{productDetails.price}</p>
                        <p className='mt-[10px] text-[18px] font-medium'>Product Specifications</p>
                        <hr/>
                        <div className='mt-[10px]'>
                            <p>{productDetails.specs}</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ProductDetails;