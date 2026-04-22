import React from 'react'
import * as z from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router';

const registerSchema = z
    .object({
        name: z
            .string()
            .min(3, "Name must be at least 3 characters")
            .regex(/^[A-Za-z ]+$/, "Only letters allowed"),
        email: z
            .string()
            .email("Invalid email format"),
        password: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .regex(/[A-Z]/, "Must include uppercase letter")
            .regex(/[a-z]/, "Must include lowercase letter")
            .regex(/[0-9]/, "Must include a number")
            .regex(/[@$!%*?&]/, "Must include special character"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

const Register = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
    } = useForm({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = (data) => {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const exists = users.find((u) => u.email === data.email);

        if (exists) {
            setError("email", {
                type: "manual",
                message: "Email already exists",
            });
            return;
        }

        users.push({
            name: data.name,
            email: data.email,
            password: data.password,
        });

        localStorage.setItem("users", JSON.stringify(users));
        navigate("/login");
    };

    return (
        <div className="min-h-screen relative overflow-hidden font-sans">
            <img
                src="/The first trailer for Avatar.jpg"
                className="absolute inset-0 w-full h-full object-cover"
                alt="Background"
            />

            <div className="absolute inset-0 bg-black/60" />

            <div className="relative z-10 flex min-h-screen items-center justify-center lg:justify-end lg:pr-32 p-6">
                
                <div 
                    style={{ backgroundColor: 'var(--dark-surface)', opacity: 0.85 }}
                    className="backdrop-blur-xl p-10 rounded-3xl w-full max-w-md shadow-2xl border border-white/10"
                >
                    <h2 style={{ color: 'var(--dark-text)' }} className="text-3xl font-bold mb-6 text-center">
                        Create Account
                    </h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        {/* name */}
                        <div className="space-y-1">
                            <Input
                                placeholder="Name"
                                style={{ backgroundColor: 'rgba(255,255,255,0.05)', color: 'var(--dark-text)', borderColor: 'var(--dark-border)' }}
                                className=" h-12 !text-lg "
                                {...register("name")}
                            />
                            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name?.message}</p>}
                        </div>
                        
                        {/* email */}
                        <div className="space-y-1">
                            <Input
                                placeholder="Email"
                                className="h-12 !text-lg "
                                style={{ backgroundColor: 'rgba(255,255,255,0.05)', color: 'var(--dark-text)', borderColor: 'var(--dark-border)' }}
                                {...register("email")}
                            />
                            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email?.message}</p>}
                        </div>

                        {/* pass */}
                        <div className="space-y-1">
                            <Input
                                type="password"
                                placeholder="Password"
                                className="h-12 !text-lg "
                                style={{ backgroundColor: 'rgba(255,255,255,0.05)', color: 'var(--dark-text)', borderColor: 'var(--dark-border)' }}
                                {...register("password")}
                            />
                            {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password?.message}</p>}
                        </div>

                        {/* Confirm pass */}
                        <div className="space-y-1">
                            <Input
                                type="password"
                                className="h-12 !text-lg "
                                placeholder="Confirm Password"
                                style={{ backgroundColor: 'rgba(255,255,255,0.05)', color: 'var(--dark-text)', borderColor: 'var(--dark-border)' }}
                                {...register("confirmPassword")}
                            />
                            {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword?.message}</p>}
                        </div>

                        <button 
                            disabled={isSubmitting}
                            style={{ backgroundColor: 'var(--primary)', color: '#191919' }}
                            className="w-full font-bold py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] mt-4 shadow-lg"
                        >
                            {isSubmitting ? "Loading..." : "Register"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register;