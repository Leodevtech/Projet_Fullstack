import { Flex, Heading, Link, Text } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import api from "../api/axios";

import Form from '../components/Form'
import type { FieldValues, SubmitHandler } from "react-hook-form";
import type { IInputs } from "@/types/input";

const Register: React.FC = () => {

    const navigate = useNavigate();
    const fields: IInputs[] = [
        {
            name: "nom",
            label: "nom",
            type: "text",
            placeHolder: "Nom",
            validation: { required : "nom requis"}
        },
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
        {
            name: "confirmPassword",
            label: "confirmPassword",
            type: "password",
            placeHolder: "Confirmation mot de passe",
            validation: { required: "Confirmation du mot de passe requis" },
        },
    ];
  
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        try {
            await api.post("/auth/register", data);
            console.log(data);
            alert("Votre compte a bien été crée");
            navigate("/login");
        } catch (error: unknown) {
            console.error(error);
            alert(error.response?.data?.message);
        }
    };

    return (
        <Flex flexDir={"column"} justifyContent={"center"} alignItems={"center"} gap={2}
        color={"white"}>
            <Heading fontSize={"64px"} fontWeight={"700"}
            mb={"20px"}>
                Get started
            </Heading>
            <Flex justifyContent={"center"} alignItems={"center"}
            h={"550px"} w={"850px"}
            textAlign={"center"}
            bg={"#909E9660"}
            borderRadius={"20px"}>
                <Form inputs={fields} onSubmit={onSubmit} submitLabel="S'inscrire"/>
            </Flex>
            <Text fontSize={"24px"} opacity={"80%"}>Alredy have an account ?
                <Link href="/" 
                color={"white"} opacity={"80%"}
                ml={"5px"}
                _hover={{
                    textDecor: "none",
                    opacity: "100%",
                    color: "black"
                }}>
                    Sign in
                </Link>
            </Text>
        </Flex>
    )
}

export default Register