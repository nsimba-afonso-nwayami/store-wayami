import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { recuperarSenhaSchema } from "../../validations/recuperarSenhaSchema";

export default function RecuperarSenha() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(recuperarSenhaSchema),
  });

  const onSubmit = async (data) => {
    const toastId = toast.loading("Enviando link de recuperação...");

    try {
      // Simulação de envio para API
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success("Link de recuperação enviado para o seu email!", {
        id: toastId,
      });
      reset();
    } catch (error) {
      toast.error("Erro ao enviar o link.", { id: toastId });
    }
  };

  return (
    <>
      <title>Recuperar Senha | Nwayami Store</title>

      <section className="w-full min-h-screen flex items-center justify-center bg-neutral-100 py-16 px-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 border border-neutral-200">
          {/* Ícone */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 flex items-center justify-center bg-orange-500 text-white rounded-full text-3xl shadow-lg">
              <i className="fa-solid fa-key"></i>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-neutral-800 mb-4 text-center">
            Recuperar Senha
          </h1>

          <p className="text-sm text-neutral-500 text-center mb-6">
            Digite o seu email e enviaremos um link para redefinir sua senha.
          </p>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
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

            {/* Botão */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl font-bold bg-orange-500 hover:bg-orange-600 transition cursor-pointer text-white"
            >
              Enviar link de recuperação
            </button>

            {/* Voltar para login */}
            <p className="mt-4 text-center text-sm text-neutral-600">
              Lembrou da senha?{" "}
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
