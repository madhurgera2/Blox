import { Link, useNavigate } from "react-router-dom";
import {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import Header from "../utils/Header";

const normalClass = "text-[18px] px-[5px] outline-none border-b-[1px] border-black min-w-[400px]";
const wrongClass = "text-[18px] px-[5px] outline-none border-b-[1px] border-[#d62828] min-w-[400px]";


const Register = (props) => {

    const idRef = useRef();
    const passwordRef = useRef();
    const confirmPassRef = useRef();
    const nameRef = useRef();

    const [password, setPassword] = useState(true);
    const [confirmPassword, setConfirmPassword] = useState(true);
    const [email, setEmail] = useState(true);
    const [name, setName] = useState(true);
    const [mismatch, setMismatch] = useState(false);

    const navigate = useNavigate();

    async function loginHandler(){
        const email = idRef.current.value;
        const password = passwordRef.current.value;
        const confPass = confirmPassRef.current.value;
        const name = nameRef.current.value;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!emailRegex.test(email)){
            setEmail(false);
            return 0;
        }
        if(password.length < 6){
            setPassword(false);
            return 0;
        }
        if(password !== confPass){
            setMismatch(true);
            return 0;
        }
        if(name === ""){
            setName(false)
            return;
        }

        const url = "http://localhost:8000/user/register";
        const data = {
            name: name,
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
            console.log("User registered successfully!")
            navigate('/login')
        }
    }

    return (
        <div className="">

            <Header page={"login"} />

            <div className="flex items-center justify-center px-[30px] py-[30px] mt-[150px]">
                <div className="flex flex-col justify-center items-center">
                    <p className="text-[42px] font-medium">Sign Up</p>
                    <div className="space-y-10 mt-[20px]">
                        <div className="">
                            <input onChange={() => setName(true)} ref ={nameRef} type="text" placeholder="Name" className={name ? normalClass : wrongClass} />
                        </div>
                        <div className="">
                            <input onChange={() => setEmail(true)} ref ={idRef} type="text" placeholder="Email address" className={email ? normalClass : wrongClass} />
                        </div>
                        <div className="">
                            <input onChange={() => {
                                setPassword(true)
                                setMismatch(false)
                            }} ref={passwordRef} type="password" placeholder="Password" className={password ? normalClass : wrongClass} />
                        </div>
                        <div className="">
                            <input onChange={() => {
                                setConfirmPassword(true)
                                setMismatch(false)
                            }} ref={confirmPassRef} type="password" placeholder="Confirm Password" className={password ? normalClass : wrongClass} />
                        </div>
                    </div>
                    {
                        mismatch ? (
                            <div className="mt-[10px] mb-[10px]">
                                <p className="text-[#d62828]">Password does not match with the confirmed password!</p>
                            </div>
                        ) : null
                    }
                    <button onClick={() => loginHandler()} className="bg-[#004e98] rounded-[5px] text-white font-medium px-[15px] w-[100px] py-[5px] mt-[30px]">Sign Up</button>
                </div>
            </div>
        </div>
    );
}

export default Register;