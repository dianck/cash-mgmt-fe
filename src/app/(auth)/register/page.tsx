import FormRegister from "../../../components/form/register";

console.log("FormRegister:", FormRegister);

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
  description: "Register page ",
};

export default function Page() {
  console.log("Page component loaded");
  console.log("FormRegister:", FormRegister); // ulangi log
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="md:w-[30%] w-[90%]">
        {/* <h2 className="text-2xl font-bold mb-4">Sign Up</h2> */}
        <FormRegister />
      </div>
    </div>
  );
}
