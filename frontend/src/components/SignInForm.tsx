import {
  Button,
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
  DialogPositioner,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import type { FieldValues, SubmitHandler } from "react-hook-form";
import axios, { type AxiosResponse } from "axios";

import type { IInputs } from "@/types/input";
import Form from "./Form";
import api from "../api/axios";
import { useState } from "react";
import { useAuth } from '../hooks/UseAuth'
import { jwtDecode } from "jwt-decode";

const SignInForm: React.FC = () => {
  //Variable de navigation à travers les pages
  const navigate = useNavigate();
  const auth = useAuth()

  //Les inputs à soummettre à Form
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
    },
  ];

  const host = import.meta.env.VITE_HOST
  const port = import.meta.env.VITE_SERVER_PORT
  const urlLogin = import.meta.env.VITE_URL_LOGIN

  //Vérifications et connexion à travers un token
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {      
      const res: AxiosResponse = await api.post(`${urlLogin}`, data);
      localStorage.setItem('token', res.data.token)
      if (auth) {
        const decoded = jwtDecode<any>(res.data.token)
        auth.setUser(decoded)
      }
      alert("Votre compte a bien été validé");
      navigate("/home");
    } catch (error: unknown) {
      console.error(error);
      let errorMessage = "Une erreur est survenue lors de la connexion";

      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      alert(errorMessage);
    }
  };

  //Gestion de l'ouverture/fermeture de la boite de dialogue d'envoie de mail de reset
  const [open, setOpen] = useState<boolean>(false)

  const [email, setEmail] = useState<string>("")

  const urlRestPassword = import.meta.env.VITE_URL_RESETPASSWORD

  //Gestion de l'envoie d'un mail de reset de mot de passe
  const handleSendMail: SubmitHandler<FieldValues> = async () => {
    try {
      console.log(`http://${host}:${port}/${urlRestPassword}`);      
      await api.post(`http://${host}:${port}/${urlRestPassword}`, {email})
      console.log(email);
      alert('Mail de vérification envoyé ;)'); 
      setOpen(false)
      setEmail("")
    } catch (error: unknown) {
      console.error(error);
      let errorMessage = "Une erreur est survenue lors de l'envoi du mail";

      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || errorMessage
      } else if (error instanceof Error) {
        errorMessage = error.message
      }
      alert(errorMessage)
    }

  }

  return (
    <Flex
      flexDir={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      h={"550px"}
      w={"900px"}
      textAlign={"center"}
      bg={"#909E9660"}
      borderRadius={"20px"}
    >
      <Flex
        flexDir={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={8}
      >
        <Heading fontSize={"64px"} fontWeight={"700"}>
          sign in
        </Heading>

        <Text color={"black"} fontSize={"24px"}>
          Don't have an account ?
          <Link
            href="/register"
            ml={"5px"}
            color={"black"}
            _hover={{
              textDecor: "none",
              opacity: "100%",
              color: "white",
            }}
          >
            Sign up
          </Link>
        </Text>
        <Form inputs={fields} onSubmit={onSubmit} submitLabel="Se connecter" />

        <DialogRoot placement={"center"} size={"xl"} open={open} onOpenChange={(e) => setOpen(e.open)}>
          <DialogTrigger asChild>
            <Button
              bg={"transparent"}
              _hover={{
                color: "black",
              }}
            >
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
                  <Input
                    type="email"
                    h={"80px"}
                    w={"full"}
                    color={"black"}
                    fontSize={"32px"}
                    bg={"#D9D9D9"}
                    borderColor={"#D9D9D9"}
                    borderRadius={"20px"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="entrez l'email de création de votre compte"
                    _placeholder={{
                      textAlign: "center",
                      color: "black",
                    }}
                  />
                </DialogBody>

                <DialogFooter>
                  <DialogActionTrigger asChild>
                    <Button
                      color={"black"}
                      bg={"transparent"}
                      shadow={"lg"}
                      borderRadius={"full"}
                      _hover={{
                        shadow: "inner",
                      }}
                    >
                      Annuler
                    </Button>
                  </DialogActionTrigger>
                  <Button
                    color={"black"}
                    bg={"transparent"}
                    shadow={"lg"}
                    borderRadius={"full"}
                    _hover={{
                      shadow: "inner",
                    }}
                    onClick={handleSendMail}
                  >
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
