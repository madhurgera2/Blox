import { Link } from "react-router-dom";

const ThankPage = (props) => {
    return (
        <div className="w-[100vw] h-[100vh] flex items-center justify-center">
            <div className="flex flex-col items-center justify-center">
                <img src="/assets/tick.png" className="w-[80px] h-[80px]" alt="tick" />
                <p className="mt-[20px] text-[18px] ">Yaaaaaay! Your order has been placed and will reach to you soon!</p>
                <p className="text-[18px] font-medium">Shop more to get more exciting rewards and coupons!</p>
                <Link to={'/'}><p className="text-[18px] hover:font-bold cursor-pointer hover:scale-[1.1]">Home</p></Link>
            </div>
        </div>
    );
}

export default ThankPage;