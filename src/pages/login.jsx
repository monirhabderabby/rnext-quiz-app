import React from "react";
import { Link } from "react-router-dom";
import saly from "../assets/Saly-1.png";
import logo from "../assets/logo.svg";
import LoginForm from "../components/ui/login-form";

const Login = () => {
  return (
    <div className="bg-white text-gray-800 overflow-hidden">
      <div className="flex min-h-screen">
        <LeftSide />
        <RightSide />
      </div>
    </div>
  );
};

export default Login;

const LeftSide = () => {
  return (
    <div class="hidden lg:flex lg:w-1/2 bg-primary flex-col justify-between p-12 relative">
      <div class="text-white">
        <img src={saly} alt="Illustration" class="mx-auto" />

        <h2 class="text-3xl font-bold mb-4">Sign in Now</h2>
        <p class="text-xl mb-4">Boost Your Learning Capabilities</p>
        <p class="mb-8">
          Logging in unlocks your personal progress tracker, letting you
          evaluate your performance and see how you stack up against others.
          Whether you're preparing for exams, improving your knowledge, or
          simply having fun, there's no better way to sharpen your mind.
        </p>
      </div>
    </div>
  );
};

const RightSide = () => {
  return (
    <div class="w-full lg:w-1/2 flex items-center justify-center p-12">
      <div class="w-full max-w-md">
        <h2 class="text-3xl font-bold mb-8 flex gap-2 items-center">
          <span>Welcome to</span>
          <img src={logo} class="h-7" />
        </h2>
        <h1 class="text-5xl font-bold mb-8">Sign in</h1>

        <LoginForm />

        <div class="text-center">
          <a href="#" class="text-primary">
            Forgot Password
          </a>
        </div>

        <div class="mt-8">
          <p class="text-center">
            No Account ?{" "}
            <Link to="/registration" class="text-primary">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
