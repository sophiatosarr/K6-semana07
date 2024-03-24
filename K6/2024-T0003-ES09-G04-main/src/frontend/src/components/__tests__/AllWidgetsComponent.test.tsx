// src/components/__tests__/AllWidgetsComponent.test.tsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import AllWidgetsComponent from '../allWidgets';
import axios from '../../utils/axios';
import '@testing-library/jest-dom/extend-expect';

jest.mock('../../utils/axios');
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const wrapper: React.FC<React.PropsWithChildren<{}>> = ({ children }) => (
    <QueryClientProvider client={createTestQueryClient()}>{children}</QueryClientProvider>
  );
  

describe('AllWidgetsComponent', () => {
  it('renders without error', async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({
      data: [{ id: 1, name: 'Widget 1', link: 'http://link.to/widget1' }],
    });
    
    render(<AllWidgetsComponent />, { wrapper });
    
    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));
    expect(screen.getByText('Widget 1')).toBeTruthy();
  });

  // Adicione mais testes conforme necessário
});
