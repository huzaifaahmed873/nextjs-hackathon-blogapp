import Form from "@/components/auth/form";
import { useRouter } from 'next/router';
import { signIn } from "next-auth/react";
// import { SignUp } from "../profile";

export default function SignIn () {
    const router = useRouter();
    const onSubmit = async (email, password) => {
        debugger
        const data = await signIn('credentials', {redirect: false, email, password});
        router.push('../profile');
        console.log(data);
    };
    return <Form signin={true} onFormSubmit={onSubmit} />
};
