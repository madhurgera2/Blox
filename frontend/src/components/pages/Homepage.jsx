import Footer from "../utils/Footer";
import Header from "../utils/Header";
import Typed from "typed.js";
import {useState, useRef, useEffect} from 'react';
import Products from "../utils/Products";
import ProductCard from "../cards/ProductCard";
import axios from 'axios'

const taglines = [
    'Best place to get rewards on orders you make!',
    'Get 10% discount on every 5 orders that you make on UniShop',
    'We value your experience by showing you that we care about you with awesome rewards!'
]

const Homepage = (props) => {
    const [tagline, setTagline] = useState(0);
    const el = useRef(null);
    const [products, setProducts] = useState([]);

    useEffect(() => {

        const callback = async () => {
            const url = "http://localhost:8000/product/all";
            const config = {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                }
            }
            const response = await axios.get(url, config);
            setProducts(response.data.body);
        }

        callback();

        const typed = new Typed(el.current, {
          strings: ["Best place to get rewards on orders you make!", 
          "Get 10% discount COUPON card on every 5th order that you make on UniShop", 
          "We value your experience by showing you that we care about you with awesome rewards!", 
        ],
          startDelay: 20,
          typeSpeed: 50,
          backSpeed: 50,
          backDelay: 300,
          smartBackspace: true,
          loop: true,
          showCursor: false,
        });
    
        return () => {
          typed.destroy();
        };


    }, []);

    return (
        <div>
            <Header page="homepage"/>
            <div className="mt-[20px] mb-[20px]">
                <div className="bg-[#dee2e6] rounded-[10px] mx-[40px] px-[20px] py-[10px]">
                    <p className="font-medium" ref={el}></p>
                </div>
                <div className="mt-[20px] px-[40px] w-full flex flex-col justify-center items-center">
                    <div className="w-[90%] bg-[#0353a4] flex justify-center mt-[30px] rounded-[5px] py-[5px] mb-[20px]"><p className="text-white text-[20px] font-medium">Electronics</p></div>
                    <div className="flex items-center space-x-8 justify-center">
                        {
                            products.map((product, index) => {
                                if(product.type === "electronics"){
                                    return <ProductCard product={product} />
                                }
                            })
                        }
                    </div>

                    <div className="w-[90%] bg-[#0353a4] flex justify-center mt-[30px] rounded-[5px] py-[5px] mb-[20px]"><p className="text-white text-[20px] font-medium">Fashion</p></div>
                    <div className="flex items-center space-x-8 justify-center">
                        {
                            products.map((product, index) => {
                                if(product.type === "fashion"){
                                    return <ProductCard product={product} />
                                }
                            })
                        }
                    </div>

                    <div className="w-[90%] bg-[#0353a4] flex justify-center mt-[30px] rounded-[5px] py-[5px] mb-[20px]"><p className="text-white text-[20px] font-medium">Food</p></div>
                    <div className="flex items-center space-x-8 justify-center">
                        {
                            products.map((product, index) => {
                                if(product.type === "food"){
                                    return <ProductCard product={product} />
                                }
                            })
                        }
                    </div>

                    <div className="w-[90%] bg-[#0353a4] flex justify-center mt-[30px] rounded-[5px] py-[5px] mb-[20px]"><p className="text-white text-[20px] font-medium">Shoes</p></div>
                    <div className="flex items-center space-x-8 justify-center">
                        {
                            products.map((product, index) => {
                                if(product.type === "shoes"){
                                    return <ProductCard product={product} />
                                }
                            })
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Homepage;