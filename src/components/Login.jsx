import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import Button from "./Button"
import Input from "./Input"
import Logo from "./Logo"
import { useDispatch } from "react-redux"
import authService from "../appwrite/auth"
import { useForm } from "react-hook-form"

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, formState: { errors }, handleSubmit } = useForm()
    const [error, setError] = useState("")

    const login = async (data) => {
        setError("")
        try {
            const session = await authService.login(data)

            if (typeof session !== 'string') {
                const userData = await authService.getCurrentUser()
                console.log(userData)

                if (userData) dispatch(authLogin(userData));

                navigate("/")

            } else {
                setError(session)
            }

        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <div
            className='flex items-center justify-center w-full'
        >
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="flex justify-center mb-2">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-2xl font-bold leading-tight text-center">Sign in to your account</h2>
                <p className="mt-2 text-base text-center text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium transition-all duration-200 text-primary hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {/* TODO: This appwrite API request error*/}
                {error && <p className="mt-8 text-center text-red-600">{error}</p>}
                <form onSubmit={handleSubmit(login)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                    message: "Email address must be a valid address"
                                }
                            })}
                        />

                        {/* TODO: These are form validation from client side*/}
                        {errors.email && <p role="alert" className="mt-8 text-center text-red-600">{errors.email.message}</p>}


                        <Input
                            label="Password: "
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: true,
                                pattern: {
                                    value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
                                }
                            })}
                        />

                        {errors?.password?.type === "required" && (
                            <p role="alert" className="mt-8 text-center text-red-600">Password is required</p>
                        )}

                        {errors?.password?.type === "pattern" && (
                            <p role="alert" className="mt-8 text-center text-red-600">Password must contain at least 1 uppercase, 1 lowercase, and 1 number</p>
                        )}

                        <Button
                            type="submit"
                            className="w-full"
                        >Sign in</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login