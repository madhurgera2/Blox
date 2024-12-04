import { Link } from "react-router-dom";

const Header = ({page}) => {
    return (
        <>
            {
                page === "home" ? (
                    <div className="w-full border-[2px] border-grey px-[30px] bg-white py-[15px] flex items-center justify-between">
                        <Link to={'/'}><div className=" flex items-center space-x-3 hover:cursor-pointer">
                            <img src="/assets/Logo.png" alt="logo" className="w-[45px] h-[45px]" />
                            <div className="space-y-[-10px]">
                                <p className="text-[32px] font-medium">UniShop</p>
                                <p className="italic">Get rewards on your shopping</p>
                            </div>
                        </div></Link>
                        <div className="space-x-10 ">
                            <Link to={'/login'}><button className=" border-[1px] border-[#004e98] text-[#004e98] font-medium px-[13px] py-[7px] rounded-[5px] hover:shadow-xl">Sign In</button></Link>
                            <Link to={'/register'}><button className="bg-[#004e98] text-white font-medium px-[13px] py-[7px] rounded-[5px] hover:shadow-xl">Sign Up</button></Link>
                        </div>
                    </div>
                ) : (page === "login" ? (
                    <div className="w-full border-[2px] border-grey px-[30px] bg-white py-[15px] flex items-center justify-between">
                        <Link to={'/'}><div className=" flex items-center space-x-3 hover:cursor-pointer">
                            <img src="/assets/Logo.png" alt="logo" className="w-[45px] h-[45px]" />
                            <div className="space-y-[-10px]">
                                <p className="text-[32px] font-medium">UniShop</p>
                                <p className="italic">Get rewards on your shopping</p>
                            </div>
                        </div></Link>
                        <div className="space-x-10 ">
                            <Link to={'/register'}><button className="bg-[#004e98] text-white font-medium px-[13px] py-[7px] rounded-[5px] hover:shadow-xl">Sign Up</button></Link>
                        </div>
                    </div>
                ) : (
                    page === "homepage" ? (
                        <div className="w-full border-[2px] border-grey px-[40px] bg-white py-[15px] flex items-center justify-between">
                            <Link to={'/'}><div className=" flex items-center space-x-3 hover:cursor-pointer">
                                <img src="/assets/Logo.png" alt="logo" className="w-[45px] h-[45px]" />
                                <div className="space-y-[-10px]">
                                    <p className="text-[32px] font-medium">UniShop</p>
                                    <p className="italic">Get rewards on your shopping</p>
                                </div>
                            </div></Link>
                            <div className="space-x-10 flex items-center">
                                <Link to={'/cart'}><div className="flex items-center space-x-2 hover:cursor-pointer">
                                    <img src="/assets/shopping-cart.png" className="w-[30px]" alt="profile" />
                                    <p className="font-medium">Cart</p>
                                </div></Link>
                                <img src="/assets/profile.png" className="w-[50px] hover:cursor-pointer" alt="profile" />
                            </div>
                        </div>
                    ) : (
                        page === "cart" ? (
                            <div className="w-full border-[2px] border-grey px-[40px] bg-white py-[15px] flex items-center justify-between">
                                <Link to={'/'}><div className=" flex items-center space-x-3 hover:cursor-pointer">
                                    <img src="/assets/Logo.png" alt="logo" className="w-[45px] h-[45px]" />
                                    <div className="space-y-[-10px]">
                                        <p className="text-[32px] font-medium">UniShop</p>
                                        <p className="italic">Get rewards on your shopping</p>
                                    </div>
                                </div></Link>
                                <div className="space-x-10 flex items-center">
                                    <img src="/assets/profile.png" className="w-[50px] hover:cursor-pointer" alt="profile" />
                                </div>
                            </div>
                        ) : null
                    )
                ))
            }
        </>
    );
}

export default Header;