import React from 'react';
import * as z from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from '@/components/ui/input';
import { useNavigate } from "react-router";
import { useAuthStore } from '@/Store/zustand/useAuthStore';

const loginSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(1, "Password is required"),
});

const Login = () => {
    const login = useAuthStore((state) => state.login);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = (data) => {
        const users = JSON.parse(localStorage.getItem("users")) || [];

        const user = users.find(
            (u) => u.email === data.email && u.password === data.password
        );

        if (!user) {
        setError("root", {
            message: "Invalid email or password",
        });
        return;
        }

        login(user);
        navigate("/");
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
            <div style={{ backgroundColor: 'var(--dark-surface)', opacity: 0.9 }} className="backdrop-blur-xl p-10 rounded-3xl w-full max-w-md shadow-2xl border border-white/10">

                <h2 style={{ color: 'var(--dark-text)' }} className="text-3xl font-bold mb-6 text-center">
                    Login
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                    {/* Email */}
                    <div>
                    <Input
                        placeholder="Email"
                        className="h-12 !text-lg px-5 rounded-xl"
                        style={{backgroundColor: 'rgba(255,255,255,0.05)',color: 'var(--dark-text)',borderColor: 'var(--dark-border)'}}
                        {...register("email")}
                    />
                    {errors.email && (
                        <p className="text-red-400 text-xs mt-1">
                        {errors.email.message}
                        </p>
                    )}
                    </div>

                    {/* Password */}
                    <div>
                    <Input
                        type="password"
                        placeholder="Password"
                        className="h-12 !text-lg px-5 rounded-xl"
                        style={{backgroundColor: 'rgba(255,255,255,0.05)', color: 'var(--dark-text)', borderColor: 'var(--dark-border)'}}
                        {...register("password")}
                    />
                    {errors.password && (
                        <p className="text-red-400 text-xs mt-1">
                            {errors.password.message}
                        </p>
                    )}
                    </div>

                    {/* Error */}
                    {errors.root && (
                    <p className="text-red-400 text-sm text-center">
                        {errors.root.message}
                    </p>
                    )}

                    <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{ backgroundColor: 'var(--primary)', color: '#191919' }}
                    className="w-full font-bold py-3 rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg mt-4"
                    >
                        {isSubmitting ? "Loading..." : "Login"}
                    </button>

                </form>
            </div>
        </div>
        </div>
    );
};

export default Login;