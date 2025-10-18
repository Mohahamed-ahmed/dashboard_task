"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function SignUpPage() {

    const router = useRouter();
	
    const name = React.useRef("");
	const email = React.useRef("");
	const password = React.useRef("");
    


	const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		createUserWithEmailAndPassword(auth, email.current, password.current)
			.then(async(userCredential) => {
				
				const user = userCredential.user;
				await updateProfile(user, {
					displayName: name.current,
				});

                await user.reload();
                const updatedUser = auth.currentUser;

                console.log("User signed up:", updatedUser);
                router.push("/auth/login");
			})
			.catch((error) => {
				console.error("Signup Error:", error.message);
			});
		
	};

	return (
		<div className="flex justify-center items-center min-h-screen bg-gray-100">
			<div className="lg:w-[40%] w-[90%] sm:w-[70%] md:w-[60%] bg-white rounded-lg shadow-lg flex flex-col justify-center items-center p-6">
				<h1 className="text-2xl my-4 font-bold">Create an Account</h1>
				<form className="w-full p-4">
					<div className="mb-2">
						<Label htmlFor="name">Name</Label>
						<Input
							type="text"
							className="mt-2"
							placeholder="Enter your name"
							id="name"
							onChange={(e) => (name.current = e.target.value)}
						/>
					</div>
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
                        Sign Up
					</Button>
				</form>
			</div>
		</div>
	);
}
