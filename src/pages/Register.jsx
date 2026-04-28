import React from 'react'
import * as z from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router';
import { Link } from "react-router";
import ThemeToggle from '@/components/ThemeToggle';
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
            <div className="absolute top-6 right-6 z-20">
                <ThemeToggle />
            </div>
            <img
                src={`${import.meta.env.BASE_URL}The first trailer for Avatar.jpg`}
                className="absolute inset-0 w-full h-full object-cover"
                alt="Background"
            />

            <div className="absolute inset-0 bg-black/20 dark:bg-black/50" />

            <div className="relative z-10 flex min-h-screen items-center justify-center lg:justify-end lg:pr-32 p-6">
                
                <div 
                    className="bg-card/50 backdrop-blur-xl p-10 rounded-3xl w-full max-w-md shadow-2xl border border-white/10"
                >
                    <h2  className="text-3xl font-bold mb-6 text-center text-foreground">
                        Create Account
                    </h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        {/* name */}
                        <div className="space-y-1">
                            <Input
                                placeholder="Name"
                                className="h-12 !text-lg px-5 rounded-xl bg-white/30 dark:bg-black/5 backdrop-blur-md text-foreground border-white/10"
                                {...register("name")}
                            />
                            {errors.name && <p className="text-destructive text-xs mt-1">{errors.name?.message}</p>}
                        </div>
                        
                        {/* email */}
                        <div className="space-y-1">
                            <Input
                                placeholder="Email"
                                className="h-12 !text-lg px-5 rounded-xl bg-white/30 dark:bg-black/5 backdrop-blur-md text-foreground border-white/10"
                                {...register("email")}
                            />
                            {errors.email && <p className="text-destructive text-xs mt-1">{errors.email?.message}</p>}
                        </div>

                        {/* pass */}
                        <div className="space-y-1">
                            <Input
                                type="password"
                                placeholder="Password"
                                className="h-12 !text-lg px-5 rounded-xl bg-white/30 dark:bg-black/5 backdrop-blur-md text-foreground border-white/10"
                                {...register("password")}
                            />
                            {errors.password && <p className="text-destructive text-xs mt-1">{errors.password?.message}</p>}
                        </div>

                        {/* Confirm pass */}
                        <div className="space-y-1">
                            <Input
                                type="password"
                                className="h-12 !text-lg px-5 rounded-xl bg-white/30 dark:bg-black/5 backdrop-blur-md text-foreground border-white/10"
                                placeholder="Confirm Password"
                                {...register("confirmPassword")}
                            />
                            {errors.confirmPassword && <p className="text-destructive text-xs mt-1">{errors.confirmPassword?.message}</p>}
                        </div>

                        <button 
                            disabled={isSubmitting}
                            className="w-full font-bold py-3 rounded-xl bg-primary text-primary-foreground transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg mt-4"
                        >
                            {isSubmitting ? "Loading..." : "Register"}
                        </button>
                    </form>
                    <p className="text-center text-md text-black/60 dark:text-muted-foreground mt-4">
                        Already have an account?{" "}
                    <Link to="/login" className="text-chart-2 font-medium hover:underline">
                        Login
                    </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Register;