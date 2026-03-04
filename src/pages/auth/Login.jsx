import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { loginSchema } from "../../validations/loginSchema";
import { useAuth } from "../../contexts/AuthContext";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || "/dashboard/cliente";

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    if (loading) return;

    setLoading(true);

    const toastId = toast.loading("Entrando...");

    try {
      const success = await login({
        email: data.email,
        password: data.senha,
      });

      if (success) {
        toast.success("Login realizado com sucesso!", { id: toastId });
        reset();
        navigate(from, { replace: true });
      } else {
        toast.error("Email ou senha inválidos.", { id: toastId });
      }
    } catch (error) {
      toast.error("Erro ao fazer login.", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <title>Entrar | Nwayami Store</title>

      <section className="w-full min-h-screen flex items-center justify-center bg-neutral-100 py-16 px-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 border border-neutral-200">
          {/* Ícone do carrinho */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 flex items-center justify-center bg-orange-500 text-white rounded-full text-3xl shadow-lg">
              <i className="fa-solid fa-cart-shopping"></i>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-neutral-800 mb-6 text-center">
            Entrar na Nwayami Store
          </h1>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            {/* Email */}
            <div className="relative">
              <label className="block mb-2 text-neutral-700 font-semibold">
                Email
              </label>
              <span className="absolute left-3 top-10 text-neutral-400">
                <i className="fa-solid fa-envelope"></i>
              </span>
              <input
                type="email"
                placeholder="seuemail@exemplo.com"
                className={`w-full pl-10 p-3 rounded-lg bg-neutral-100 text-neutral-900 focus:outline-none border ${
                  errors.email
                    ? "border-red-500"
                    : "border-neutral-300 focus:border-orange-500"
                } transition`}
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Senha */}
            <div className="relative">
              <label className="block mb-2 text-neutral-700 font-semibold">
                Senha
              </label>
              <span className="absolute left-3 top-10 text-neutral-400">
                <i className="fa-solid fa-lock"></i>
              </span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Digite sua senha"
                className={`w-full pl-10 pr-10 p-3 rounded-lg bg-neutral-100 text-neutral-900 focus:outline-none border ${
                  errors.senha
                    ? "border-red-500"
                    : "border-neutral-300 focus:border-orange-500"
                } transition`}
                {...register("senha")}
              />
              <span
                className="absolute right-3 top-10 text-neutral-400 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                <i
                  className={`fa-solid ${
                    showPassword ? "fa-eye-slash" : "fa-eye"
                  }`}
                ></i>
              </span>
              {errors.senha && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.senha.message}
                </p>
              )}
            </div>

            {/* Esqueceu a senha */}
            <div className="text-right">
              <Link
                to="/recuperar-senha"
                className="text-sm text-orange-500 hover:underline"
              >
                Esqueceu a senha?
              </Link>
            </div>

            {/* Botão */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 mt-2 rounded-xl font-bold transition text-white
              ${
                loading
                  ? "bg-orange-400 cursor-not-allowed opacity-70"
                  : "bg-orange-500 hover:bg-orange-600 cursor-pointer"
              }
            `}
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>

            {/* Link para registro */}
            <p className="mt-4 text-center text-sm text-neutral-600">
              Não tem uma conta?{" "}
              <Link
                to="/criar-conta"
                className="text-orange-500 font-semibold hover:underline"
              >
                Cadastre-se
              </Link>
            </p>
          </form>
        </div>
      </section>
    </>
  );
}
