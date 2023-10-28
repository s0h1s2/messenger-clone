'use client';

import { Button } from "@/app/components/Button";
import { Input } from "@/app/components/Input/Input";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import AuthSocialButton from "./AuthSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs"
import axios from "axios";
import toast from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Variant = "LOGIN" | "REGISTER"
export const AuthForm = () => {
    const session = useSession()
    const router = useRouter()
    useEffect(() => {
        if (session?.status == "authenticated") {
            router.push('/users')
        }
    }, [session?.status, router])
    const [variant, setVariant] = useState<Variant>("LOGIN")
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const toggleVariant = useCallback(() => {
        if (variant == "LOGIN") {
            setVariant("REGISTER")
            return
        }
        setVariant("LOGIN")

    }, [variant])
    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({

        defaultValues: {
            name: '',
            email: '',
            password: '',
        }
    })
    const onSubmit: SubmitHandler<FieldValues> = (data) => {

        setIsLoading(true)
        if (variant == 'REGISTER') {
            axios.post('/api/register', data).then((s) => {
                toast.success("User Regisered!")
                signIn('credentials', { ...data, redirect: false }).then(() => router.push('/users'))
            }).catch((e) => toast.error("Something went wrong!"))

        }
        if (variant == 'LOGIN') {
            signIn('credentials', {
                ...data,
                redirect: false
            }).then((cb) => {
                if (cb?.error) {
                    toast.error("Invalid credentials")
                    return
                }
                if (cb?.ok) {
                    toast.success("Loggedin !")
                    router.push('/users')
                    return
                }
            })
        }
    }

    return (
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">

                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    {variant == 'REGISTER' ? (
                        <>
                            <Input id="name" label="Name" register={register} required errors={errors} />
                            <Input id="email" label="Email" register={register} required errors={errors} />
                            <Input id="password" type="password" label="Password" register={register} required errors={errors} />
                        </>
                    ) : (
                        <div>
                            <Input id="email" label="Email" type="email" register={register} required errors={errors} />
                            <Input id="password" type="password" label="Password" register={register} required errors={errors} />
                        </div>
                    )}
                    <div>
                        <Button fullWidth type="submit">{variant == "LOGIN" ? "Login" : "Register"}</Button>
                    </div>
                </form>
                <div className="mt-6">
                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="bg-white px-2 text-gray-500">
                                    Or continue with
                                </span>
                            </div>
                        </div>
                        <div className="mt-6 flex gap-2 ">
                            <AuthSocialButton icon={BsGithub} onClick={function() {
                                signIn('github', { redirect: false }).then((cb) => {
                                    if (cb?.error) {
                                        toast.error("Invalid Credentials")
                                        return
                                    }
                                    toast.success("Logged in!")

                                })
                            }} />

                            <AuthSocialButton icon={BsGoogle} onClick={function(): void {
                                throw new Error("Function not implemented.");
                            }} />

                        </div>

                    </div>
                    <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
                        <div>
                            {variant == 'LOGIN' ? "New to messenger? " : "Already have an account?"}
                        </div>
                        <button className="underline cursor-pointer" onClick={toggleVariant}>{variant == 'LOGIN' ? 'Create an account' : 'Login'}</button>
                    </div>

                </div>
            </div>
        </div >
    )
}
