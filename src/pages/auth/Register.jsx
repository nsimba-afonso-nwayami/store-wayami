import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { cadastrarSchema } from "../../validations/cadastrarSchema";
import { useAuth } from "../../contexts/AuthContext";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(cadastrarSchema),
  });

  const onSubmit = async (data) => {
    if (loading) return;

    setLoading(true);

    const toastId = toast.loading("Criando conta...");

    try {
      const success = await registerUser({
        username: data.nome,
        email: data.email,
        telefone: data.telefone,
        password: data.senha,
      });

      if (success) {
        toast.success("Conta criada com sucesso!", { id: toastId });
        reset();
        navigate("/login");
      } else {
        toast.error("Erro ao criar conta.", { id: toastId });
      }
    } catch (error) {
      toast.error("Erro inesperado.", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <title>Criar Conta | Nwayami Store</title>

      <section className="w-full min-h-screen flex items-center justify-center bg-neutral-100 py-16 px-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 border border-neutral-200">
          {/* Ícone */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 flex items-center justify-center bg-orange-500 text-white rounded-full text-3xl shadow-lg">
              <i className="fa-solid fa-cart-shopping"></i>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-neutral-800 mb-6 text-center">
            Criar uma conta
          </h1>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            {/* Nome */}
            <div>
              <label className="block mb-2 text-neutral-700 font-semibold">
                Nome Completo
              </label>
              <input
                type="text"
                placeholder="Seu nome completo"
                className={`w-full p-3 rounded-lg bg-neutral-100 border ${
                  errors.nome
                    ? "border-red-500"
                    : "border-neutral-300 focus:border-orange-500"
                } focus:outline-none transition`}
                {...register("nome")}
              />
              {errors.nome && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.nome.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block mb-2 text-neutral-700 font-semibold">
                Email
              </label>
              <input
                type="email"
                placeholder="seuemail@exemplo.com"
                className={`w-full p-3 rounded-lg bg-neutral-100 border ${
                  errors.email
                    ? "border-red-500"
                    : "border-neutral-300 focus:border-orange-500"
                } focus:outline-none transition`}
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Telefone */}
            <div>
              <label className="block mb-2 text-neutral-700 font-semibold">
                Telefone
              </label>
              <input
                type="tel"
                placeholder="923000000"
                className={`w-full p-3 rounded-lg bg-neutral-100 border ${
                  errors.telefone
                    ? "border-red-500"
                    : "border-neutral-300 focus:border-orange-500"
                } focus:outline-none transition`}
                {...register("telefone")}
              />
              {errors.telefone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.telefone.message}
                </p>
              )}
            </div>

            {/* Senha */}
            <div className="relative">
              <label className="block mb-2 text-neutral-700 font-semibold">
                Senha
              </label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Digite sua senha"
                className={`w-full p-3 pr-10 rounded-lg bg-neutral-100 border ${
                  errors.senha
                    ? "border-red-500"
                    : "border-neutral-300 focus:border-orange-500"
                } focus:outline-none transition`}
                {...register("senha")}
              />
              <span
                className="absolute right-3 top-11 text-neutral-400 cursor-pointer"
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

            {/* Confirmar Senha */}
            <div className="relative">
              <label className="block mb-2 text-neutral-700 font-semibold">
                Confirmar Senha
              </label>
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Repita sua senha"
                className={`w-full p-3 pr-10 rounded-lg bg-neutral-100 border ${
                  errors.confirmarSenha
                    ? "border-red-500"
                    : "border-neutral-300 focus:border-orange-500"
                } focus:outline-none transition`}
                {...register("confirmarSenha")}
              />
              <span
                className="absolute right-3 top-11 text-neutral-400 cursor-pointer"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                <i
                  className={`fa-solid ${
                    showConfirm ? "fa-eye-slash" : "fa-eye"
                  }`}
                ></i>
              </span>
              {errors.confirmarSenha && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmarSenha.message}
                </p>
              )}
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
              {loading ? "Criando conta..." : "Criar Conta"}
            </button>

            {/* Link login */}
            <p className="mt-4 text-center text-sm text-neutral-600">
              Já tem uma conta?{" "}
              <Link
                to="/login"
                className="text-orange-500 font-semibold hover:underline"
              >
                Entrar
              </Link>
            </p>
          </form>
        </div>
      </section>
    </>
  );
}
