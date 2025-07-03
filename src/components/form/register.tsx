"use client";

import axios from "@/lib/axios";
import { Field, Form, Formik, FormikHelpers, FormikProps, useFormikContext } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as yup from "yup";
// src/components/form/register.tsx

const RegisterSchema = yup.object().shape({
  username: yup.string().required("username is required"),
  email: yup
    .string()
    .required("email is required")
    .email("invalid email format"),
  password: yup
    .string()
    .required("password is required")
    .min(6, "min 6 character"),
  role: yup
    .string()
    .required("role is required"),
});

interface IRegisterForm {
  username: string;
  email: string;
  password: string;
  role: string;
  referralCode: string;
}

// Referral code validator component
const ReferralCodeValidator = ({
  validateReferralCode
}: {
  validateReferralCode: (code: string) => void;
}) => {
  const { values } = useFormikContext<IRegisterForm>();

  useEffect(() => {
    const timeout = setTimeout(() => {
      validateReferralCode(values.referralCode);
    }, 500); // debounce

    return () => clearTimeout(timeout);
  }, [values.referralCode, validateReferralCode]);

  return null;
};



export default function FormRegister() {

  const [roles, setRoles] = useState<string[]>([]);
  const [referralValid, setReferralValid] = useState<boolean | null>(null);
  const [referralChecking, setReferralChecking] = useState(false);
  const router = useRouter();
  // Validate referral code function


  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await axios.get("/auth/role");
        setRoles(res.data);
      } catch (err) {
        console.error("Failed to load roles:", err);
      }
    };

    fetchRoles();
  }, []);

  const initialValues: IRegisterForm = {
    username: "",
    email: "",
    password: "",
    role: "",
    referralCode: ""
  };

  const onRegister = async (
    value: IRegisterForm,
    action: FormikHelpers<IRegisterForm>
  ) => {
    try {
      if (referralValid === false) {
        toast.error("Referral code invalid");
        action.setSubmitting(false);
        return;
      }

      await axios.post("/auth/register", value);
      toast.success("Register successfully, please verify on your mailbox!");
      action.resetForm();
      router.push("/");

    } catch (err) {
      console.log(err);
      action.setSubmitting(false);
      toast.error("Register failed");
    }
  };    
  return (
    <div className="max-w-md mx-auto mt-8 p-4 border rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">Sign Up</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={RegisterSchema}
        onSubmit={(values, action) => {
          onRegister(values, action);
        }}
      >
        {(props: FormikProps<IRegisterForm>) => {
          const { touched, errors, isSubmitting } = props;

          return (
            <Form>

              <div className="flex flex-col">
                <label htmlFor="name" className="text-md">
                  Username
                </label>
                <Field
                  name="username"
                  type="text"
                  className="mb-2 p-2 border border-gray-600 rounded-md"
                />
                {touched.username && errors.username && (
                  <div className="text-red-500 text-[12px] -mt-2 mb-2">{errors.username}</div>
                )}
              </div>

              <div className="flex flex-col">
                <label htmlFor="email" className="text-md">
                  Email
                </label>
                <Field
                  name="email"
                  type="email"
                  className="mb-2 p-2 border border-gray-600 rounded-md"
                />
                {touched.email && errors.email && (
                  <div className="text-red-500 text-[12px] -mt-2 mb-2">{errors.email}</div>
                )}
              </div>

              <div className="flex flex-col">
                <label htmlFor="password" className="text-md">
                  Password
                </label>
                <Field
                  name="password"
                  type="password"
                  className="mb-2 p-2 border border-gray-600 rounded-md"
                />
                {touched.password && errors.password && (
                  <div className="text-red-500 text-[12px] -mt-2 mb-2">{errors.password}</div>
                )}
              </div>



              <div className="mt-12">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="py-1 px-2 w-full btn-foreground text-sm rounded-md"
                >
                  {isSubmitting ? "Loading ..." : "Sign up"}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );

}
