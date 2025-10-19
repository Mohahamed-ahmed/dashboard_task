"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "@/lib/firebase"
import { useRouter } from "next/navigation";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { setUser } from "@/features/auth/authSlice";
import { UserState } from "@/features/auth/authSlice";

import Link from "next/link";

export default function LoginPage() {

    const dispatch = useDispatch<AppDispatch>();

    const router = useRouter();

	const email = React.useRef("");
	const password = React.useRef("");


	const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
        signInWithEmailAndPassword(auth, email.current, password.current)
        .then(async (userCredential) => {

			const user = userCredential.user;
            await user.reload();
            const updatedUser = auth.currentUser;
            console.log("User logged in:", updatedUser);
            const userData : UserState = {
                uid: updatedUser?.uid ?? null,
                email: updatedUser?.email ?? null,
                displayName: updatedUser?.displayName ?? null
            };
            dispatch(setUser(userData));
            router.push("/");
        }).catch((error) => {
			console.error("Login Error:", error.message);
		})
	};

	return (
		<div className="flex justify-center items-center min-h-screen bg-gray-100">
			<div className="lg:w-[40%] w-[90%] sm:w-[70%] md:w-[60%] bg-white rounded-lg shadow-lg flex flex-col justify-center items-center p-6">
				<h1 className="text-2xl my-4 font-bold">Welcome Back</h1>
				<form className="w-full p-4">
					<div className="mb-2">
						<Label htmlFor="email">Email</Label>
						<Input
							type="email"
							className="mt-2"
							placeholder="Enter your email"
							id="email"
							onChange={(e) => (email.current = e.target.value)}
						/>
					</div>
					<div className="mb-2">
						
						<Label htmlFor="password">Password</Label>
						<Input
							type="password"
							className="mt-2"
							placeholder="Enter your password"
							id="password"
							onChange={(e) =>
								(password.current = e.target.value)
							}
						/>
					</div>
					<Button
						onClick={handleSubmit}
						type="submit"
						className="text-white p-2 bg-emerald-500 rounded-lg transition-all duration-300 hover:bg-emerald-600 cursor-pointer w-full my-4 font-medium"
					>
                        Login
					</Button>
				</form>
                 <Link href="/auth/sign-up" className="text-sm text-blue-600 hover:underline">
                    Don't have an account? Sign up
                </Link>
			</div>
		</div>
	);
}
