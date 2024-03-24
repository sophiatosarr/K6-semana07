// main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AllWidgets from './pages/allWidgets.tsx'
import SquarePage from './pages/SquarePAge.tsx';
import Formulario from './pages/Formulario.tsx';
import './index.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from 'react-query'
import WidgetPage from './pages/Widget.tsx';

const queryClient = new QueryClient();

const Root = () => (
    <QueryClientProvider client={queryClient}>
        <React.StrictMode>
            <Router>
                <Routes>
                    {/* Rota padrão (página inicial) */}
                    <Route
                        path="/"
                        element={<AllWidgets />}
                    />

                    <Route 
                        path="/widget/:id"
                        element={<WidgetPage />}
                    />

                    {/* Restante das rotas */}
                    <Route
                        path="/pesquisa1"
                        element={<SquarePage buttonText="Próximo" questionText="Classifique a empresa x de 0 a 10?" />}
                    />
                    <Route
                        path="/formulario"
                        element={<Formulario />}
                    />
                </Routes>
            </Router>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </React.StrictMode>
    </QueryClientProvider>

);

ReactDOM.createRoot(document.getElementById('root')!).render(<Root />);
