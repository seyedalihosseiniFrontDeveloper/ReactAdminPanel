import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  Link,
  useNavigation,
  useRouteError,
  useSubmit,
} from "react-router-dom";
import { httpService } from "@core/http-service";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { t } = useTranslation();
  const routeErrors = useRouteError();
  const navigation = useNavigation();
  const isSubmitting = navigation.state !== "idle";

  const submitForm = useSubmit();
  const onSubmit = (data) => {
    submitForm(data, { method: "post" });
  };
  return (
    <>
      <div className="text-center mt-4">
        <h1 className="h2">{t("login.title")}</h1>
        <p className="lead">{t("login.introMessage")}</p>
        <p className="lead">
          {t("login.areNotRegistered")}
          <Link to="/register" className="me-2">
            {t("login.register")}{" "}
          </Link>
        </p>
      </div>

      <div className="card">
        <div className="card-body">
          <div className="m-sm-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label className="form-label">{t("login.mobile")}</label>
                <input
                  {...register("mobile", {
                    required: t("login.validation.mobileRequired"),
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
                      {t("login.validation.mobileLength")}
                    </p>
                  )}
              </div>
              <div className="mb-3">
                <label className="form-label">رمز عبور</label>
                <input
                  {...register("password", {
                    required: t("login.validation.passwordRequired"),
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
              <div className="text-center mt-3">
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="btn btn-lg btn-primary"
                >
                  {isSubmitting ? t("login.signingin") : t("login.signin")}
                </button>
              </div>
              {routeErrors && (
                <div className="alert alert-danger text-danger p-2 mt-3">
                  {routeErrors.response?.data.map((error, index) => (
                    <p key={index} className="mb-0">
                      {t(`login.validation.${error.code}`)}
                    </p>
                  ))}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export async function loginAction({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const response = await httpService.post("/Users/login", data);
  console.log(response, "response");
  //return response.status === 200;
}

export default Login;
