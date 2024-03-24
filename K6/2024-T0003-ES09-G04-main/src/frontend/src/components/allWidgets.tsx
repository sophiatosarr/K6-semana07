import React, { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { FiEdit2, FiTrash2, FiMoreVertical, FiEye } from "react-icons/fi";
import { Link } from "react-router-dom";
import axios from "../utils/axios";
import { toast } from "react-toastify";
import { IconContext } from "react-icons/lib";
import { useNavigate } from "react-router-dom";

type Nps = {
    id: number;
    rating: number;
    answer: string;
    widgetId: number;
};

type Widget = {
    id: number;
    title: string;
    link: string;
    question: string;
    color: string;
    html: string;
    nps: Nps[];
};

export default function AllWidgetsComponent() {
    const queryClient = useQueryClient();

    const fetchWidgets = async () => {
        const { data } = await axios.get("http://localhost:5244/widgets");

        return data;
    };

    const { data: widgets, isLoading, error } = useQuery("widgets", fetchWidgets);

    const handleEdit = (widgetId: number) => {
        console.log("Edit widget with id:", widgetId);
    };

    const deleteWidgetMutation = useMutation(
        (widgetId: number) => {
            return axios.delete(`/widgets/${widgetId}`);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries("widgets");
                toast.success("Widget deletado com sucesso");
            },
            onError: () => {
                toast.error("Erro ao deletar widget");
            },
        }
    );

    const navigate = useNavigate();
    const handleLook = (widgetId: number) => {
        navigate(`/widget/${widgetId}`);
    };

    const handleDelete = (widgetId: number) => {
        if (window.confirm("Are you sure you want to delete this widget?")) {
            deleteWidgetMutation.mutate(widgetId);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 bg-[#F4F4F4]">
            <h1 className="text-2xl ml-2 font-semibold">Widgets</h1>
            <p className="ml-2">Aqui você encontra os widgets criados pelo sistema</p>
            <div className="flex justify-end">
                <Link id="buttonNew" to="/formulario" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center">
                    <span>Novo</span>
                    <svg
                        className="fill-current w-4 h-4 ml-2"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm1-13h-2v4H7v2h4v4h2v-4h4v-2h-4V7z" />
                    </svg>
                </Link>
            </div>
            <div className="mt-4">
                <div className="flex flex-col">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Nome do Widget
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Link do Widget
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Editar
                                                <span className="sr-only">Editar</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody id="widgets" className="bg-white divide-y divide-gray-200">
                                        {isLoading && (
                                            <tr className="bg-white text-center">
                                                <td id="loading" colSpan={3} className="flex bg-white w-fulpx-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M1 4H7V18H1z"><animate id="spinner_rQ7m" fill="freeze" attributeName="opacity" dur="0.75s" begin="0;spinner_2dMV.end-0.25s" values="1;.2"></animate></path><path d="M9 4H15V18H9z" opacity="0.4"><animate fill="freeze" attributeName="opacity" begin="spinner_rQ7m.begin+0.15s" dur="0.75s" values="1;.2"></animate></path><path d="M17 4H23V18H17z" opacity="0.3"><animate id="spinner_2dMV" fill="freeze" attributeName="opacity" begin="spinner_rQ7m.begin+0.3s" dur="0.75s" values="1;.2"></animate></path></svg>
                                                    Carregando...
                                                </td>
                                            </tr>
                                        )}
                                        {error && (
                                            <tr className="bg-white text-center">
                                                <td id="error" colSpan={3} className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    Erro ao carregar widgets
                                                </td>
                                            </tr>
                                        )}
                                        {widgets && [...widgets].reverse().map((widget: Widget) => (
                                            <tr key={widget.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {widget.title}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {widget.link}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button
                                                        onClick={() => handleEdit(widget.id)}
                                                        className="text-indigo-600 hover:text-indigo-900"
                                                    >
                                                        <div className="flex text-black space-x-2">
                                                            <IconContext.Provider value={{ className: "contactIcon" }}>
                                                                <FiEye onClick={() => handleLook(widget.id)} />
                                                                <FiEdit2 />
                                                                <FiTrash2 onClick={() => handleDelete(widget.id)} />
                                                                <FiMoreVertical />
                                                            </IconContext.Provider>
                                                        </div>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        {widgets && widgets.length === 0 && (
                                            <tr className="bg-white text-center">
                                                <td colSpan={3} className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    Nenhum widget encontrado, crie um novo! :D
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  );
}
