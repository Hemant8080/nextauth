"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      await axios.post("/api/users/signup", user); // Added `/` to the path
      router.push("/login");
      toast.success("Signup successful! Redirecting to login page.");
    } catch (error: any) {
      console.log("Signup failed", error);
      if (error.response && error.response.data) {
        toast.error(`Signup failed: ${error.response.data.error}`); // Display error from the API response
      } else {
        toast.error("Signup failed. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-2">
      <h1 className="text-2xl font-bold mb-4">{loading ? "Processing..." : "Signup"}</h1>
      <hr className="mb-4 w-full max-w-md" />

      <label htmlFor="email" className="mb-2">Email</label>
      <input
        type="email"
        id="email"
        className="mb-4 p-2 border rounded-md w-full max-w-md text-black"
        placeholder="Enter your email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />

      <label htmlFor="username" className="mb-2">Username</label>
      <input
        type="text"
        id="username"
        className="mb-4 p-2 border rounded-md w-full text-black max-w-md"
        placeholder="Enter your username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />

      <label htmlFor="password" className="mb-2">Password</label>
      <input
        type="password"
        id="password"
        className="mb-4 p-2 border rounded-md w-full text-black max-w-md"
        placeholder="Enter your password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />

      <button
        className={`px-4 py-2 rounded-md text-white ${buttonDisabled ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"}`}
        onClick={onSignup}
        disabled={buttonDisabled}
      >
        {loading ? "Processing..." : buttonDisabled ? "No signup" : "Signup"}
      </button>

      <Link href={"/login"} className="mt-4 text-blue-500 hover:underline">
        Visit login page
      </Link>
    </div>
  );
}
