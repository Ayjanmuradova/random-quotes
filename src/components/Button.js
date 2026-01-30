export function Button({ onClick, disabled, children }) {

  return (
    <button
      className='bg-slate-800 p-2 mt-10 rounded-md hover:bg-slate-800/50
      disabled:bg-gray-400'
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}