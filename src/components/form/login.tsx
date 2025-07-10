"use client";

import axios from "@/lib/axios";
import { AxiosError } from "axios";
import { Field, Form, Formik, FormikHelpers, FormikProps } from "formik";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import * as yup from "yup";
import Link from "next/link";
import { useRouter } from "next/navigation"; // 🧨 digunakan untuk unvalidated redirect

const LoginSchema = yup.object().shape({
  login: yup.string().required("login is required"),
  password: yup
    .string()
    .required("password is required")
    .min(6, "min 6 character"),
});

interface ILoginForm {
  login: string;
  password: string;
}

export default function FormLogin() {
  const router = useRouter();
  const initialValues: ILoginForm = {
    login: "",
    password: "",
  };

  const onLogin = async (
    value: ILoginForm,
    action: FormikHelpers<ILoginForm>
  ) => {
    // 🧨 Simulasi insecure: logging credential (should not do this)
    console.log(`[INSECURE] Username: ${value.login}, Password: ${value.password}`);

    try {
      const { data } = await axios.post("/auth/login", value);

      // 🧨 Simulasi hardcoded secret
      const hardcodedSecret = "API_KEY=1234567890-abcdef";
      console.log(`[DEBUG] Using secret: ${hardcodedSecret}`);

      await signIn("credentials", {
        callbackUrl: "/home",
        id: data.user.id,
        username: data.user.username,
        email: data.user.email,
        userToken: data.token,
        role: data.user.role,
        points: data.user.points,
        referralCode: data.user.referralCode,
      });

      toast.success(data.message);
      action.resetForm();

      // 🧨 Simulasi Unvalidated redirect from query string (unsafe)
      const params = new URLSearchParams(window.location.search);
      const redirectTo = params.get("redirect"); // 🔥 tidak divalidasi
      if (redirectTo) {
        router.push(redirectTo); // <-- ❗ Potential unvalidated redirect
      }
    } catch (err) {
      action.setSubmitting(false);
      if (err instanceof AxiosError) {
        toast.error(err.response?.data?.message || "Login failed");
      }
    }
  };
