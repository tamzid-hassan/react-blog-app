import { useState } from 'react'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import Button from './Button.jsx'
import Input from './Input.jsx'
import Logo from './Logo.jsx'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

export function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const { register, formState: { errors }, handleSubmit } = useForm()

    const create = async (data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(login(userData));
                navigate("/")
            }


        } catch (err) {

            setError(err.message)
        }
    }

    return (
        <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="flex justify-center mb-2">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-2xl font-bold leading-tight text-center">Sign up to create account</h2>
                <p className="mt-2 text-base text-center text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium transition-all duration-200 text-primary hover:underline"
                    >
                        Sign In
                    </Link>
                </p>

                {error.length > 0 && <p className="mt-8 text-center text-red-600">{error}</p>}

                <form onSubmit={handleSubmit(create)}>
                    <div className='space-y-5'>
                        <Input
                            label="Full Name: "
                            placeholder="Enter your full name"
                            {...register("name", {
                                required: "Full Name is required",
                            })}
                        />
                        {errors.name && <p role="alert" className="mt-8 text-center text-red-600">{errors.name.message}</p>}

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

                        {errors.email && <p role="alert" className="mt-8 text-center text-red-600">{errors.email.message}</p>}

                        <Input
                            label="Password: "
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: "Password is required",
                                pattern: {
                                    value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                                    message: "Password must contain at least 1 uppercase, 1 lowercase, and 1 number"
                                }
                            })}
                        />

                        {errors.password && <p role="alert" className="my-8 text-center text-red-600">{errors.password.message}</p>}

                        <Button type="submit" className="w-full">
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>

        </div>
    )
}

