import React from "react";
import useAuth from "../../hooks/useAuth";

const QuizPlaySidebar = ({ data, participated }) => {
  const totalQuestion = data?.questions?.length;
  const remaining = totalQuestion - participated?.length;

  return (
    <div className="lg:col-span-1 bg-white rounded-md p-6 h-full flex flex-col">
      <div>
        <h2 className="text-4xl font-bold mb-4">{data?.title}</h2>
        <p className="text-gray-600 mb-4">{data?.description}</p>

        <div className="flex flex-col">
          <div className="w-fit bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full inline-block mb-2">
            Total number of questions : {data?.questions?.length}
          </div>

          <div className="w-fit bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full inline-block mb-2">
            Participation :{" "}
            {participated?.length === 0 ? 1 : participated?.length}
          </div>

          <div className="w-fit bg-gray-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full inline-block mb-2">
            Remaining : {remaining}
          </div>
        </div>
      </div>

      <Profile />
    </div>
  );
};

export default QuizPlaySidebar;

const Profile = () => {
  const { auth } = useAuth();
  return (
    <div className="mt-auto flex items-center">
      <img
        src="https://avatar.iran.liara.run/public/boy"
        alt={auth?.user?.full_name}
        className="w-10 h-10 rounded-full mr-3 object-cover"
      />
      <span className="text-black font-semibold">{auth?.user?.full_name}</span>
    </div>
  );
};
