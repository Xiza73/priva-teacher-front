import { useState } from "react";

type FormProps = {
  [key: string]: string;
};

export const useForm = <T extends FormProps>(intialForm: T) => {
  const [formState, setFormState] = useState<T>(intialForm);

  const handleInputChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleResetForm = () => setFormState(intialForm);

  return {
    formState,
    handleInputChange,
    handleResetForm,
  };
};
