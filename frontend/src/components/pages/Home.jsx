import Header from "../utils/Header";
import Footer from '../utils/Footer';
import {useState, useEffect} from 'react'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from "react-router-dom";

const carouselData = [
    {
        id: 1,
        label: "Electronic Gadgets",
        alt: "electronics",
        url: "/assets/electronics.webp",
        link: "/"
    },
    {
        id: 2,
        label: "Clothing",
        alt: "fashion",
        url: "/assets/fashion.webp",
        link: ""
    },
    {
        id:3,
        label: "Food",
        alt: "food",
        url: "/assets/food.webp",
        link: ""
    },
    {
        id:4,
        label: "Shoes",
        alt: "shoes",
        url: "/assets/shoes.webp",
        link: ""
    }
]

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
  };
const Home = (props) => {

    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        // Slide to the next one
        setCurrentSlide((prevSlide) => (prevSlide + 1) % carouselData.length);
      }, 3000);
  
      // Cleanup the interval on component unmount
      return () => clearInterval(interval);
    }, []);

    return (
        <>  
        <div className="h-[100vh]">
            <Header page={"home"} />
            <div className="h-[70%]">
                <div className="w-full h-full rounded-[10px] px-[30px] py-[50px]">
                    {/* {
                        carouselData.map((data) => {
                            return <div key={data.alt} className="h-full">
                                <img src={data.url} alt={data.alt} className="" />
                                <p className="legend">{data.label}</p>
                            </div>
                        })
                    } */}
                          <Slider {...settings} slickGoTo={currentSlide}>
                            {carouselData.map((data) => (
                                <div className="h-[470px]">
                                    <img key={data.id} src={data.url} className="w-full" alt={data.alt} />
                                </div>
                            ))}
                        </Slider>
                </div>
            </div>
            <Footer />
        </div>
        </>
    );
}

export default Home;