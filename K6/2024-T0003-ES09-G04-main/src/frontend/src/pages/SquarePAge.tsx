import React, { useState } from 'react';
import SmallSquareButton from '../components/squareButton';
interface SquarePageProps {
  buttonText: string;
  questionText: string;
}

const SquarePage: React.FC<SquarePageProps> = ({ buttonText, questionText }) => {
  const buttonColors = ['#8D1900', '#BF2807', '#D6600A', '#EFA73B', '#FACC42', '#D7DF3E', '#CDDF3E', '#ACCF37', '#91AD35', '#3B6412'];
  const [resposta, setResposta] = useState("");

  const handleButtonClick = () => {
    // Coloque aqui o código que deseja executar quando o botão for clicado
    console.log('Botão clicado');
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center h-2/4 bg-gray-200 p-10 rounded-md">
        <p className="text-2xl font-semibold mb-10">{questionText}</p>
        
        <div className="grid grid-cols-10 gap-4">
          {/* Renderiza 10 botões pequenos quadrados com cores diferentes */}
          {buttonColors.map((color, index) => (
            <SmallSquareButton key={index} color={color} number={index + 1} />
          ))}
        </div>

        {/* Adicionando o input abaixo dos botões */}
        <label htmlFor="resposta" className="sr-only">
          Digite sua resposta
        </label>
        <input
          type="text"
          id="resposta"
          className="w-3/4 p-2 border rounded-md mb-10"
          placeholder="Digite sua resposta"
          value={resposta}
          onChange={(e) => setResposta(e.target.value)}
        />

        {/* Usando um botão ao invés de um link */}
        <button onClick={handleButtonClick} className="flex justify-center items-center mt-3 bg-orange-500 text-white w-1/2 py-2 rounded-md hover:bg-orange-600">
          Enviar
        </button>
      </div>
    </div>
  );
};

export default SquarePage;