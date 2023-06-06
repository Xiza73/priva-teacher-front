import { Title } from "@/components";
import { useAuth } from "@/context/auth";
import { useForm, useRouter } from "@/hooks";
import {
  Button,
  Container,
  FormControl,
  FormLabel,
  TextField,
} from "@mui/material";
import { useEffect } from "react";

export const Login: React.FC = () => {
  const { formState, handleInputChange } = useForm({
    username: "",
    password: "",
  });
  const { signIn, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  const fields: {
    label: string;
    name: keyof typeof formState;
    type: string;
  }[] = [
    {
      label: "Username",
      name: "username",
      type: "text",
    },
    {
      label: "Password",
      name: "password",
      type: "password",
    },
  ];

  const handleSubmit = () => {
    signIn(formState.username, formState.password);
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/admin");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) return null;

  if (isAuthenticated) return null;

  return (
    <Container className="h-screen flex justify-center items-start pt-[10%]">
      <FormControl className="flex justify-center items-center gap-2 px-5 pt-1 pb-6 bg-blue-200 shadow-blue-400 shadow-md rounded-md">
        <FormLabel>
          <Title>PrivaTeacher</Title>
        </FormLabel>
        {fields.map(({ label, name, type }) => (
          <TextField
            key={name}
            type={type}
            name={name}
            label={label}
            size="small"
            className="mb-5"
            value={formState[name]}
            onChange={handleInputChange}
          />
        ))}
        <Button variant="contained" onClick={() => handleSubmit()}>
          Sign In
        </Button>
      </FormControl>
    </Container>
  );
};
