const Footer = (props) => {
    return (
        <div className="bg-[#023e8a] px-[30px] py-[20px]">
            <div className="flex justify-between">
                <div className="flex items-start space-x-12">
                    <div className="">
                        <p className="text-white font-medium text-[32px]">UniShop</p>
                        <p className="text-white">Get the best rewards on your purchases</p>
                    </div>
                    <div className="flex flex-col space-y-2 text-white mt-[20px]">
                        <p className="hover:scale-[1.05] hover:cursor-pointer">About</p>
                        <p className="hover:scale-[1.05] hover:cursor-pointer">Contact Us</p>
                        <p className="hover:scale-[1.05] hover:cursor-pointer">Our Products</p>
                        <p className="hover:scale-[1.05] hover:cursor-pointer">Rewards</p>
                    </div>
                    <div className="flex flex-col space-y-2 text-white mt-[20px]">
                        <p className="hover:scale-[1.05] hover:cursor-pointer">Development APIs</p>
                        <p className="hover:scale-[1.05] hover:cursor-pointer">Privacy Policy</p>
                        <p className="hover:scale-[1.05] hover:cursor-pointer">Terms & Conditions</p>
                        <p className="hover:scale-[1.05] hover:cursor-pointer">Rewards</p>
                    </div>
                </div>
                <div className="mt-[20px] mr-[20px]">
                    <p className="w-[200px] text-white">Rohini Sector 22, 110086, New Delhi, Delhi, India</p>
                    <div className="flex items-center space-x-6 mt-[20px]">
                        <img alt="instagram" src="/assets/instagram.png" className="w-[30px]" />
                        <img alt="facebook" src="/assets/facebook.png" className="w-[30px]" />
                        <img alt="twitter" src="/assets/twitter.png" className="w-[30px]" />
                        <img alt="whatsapp" src="/assets/whatsapp.png" className="w-[30px]" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;