import { Button, 
  Flex, 
  Heading, 
  Input, 
  Link, 
  Text, 
  DialogRoot, 
  DialogTrigger, 
  DialogContent, 
  DialogHeader, 
  DialogBody, 
  DialogFooter, 
  DialogTitle, 
  DialogActionTrigger, 
  DialogCloseTrigger, 
  Portal, 
  DialogBackdrop, 
  DialogPositioner 
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom"
import type { FieldValues, SubmitHandler } from "react-hook-form";
import axios from "axios";

import type { IInputs } from "@/types/input";
import Form from './Form'
import api from "../api/axios";

export interface IData {
  nom: string,
  email: string,
  password_hash: string,
  vault_salt: string,
  role: string,
  is_verified: boolean,
  verify_token: string,
  reset_token: string,
  create_at: Date,
  update_at: Date
}

const SignInForm: React.FC = () => {
  const navigate = useNavigate();
    
  const fields: IInputs[] = [
    {
      name: "email",
      label: "email", // label pour l'accessibilité
      type: "email",
      placeHolder: "Email",
      validation: { required: "email requis" },
    },
    {
      name: "password",
      label: "password",
      type: "password",
      placeHolder: "Mot de passe",
      validation: { required: "mot de passe requis" },
    }
  ]

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      await api.post("http://localhost:3000/api/auth/login", data);
      console.log(data);
      alert("Votre compte a bien été crée");
      navigate("/login");
    } catch (error: unknown) {
      console.error(error);
      let errorMessage = "Une erreur est survenue lors de l'inscription";
      
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      alert(errorMessage);
    }
  };

  return (
    <Flex flexDir={"column"} justifyContent={"center"} alignItems={"center"}
      h={"550px"} w={"900px"}
      textAlign={"center"}
      bg={"#909E9660"}
      borderRadius={"20px"}>
      <Flex flexDir={"column"} justifyContent={"center"} alignItems={"center"} gap={8}>
        <Heading fontSize={"64px"} fontWeight={"700"}>
          sign in
        </Heading>

        <Text color={"black"} fontSize={"24px"}>
          Don't have an account ?
          <Link href="/register" ml={"5px"} color={"black"}
          _hover={{
                    textDecor: "none",
                    opacity: "100%",
                    color: "white"
                }}>
            Sign up
          </Link>
        </Text>
        <Form inputs={fields} onSubmit={onSubmit} submitLabel="Se connecter"/>

        <DialogRoot placement={"center"} size={"xl"}>
          <DialogTrigger asChild>
            <Button 
            bg={"transparent"}
            _hover={{
              color: "black"
            }}>
              Mot de passe oublié ?
            </Button>
          </DialogTrigger>

          <Portal>
            <DialogBackdrop />
            <DialogPositioner>              
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Récuperation de mot de passe</DialogTitle>
                </DialogHeader>

                <DialogBody>
                  <Input type="email" 
                        h={"80px"} w={"full"}
                        color={"black"} fontSize={"32px"}
                        bg={"#D9D9D9"}
                        borderColor={"#D9D9D9"} borderRadius={"20px"}
                        placeholder="entrez l'email de création de votre compte"
                        _placeholder={{
                            textAlign: "center",
                            color: "black"
                        }}/>
                </DialogBody>

                <DialogFooter>
                  <DialogActionTrigger asChild>
                        <Button color={"black"}
                        bg={"transparent"}
                        shadow={"lg"}
                        borderRadius={"full"}
                        _hover={{
                          shadow: "inner"
                        }}>
                          Annuler
                        </Button>
                  </DialogActionTrigger>
                  <Button color={"black"}
                        bg={"transparent"}
                        shadow={"lg"}
                        borderRadius={"full"}
                        _hover={{
                          shadow: "inner"
                        }}>
                          Envoyer
                        </Button>
                </DialogFooter>

                <DialogCloseTrigger />
              </DialogContent>
            </DialogPositioner>
          </Portal>
        </DialogRoot>
      </Flex>
    </Flex>
  );
};

export default SignInForm;
