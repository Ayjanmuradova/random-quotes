
interface FormErrorProps {
  id: string;
  error?: string | string[];
}

export function FormError({ id, error }: FormErrorProps) {
  if (!error) return null;

  const errorMessage = Array.isArray(error) ? error.join('; ') : error;

  return (
    <p id={id} className="text-sm text-red-500 font-medium mt-1">
      {errorMessage}
    </p>
  );
}