import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from '../utils/axios';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

interface NewWidget {
    name: string;
    link: string;
    question: string;
}

const Formulario = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data: NewWidget) => {
        try {
            const payload = {
                Title: data.name,
                Link: data.link,
                Question: data.question,
            };

            await axios.post('/widgets', payload).then((_) => {
                toast.success('Widget cadastrado com sucesso!');
                setTimeout(() => {
                    navigate('/');
                }, 1000);
            });
        } catch (error) {
            toast.error('Erro ao cadastrar widget');
            console.error(error.response?.data || error.message);
        }
    }


    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-1/2 bg-gray-200 p-8 rounded-xl">
          <div className="flex justify-center items-center">
            <p id="novo-widget" className="font-bold text-4xl mb-5">
              Novo Widget
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label
                htmlFor="pergunta1"
                className="block text-sm font-semibold mb-2"
              >
                Nome do Widget:
              </label>
              <input
                type="text"
                id="name"
                {...register("name", {
                  required: true,
                })}
                placeholder="Ex: Pesquisa de Satisfação"
                className="w-full p-2 border rounded"
              />
              {errors.name && (
                <p id="error-name" className="text-red-500 text-xs mt-1">
                  Campo obrigatório
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="pergunta2"
                className="block text-sm font-semibold mb-2"
              >
                Link do Widget:
              </label>
              <input
                type="text"
                id="link"
                {...register("link", {
                  required: true,
                })}
                placeholder="Ex: https://forms.gle/123456"
                className="w-full p-2 border rounded"
              />
              {errors.link && (
                <p id="error-link" className="text-red-500 text-xs mt-1">
                  Campo obrigatório
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="pergunta3"
                className="block text-sm font-semibold mb-2"
              >
                Pergunta para o usuário:
              </label>
              <input
                type="text"
                id="question"
                {...register("question", {
                  required: true,
                })}
                placeholder="Ex: Qual sua opinião sobre o produto?"
                className="w-full p-2 border rounded"
              />
              {errors.question && (
                <p id="error-question" className="text-red-500 text-xs mt-1">
                  Campo obrigatório
                </p>
              )}
            </div>

            <div className="flex justify-center items-center">
              <button
                type="submit"
                className="mt-4 bg-orange-500 text-white w-1/2 py-3 rounded-md hover:bg-orange-600"
              >
                Enviar
              </button>
            </div>
          </form>
        </div>
      </div>
    );
}

export default Formulario;