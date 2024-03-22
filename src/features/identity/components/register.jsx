import logo from "@assets/images/logo.svg";
import { useForm } from "react-hook-form";
import {
  Link,
  useActionData,
  useNavigation,
  useSubmit,
  useNavigate,
  useRouteError,
} from "react-router-dom";
import { httpService } from "@core/http-service";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const submitForm = useSubmit();

  const onSubmit = (data) => {
    const { confirmPassword, ...userData } = data;
    submitForm(userData, {
      method: "post",
    });
  };
  const navigation = useNavigation();
  const isSubmitting = navigation.state !== "idle";

  const isSuccessOperation = useActionData();
  const navigate = useNavigate();

  const routeErrors = useRouteError();

  const { t } = useTranslation();

  useEffect(() => {
    if (isSuccessOperation) {
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  }, [isSuccessOperation]);
  return (
    <>
      <div className="text-center mt-4">
        <h1 className="h2">{t("register.title")}</h1>
        <p className="lead">{t("register.introMessage")}</p>
        <p className="lead">
          {t("register.alreadyRegistered")}
          <Link to="/login" className="me-2">
            {t("register.signin")}{" "}
          </Link>
        </p>
      </div>
      <div className="card">
        <div className="card-body">
          <div className="m-sm-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label className="form-label">{t("register.mobile")}</label>
                <input
                  {...register("mobile", {
                    required: t("register.validation.mobileRequired"),
                    minLength: 11,
                    maxLength: 11,
                  })}
                  className={`form-control form-control-lg ${
                    errors.mobile && "is-invalid"
                  }`}
                />
                {errors.mobile && errors.mobile.type === "required" && (
                  <p className="text-danger small fw-bolder mt-1">
                    {errors.mobile?.message}
                  </p>
                )}
                {errors.mobile &&
                  (errors.mobile.type === "minLength" ||
                    errors.type === "maxLength") && (
                    <p className="text-danger small fw-bolder mt-1">
                      {t("register.validation.mobileLength")}
                    </p>
                  )}
              </div>
              <div className="mb-3">
                <label className="form-label">{t("register.password")}</label>
                <input
                  {...register("password", {
                    required: t("register.validation.passwordRequired"),
                  })}
                  className={`form-control form-control-lg ${
                    errors.password && "is-invalid"
                  }`}
                  type="password"
                />
                {errors.password && errors.password.type === "required" && (
                  <p className="text-danger small fw-bolder mt-1">
                    {errors.password?.message}
                  </p>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">
                  {t("register.repeatPassword")}
                </label>
                <input
                  {...register("confirmPassword", {
                    required: t("register.validation.repeatPasswordRequired"),
                    validate: (value) => {
                      if (watch("password") !== value)
                        return t("register.validation.notMatching");
                    },
                  })}
                  className={`form-control form-control-lg ${
                    errors.confirmPassword && "is-invalid"
                  }`}
                  type="password"
                />
                {errors.confirmPassword &&
                  errors.confirmPassword.type === "required" && (
                    <o className="text-danger small fw-bolder mt-1">
                      {errors.confirmPassword?.message}
                    </o>
                  )}
                {errors.confirmPassword &&
                  errors.confirmPassword === "validate" && (
                    <p className="text-danger small sw-bolder mt-1">
                      {errors.confirmPassword?.message}
                    </p>
                  )}
              </div>
              <div className="text-center mt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-lg btn-primary"
                >
                  {isSubmitting ? t("register.saving") : t("register.register")}
                </button>
              </div>
              {isSuccessOperation && (
                <section className="alert alert-success text-success p-2 mt-3">
                  {t("register.successOperation")}
                </section>
              )}

              {routeErrors && (
                <section className="alert alert-danger text-danger p-2 mt-2">
                  {routeErrors.response?.data.map((error, index) => (
                    <p key={index} className="mb-0">
                      {error.description}
                    </p>
                  ))}
                </section>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
export async function registerAction({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const response = await httpService.post("/Users", data);
  return response.status === 200;
}
