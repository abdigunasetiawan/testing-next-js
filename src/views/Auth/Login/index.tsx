import { useState } from "react";
import styles from "./Login.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

const LoginView = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const { push, query } = useRouter();
    const handleSubmit = async (event: any) => {
        setError("");
        setIsLoading(true);
        event.preventDefault();

        const callbackUrl: any = query.callbackUrl || "/";

        try {
            const res = await signIn("credentials", {
                redirect: false,
                email: event.target.email.value,
                password: event.target.password.value,
                callbackUrl,
            });

            if (!res?.error) {
                setIsLoading(false);
                push(callbackUrl);
            } else {
                setIsLoading(false);
                setError("Email or password is incorrect");
            }
        } catch (error: any) {
            setIsLoading(false);
            setError("Email or password is incorrect");
        }
    };
    return (
        <div className={styles.login}>
            <h1 className={styles.login__title}>Login</h1>
            {error && <p className={styles.login__error}>{error}</p>}
            <div className={styles.login__form}>
                <form onSubmit={handleSubmit}>
                    <div className={styles.login__form__item}>
                        <label htmlFor="email" className={styles.login__form__item__label}>
                            Email
                        </label>
                        <input type="email" id="email" name="email" placeholder="email" className={styles.login__form__item__input} />
                    </div>

                    <div className={styles.login__form__item}>
                        <label htmlFor="password" className={styles.login__form__item__label}>
                            Password
                        </label>
                        <input type="password" id="password" name="password" placeholder="password" className={styles.login__form__item__input} />
                    </div>
                    <button type="submit" className={styles.login__form__item__button} disabled={isLoading}>
                        {isLoading ? "Loading..." : "login"}
                    </button>
                </form>

                <button className={styles.login__form__item__google} onClick={() => signIn("google", { callbackUrl: "/", redirect: false })}>
                    Sign In With Google
                </button>
            </div>
            <p>
                Don't tHave an account? Sign up{" "}
                <Link className={styles.login__link} href="/auth/register">
                    here
                </Link>
            </p>
        </div>
    );
};

export default LoginView;
