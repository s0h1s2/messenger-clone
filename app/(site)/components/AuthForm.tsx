'use client';

import { Button } from "@/app/components/Button";
import { Input } from "@/app/components/Input/Input";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { AuthSocialButton } from "./AuthSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs"
import axios from "axios";
type Variant = "LOGIN" | "REGISTER"
export const AuthForm = () => {
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
            axios.post('/api/register', data)
        }
        if (variant == 'LOGIN') { }
    }

    return (
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">

                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    {variant == 'REGISTER' ? (
                        <>
                            <Input id="name" label="Name" register={register} required errors={errors} />
                            <Input id="email" label="Email" register={register} required errors={errors} />
                            <Input id="password" label="Password" register={register} required errors={errors} />
                        </>
                    ) : (
                        <div>
                            <Input id="email" label="Email" type="email" register={register} required errors={errors} />
                            <Input id="password" label="Password" register={register} required errors={errors} />
                        </div>
                    )}
                    <div>
                        <Button fullWidth type="submit">{variant == "LOGIN" ? "Login" : "Register"}</Button>
                    </div>
                </form>
                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-2 text-gray-500 uppercase">
                                Or contunie with
                            </span>
                        </div>
                        <div className="mt-6 flex gap-2 ">
                            <AuthSocialButton icon={BsGithub} onClick={function(): void {
                                throw new Error("Function not implemented.");
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
