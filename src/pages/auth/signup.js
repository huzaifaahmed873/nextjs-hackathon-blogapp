import Form from "@/components/auth/form";
import { useRouter } from 'next/router';
export default function SignUp () {
    const router = useRouter();
    const onSubmit = async (fname,lname,email, password) => {
        try {
            const response = await fetch("/api/auth/signup", {
                method: "POST",
                body: JSON.stringify({fname,lname,email, password}),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response.ok) {
                router.push('/auth/login');
            }
        } catch (err) {
            console.error(err);
        }
        
    };
    return <Form signin={false} onFormSubmit={onSubmit} />
};
