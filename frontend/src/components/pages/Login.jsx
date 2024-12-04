import { Link, useNavigate } from "react-router-dom";
import {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import Header from "../utils/Header";

const normalClass = "text-[18px] px-[5px] outline-none border-b-[1px] border-black min-w-[400px]";
const wrongClass = "text-[18px] px-[5px] outline-none border-b-[1px] border-[#d62828] min-w-[400px]";


const Login = (props) => {

    const idRef = useRef();
    const passwordRef = useRef();

    const [password, setPassword] = useState(true);
    const [email, setEmail] = useState(true);

    const navigate = useNavigate();

    async function loginHandler(){
        const email = idRef.current.value;
        const password = passwordRef.current.value;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!emailRegex.test(email)){
            setEmail(false);
            return 0;
        }
        if(password.length < 6){
            setPassword(false);
            return 0;
        }

        const url = "http://localhost:8000/user/login";
        const data = {
            email: email,
            password: password
        }
        const config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            }
        }
        const response = await axios.post(url, data, config);

        if(response.data.success === false){
            console.log(response.data.message)
        }else{
            console.log("User logged in successfully!")
            console.log("Access token: ", response.data.access_token)
            console.log("Refresh token: ", response.data.refresh_token)
            localStorage.setItem("token", response.data.access_token)
            navigate(`/unishop/home/${response.data.userId}`)
        }
    }

    return (
        <div className="">

            <Header page={"login"} />

            <div className="flex items-center justify-center px-[30px] py-[30px] mt-[150px]">
                <div className="flex flex-col justify-center items-center">
                    <p className="text-[42px] font-medium">Login</p>
                    <div className="space-y-10 mt-[20px]">
                        <div className="">
                            <input onChange={() => setEmail(true)} ref ={idRef} type="text" placeholder="Email address" className={email ? normalClass : wrongClass} />
                        </div>
                        <div className="">
                            <input onChange={() => setPassword(true)} ref={passwordRef} type="password" placeholder="Password" className={password ? normalClass : wrongClass} />
                        </div>
                    </div>
                    <button onClick={() => loginHandler()} className="bg-[#004e98] rounded-[5px] text-white font-medium px-[15px] w-[100px] py-[5px] mt-[30px]">Login</button>
                    <p className="mt-[20px] text-[#023e8a] font-medium hover:font-bold hover:cursor-pointer">Forgot password?</p>
                </div>
            </div>
        </div>
    );
}

export default Login;