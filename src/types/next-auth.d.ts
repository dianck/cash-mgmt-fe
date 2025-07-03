import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string; // 👈 Added this to match usage
      username?: string;
      email: string;
      avatar?: string;
      role?: string | null;    // tambahkan role di sini
      referralCode?: string | null;
      points?: string | null;
    };
    userToken?: string;
  }

  interface JWT {
    id: string;
    name: string; // 👈 Added this to match usage
    username?: string;
    email: string;
    avatar?: string;
    role?: string | null;     // juga di User (opsional)
    referralCode?: string | null;
    userToken?: string;
    points?: string | null;    
  }

  interface User {
    id: string;
    name: string; // 👈 Added this to match usage
    username?: string;
    email: string;
    avatar?: string;
    role?: string | null;     // juga di JWT
    referralCode?: string | null;
    userToken?: string;
    points?: string | null;
  }


}