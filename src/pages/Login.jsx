import React from 'react';
import * as z from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from '@/components/ui/input';
import { useNavigate } from "react-router";
import { useAuthStore } from '@/Store/zustand/useAuthStore';
import { Link } from "react-router";
import ThemeToggle from '@/components/ThemeToggle';

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
            <div  className="bg-card/50 backdrop-blur-xl p-10 rounded-3xl w-full max-w-md shadow-2xl border border-white/10">
                <h2  className="text-3xl font-bold mb-6 text-center text-foreground">
                    Login
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                    {/* Email */}
                    <div>
                    <Input
                        placeholder="Email"
                        className="h-12 !text-lg px-5 rounded-xl bg-white/30 dark:bg-black/5 backdrop-blur-md text-foreground border-white/10"
                        {...register("email")}
                    />
                    {errors.email && (
                        <p className="text-destructive text-xs mt-1">
                        {errors.email.message}
                        </p>
                    )}
                    </div>

                    {/* Password */}
                    <div>
                    <Input
                        type="password"
                        placeholder="Password"
                        className="h-12 !text-lg px-5 rounded-xl bg-white/30 dark:bg-black/5 backdrop-blur-md text-foreground border-white/10"
                        {...register("password")}
                    />
                    {errors.password && (
                        <p className="text-destructive text-xs mt-1">
                            {errors.password.message}
                        </p>
                    )}
                    </div>

                    {/* Error */}
                    {errors.root && (
                    <p className="text-destructive text-sm text-center">
                        {errors.root.message}
                    </p>
                    )}

                    <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full font-bold py-3 rounded-xl bg-primary text-primary-foreground transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg mt-4"
                    >
                        {isSubmitting ? "Loading..." : "Login"}
                    </button>
                </form>
                <p className="text-center text-md text-black/60 dark:text-muted-foreground mt-4">
                    Don’t have an account?{" "}
                    <Link to="/register" className="text-chart-2 font-medium hover:underline">
                        Create one
                    </Link>
                </p>
            </div>
        </div>
        </div>
    );
};

export default Login;
