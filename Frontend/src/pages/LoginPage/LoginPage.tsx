import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";
import Phone from "../../components/AppForm/AppFormPhone";
import AppHeading from "../../components/UI/AppHeading/AppHeading";
import AppImage from "../../components/UI/AppImage/AppImage";
import AppButton from "../../components/UI/AppButton/AppButton";
import AppLink from "../../components/UI/AppLink/AppLink";
import { phoneValidation, passwordValidation } from "../../components/AppForm/Validation/AuthValidation";
import ErrorMessage from "../../components/AppForm/Validation/ErrorMessage";
import AppFormPassword from "../../components/AppForm/AppFormPassword";
import type { LoginPropsInput } from "../../types";
import styles from "./LoginPage.module.css";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { token, saveToken, saveUserInfo } = useAuth();

  const { register, handleSubmit, formState } = useForm<LoginPropsInput>({
    mode: "onChange",
  });

  const phoneError = formState.errors["phoneNumber"]?.message;
  const passwordError = formState.errors["password"]?.message;

  const onSubmit = async (data: LoginPropsInput) => {
    try {
      const cleanPhone = data.phoneNumber.replace(/\D/g, "");

      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phoneNumber: cleanPhone,
          password: data.password,
        }),
      });

      if (response.ok) {
        const result = await response.json();

        saveToken(result.token); // Из API приходит поле token
        saveUserInfo({
          id: result.id,
          fullName: result.fullName,
          phoneNumber: cleanPhone,
        });


        toast.success("Login successful!");
        navigate("/main");
      } else {
        const error = await response.json();
        toast.error(error.message || "Login failed");
      }
    } catch (e) {
      toast.error("Server error");
    }
  };

  React.useEffect(() => {
    if (token) {
      navigate("/main");
    }
  }, [token]);

  return (
    <div className={styles["registration-wrapper"]}>
      <AppLink href="/" className={styles["logo-link"]}>
        <AppImage src="/regLogo.svg" alt="logo" className={styles.logo} />
      </AppLink>

      <AppHeading className={styles.headingOne} level={1}>
        Log in to your account
      </AppHeading>
      <AppHeading className={styles.headingTwo} level={3}>
        Welcome back! Please enter your details.
      </AppHeading>

      <form className={styles["input-form"]} onSubmit={handleSubmit(onSubmit)}>
        <Phone {...register("phoneNumber", phoneValidation)} className={styles.phoneInput} />
        <ErrorMessage error={phoneError} className={styles["error-message"]} />

        <AppFormPassword
          label="Password"
          {...register("password", passwordValidation)}
          className={styles.passwordInput}
        />
        <ErrorMessage error={passwordError} className={styles["error-message"]} />

        <AppButton className={styles.getStarted} type="submit">
          <AppHeading level={3} className={styles["button-text"]}>
            Log In
          </AppHeading>
        </AppButton>
      </form>

      <div className={styles["login-text"]}>
        Already have an account?
        <AppLink href="/register" className={styles["login-link"]}>
          Sign Up
        </AppLink>
      </div>
    </div>
  );
};

export default LoginPage;
