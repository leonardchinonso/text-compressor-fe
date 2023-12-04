type AlgorithmProps = {
  algorithm: string;
  onClick: () => void;
  disabled?: boolean;
};

/**
 * Renders an algorithm as a pill-shaped button.
 */
export const Algorithm: React.FC<AlgorithmProps> = ({
  algorithm,
  onClick,
  disabled = false,
}) => {
  return (
    <button
      onClick={() => onClick()}
      disabled={disabled}
      className={`border p-2 rounded-2xl ${
        !disabled ? 'cursor-pointer' : 'cursor-not-allowed'
      } ${disabled ? 'bg-black' : ''} ${disabled ? '' : 'hover:bg-gray-100 transition'}
      ${disabled ? 'text-white' : ''}`}
    >
      {algorithm}
    </button>
  );
};
