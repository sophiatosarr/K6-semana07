import { useMutation, useQuery, useQueryClient } from 'react-query';
import axios from '../utils/axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiArrowLeft, FiClipboard } from 'react-icons/fi';

type Nps = {
    id: number;
    rating: number;
    answer: string;
    widgetId: number;
};

const fetchWidget = async (id: string) => {
    const { data } = await axios.get(`http://localhost:5244/widgets/${id}`);
    return data;
};

const WidgetPage = () => {
    const queryClient = useQueryClient();

    const { id = '' } = useParams<{ id: string }>();
    const { data: widget, isLoading, error } = useQuery(['widget', id], () => fetchWidget(id));

    const navigate = useNavigate();

    const deleteWidgetMutation = useMutation((widgetId: number) => {
        return axios.delete(`/widgets/${widgetId}`);
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('widgets');
            toast.success("Widget deletado com sucesso");
        },
        onError: () => {
            toast.error("Erro ao deletar widget");
        }
    });

    const handleDelete = (widgetId: number) => {
        if (window.confirm('Are you sure you want to delete this widget?')) {
            deleteWidgetMutation.mutate(widgetId);
            navigate('/');
        }
    };

    const handleEdit = (widgetId: number) => {
        console.log('Edit widget with id:', widgetId);
    };

    if (isLoading) return <div className='container mx-auto px-4 py-8 bg-[#F4F4F4]'>Loading...</div>;
    if (error instanceof Error) return <div className='container mx-auto px-4 py-8 bg-[#F4F4F4]'>An error has occurred: {error.message}</div>;

    return (
        <div className="container mx-auto px-4 py-8 bg-[#F4F4F4]">
            <div className="flex justify-between">
                <div className="flex items-center">
                    <FiArrowLeft onClick={() => window.history.back()} className="text-2xl cursor-pointer" />
                    <h1 className="text-2xl ml-2 font-semibold">Widget</h1>
                </div>

                <div>
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded-md"
                        onClick={() => handleDelete(widget.id)}
                    >
                        Delete
                    </button>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2"
                        onClick={() => handleEdit(widget.id)}
                    >
                        Edit
                    </button>
                </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between mt-4">
                <div className="w-full md:w-1/2 mr-4 space-y-4">
                    <p className="text-xl">Detalhes</p>

                    <div>
                        <p className="text-sm text-gray-500 uppercase tracking-wide">Título</p>
                        <p className='text-lg text-gray-900'>#{widget.id} {widget.title}</p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500 uppercase tracking-wide">Pergunta</p>
                        <p className='text-lg text-gray-900'>{widget.question}</p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500 uppercase tracking-wide">Link</p>
                        <p className='text-lg text-gray-900'>{widget.link}</p>
                    </div>
                </div>

                <div className="w-full md:w-1/2 mt-4 md:mt-0">
                    <p className="text-xl mr-2">
                        Preview
                    </p>

                    <div className="flex justify-center items-center bg-[#e2e2e2] p-4 rounded-md shadow-md">
                        <div
                            style={{ pointerEvents: 'none' }}
                            dangerouslySetInnerHTML={{ __html: widget.html }}
                            onDrop={(e) => { e.preventDefault(); return false; }}
                            onDragStart={(e) => { e.preventDefault(); return false; }}
                            onContextMenu={(e) => { e.preventDefault(); return false; }}
                        />
                    </div>
                    <p className="flex items-center text-sm text-gray-500 mt-2 hover:underline" onClick={
                        () => {
                            navigator.clipboard.writeText(widget.html);
                            toast.info("Código copiado com sucesso");
                        }
                    } title="Clique para copiar o código do widget">
                        <FiClipboard className="cursor-pointer" /> Clique aqui para copiar o código do widget
                    </p>
                </div>
            </div>

            <div className="mt-4">
                <span className="text-gray-600">NPS:
                    <span className='ml-2 text-2xl text-gray-900'>{parseFloat((widget.nps.reduce((acc: number, nps: Nps) => acc + nps.rating, 0) / widget.nps.length).toString()).toFixed(2)}</span></span>

                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Rating
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Answer
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {widget.nps.length === 0 && (
                            <tr className="bg-white text-center">
                                <td colSpan={2} className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    Nenhum NPS registrado
                                </td>
                            </tr>
                        )}

                        {widget.nps.map((nps: Nps) => (
                            <tr key={nps.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{nps.rating}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{nps.answer}</div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default WidgetPage;