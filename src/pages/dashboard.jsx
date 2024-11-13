import React from "react";
import { Outlet } from "react-router-dom";
import logo from "../assets/logo-white.svg";

const Dashboard = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex">
      <aside class="w-64 bg-primary p-6 flex flex-col">
        <div class="mb-10">
          <img src={logo} class="h-7" />
        </div>
        <nav class="flex-grow">
          <ul class="space-y-2">
            <li>
              <a
                href="#"
                class="block py-2 px-4 rounded-lg bg-buzzr-purple bg-white text-primary font-bold"
              >
                Quizzes
              </a>
            </li>

            <li>
              <a
                href="#"
                class="block py-2 px-4 rounded-lg text-gray-100 hover:bg-gray-100 hover:text-primary"
              >
                Settings
              </a>
            </li>

            <li>
              <a
                href="#"
                class="block py-2 px-4 rounded-lg text-gray-100 hover:bg-gray-100 hover:text-primary"
              >
                Manage Users
              </a>
            </li>

            <li>
              <a
                href="#"
                class="block py-2 px-4 rounded-lg text-gray-100 hover:bg-gray-100 hover:text-primary"
              >
                Manage Roles
              </a>
            </li>

            <li>
              <a
                href="#"
                class="block py-2 px-4 rounded-lg text-gray-100 hover:bg-gray-100 hover:text-primary"
              >
                Logout
              </a>
            </li>
          </ul>
        </nav>
        <Profile />
      </aside>
      <Outlet />
    </div>
  );
};

export default Dashboard;

const Profile = () => {
  return (
    <div class="mt-auto flex items-center">
      <img
        src="https://avatar.iran.liara.run/public/boy"
        alt="Mr Hasan"
        class="w-10 h-10 rounded-full mr-3 object-cover"
      />
      <span class="text-white font-semibold">Saad Hasan</span>
    </div>
  );
};
