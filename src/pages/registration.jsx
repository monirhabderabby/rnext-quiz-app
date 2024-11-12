import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo-white.svg";
import colorFullLogo from "../assets/logo.svg";
import saly from "../assets/Saly-1.png";
import RegistrationForm from "../components/ui/registration-form";

const Registration = () => {
  return (
    <div className="bg-white text-gray-800 ">
      <div className="flex min-h-screen max-h-screen">
        <LeftSide />
        <RightSide />
      </div>
    </div>
  );
};

export default Registration;

const LeftSide = () => {
  return (
    <div class="hidden  lg:flex lg:w-1/2 bg-primary flex-col justify-between p-12  h-full fixed left-0 top-0">
      <div class="text-white">
        <img src={logo} class="h-8" />

        <img
          src={saly}
          alt="Illustration"
          class="mx-auto 2xl:ml-0 max-h-64  max-w-lg"
        />

        <h2 class="text-3xl font-bold mb-1">Sign Up Now</h2>
        <p class="text-xl mb-4 font-medium">Boost Your Learning Capabilities</p>
        <p class="mb-8 max-w-lg">
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
    <div class="fixed right-0 top-0 w-full h-full lg:w-1/2 flex items-start xl:items-center justify-center p-6 lg:p-8 xl:p-12 overflow-y-auto xl:overflow-hidden">
      <div class="w-full max-w-lg ">
        <h2 class="text-3xl font-bold mb-3 flex gap-2 items-center">
          <span>Welcome to</span>
          <img src={colorFullLogo} class="h-7" />
        </h2>
        <h1 class="text-4xl font-bold mb-6">Sign Up</h1>

        <RegistrationForm />

        <div class="mt-2 text-gray-400">
          <p class="text-center">
            Already have account ?{" "}
            <Link to="/login" class="text-primary">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
