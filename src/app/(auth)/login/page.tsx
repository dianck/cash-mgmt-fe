"use client"; // tambahkan ini

import FormLogin from "../../../components/form/login";

export default function Page() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="md:w-[30%] w-[90%]">
        <FormLogin />
      </div>
    </div>
  );
}
