import { Box, 
    Button, 
    Input, 
    DialogBackdrop, 
    DialogBody, 
    DialogContent, 
    DialogHeader, 
    DialogPositioner, 
    DialogRoot, 
    DialogTitle, 
    DialogTrigger, 
    Flex, 
    Heading, 
    HStack, 
    Portal, 
    Stack, 
    Text, 
    DialogFooter,
    DialogActionTrigger,
    DialogCloseTrigger,
    Center,
    Spinner} from "@chakra-ui/react"
import {useAuth} from '../hooks/UseAuth'
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import   { type FieldValues, type SubmitHandler, useForm} from "react-hook-form"
import api from "../api/axios";
import axios from "axios";

const Home: React.FC = () => {

    const auth = useAuth()
    const navigate = useNavigate()

    const { register, handleSubmit, reset } = useForm();

    //Gestion ouverture/fermeture boite de dialogue ajout de mot de passe
    const [open, setOpen] = useState<boolean>(false)

    if (!auth) {
        return (
        <Center h={"100vh"}>
            <Text>Erreur de chargement</Text>
        </Center>
        )
    }

    //Gestion de l'utilisateur grace a son token
    const { user, logout, loading} = auth

    if (loading) {
        return (
            <Center h="100vh" w="100vw" bg="gray.800">
                <Spinner color="white" size="xl" />
                <Text ml={4} color="white">Chargement du coffre-fort...</Text>
            </Center>
        );
    }

    const LogoutAndRedirect = () => {
        logout()
        navigate('/')
    }


    const urlAddPassword = import.meta.env.VITE_URL_ADDPASSWORD

    //Gestion des roles des differents utilisateurs
    const role = (roleValue: string | undefined) => {
        if (roleValue) {
            switch (roleValue) {
                case "ADMIN":
                    return <Text as={"span"} color={"#31fc08"} border={"#31fc08 solid 1px"} borderRadius={"full"} px={"5px"} py={"3px"}>administrateur</Text>
                case "MODERATOR":
                    return <Text as={"span"} color={"#31fc08"} border={"#31fc08 solid 1px"} borderRadius={"full"} px={"5px"} py={"3px"}>modérateur</Text>
                default: 
                    return <Text as={"span"} color={"#fccf08"} border={"#fccf08 solid 1px"} borderRadius={"full"} px={"5px"} py={"3px"}>utilisateur</Text>
            }
        }
        return <Text as={"span"} color={"#fccf08"} border={"#fccf08 solid 1px"} borderRadius={"full"} px={"5px"} py={"3px"}>utilisateur</Text>
    }

    //Envoie du mot de passe au backend pour chiffrage 
    const onSubmitAddPassword: SubmitHandler<FieldValues> = async (data) => {
        try {
            await api.post(`${urlAddPassword}`, data)
            console.log(data);
            alert("Votre mot de passe à bien été ajouté à votre coffre-fort")
            setOpen(false)
            reset()
        } catch (error: unknown) {
            console.error(error);
      let errorMessage = "Une erreur est survenue lors de l'ajout de votre mot de passe'";

      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      alert(errorMessage);
        }
    }

    return (
        <Flex justifyContent={"center"} alignItems={"center"}
        h={"100%"} w={"100%"}
        color={"#ffffffe8"}>
            <Button 
            fontWeight={500}
            position={"absolute"} right={0} top={0}
            bg={"transparent"}
            shadow={"lg"}
            _hover={{
                shadow: "inner"
            }}
            onClick={LogoutAndRedirect}>
                Déconnexion
            </Button>
            <Flex direction={"column"} alignItems={"center"}
            h={"fit-content"} minW={"500px"}
            bg={"#ffffff71"}
            borderRadius={"20px"}>
                <Flex justifyContent={'space-between'} alignItems={"center"}
                w={"100%"}
                py={3} px={5}
                borderBottom={"#020061 2px solid"}>
                    <Heading>Votre coffre-fort</Heading>
                    <DialogRoot placement={"center"} size={"xl"} open={open} onOpenChange={(e) => setOpen(e.open)}>
                        <DialogTrigger asChild>
                            <Button bg={"#ffffff1c"} 
                            borderRadius={"10px"}
                            shadow={"lg"}
                            _hover={{
                                shadow: "inner"
                            }}>
                                + Ajouter
                            </Button>
                        </DialogTrigger>

                        <Portal>
                            <DialogBackdrop/>
                            <DialogPositioner>
                                <DialogContent>
                                    <form onSubmit={handleSubmit(onSubmitAddPassword)}>
                                        <DialogHeader>
                                            <DialogTitle>Ajouter un mot de passe</DialogTitle>
                                        </DialogHeader>

                                        <DialogBody>
                                            <Stack gap={8}>

                                                <Input 
                                                {...register("service", {required: true})}
                                                type="text"
                                                h={"80px"} w={"690px"}
                                                color={"black"} fontSize={"32px"}
                                                bg={"#D9D9D9"}
                                                borderColor={"#D9D9D9"} borderRadius={"20px"}
                                                placeholder={"site"}
                                                _placeholder={{
                                                    textAlign: "center",
                                                    color: "black"
                                                }}/>

                                                <Input 
                                                {...register("username", {required: true})}
                                                type="email"
                                                h={"80px"} w={"690px"}
                                                color={"black"} fontSize={"32px"}
                                                bg={"#D9D9D9"}
                                                borderColor={"#D9D9D9"} borderRadius={"20px"}
                                                placeholder={"email pour le site"}
                                                _placeholder={{
                                                    textAlign: "center",
                                                    color: "black"
                                                }}/>

                                                <Input 
                                                {...register("password", {required: true})}
                                                type="password"
                                                h={"80px"} w={"690px"}
                                                color={"black"} fontSize={"32px"}
                                                bg={"#D9D9D9"}
                                                borderColor={"#D9D9D9"} borderRadius={"20px"}
                                                placeholder={"mot de passe"}
                                                _placeholder={{
                                                    textAlign: "center",
                                                    color: "black"
                                                }}/>

                                            </Stack>
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
                                            type="submit"
                                            color={"black"}
                                            bg={"transparent"}
                                            shadow={"lg"}
                                            borderRadius={"full"}
                                            _hover={{
                                            shadow: "inner",
                                            }}
                                            >
                                            Ajouter
                                        </Button>
                                        </DialogFooter>
                                    </form>
                                    <DialogCloseTrigger />
                                </DialogContent>
                            </DialogPositioner>
                        </Portal>
                    </DialogRoot>
                </Flex>
                <Flex direction={"column"} gap={2}
                w={"100%"} p={3}>
                    <Box>
                        <Heading>Bienvenu {role(user?.role)}</Heading>
                        <Text>Voici le contenu de votre coffre</Text>
                    </Box>

                    <Flex direction={"column"}>
                        <Flex justifyContent={"space-between"} alignItems={"center"}
                        w={"100%"} 
                        p={"10px"} mb={"10px"}
                        color={"black"} fontWeight={"500"}
                        bg={"#D9D9D9"}
                        borderRadius={"10px"}
                        shadow={"lg"} >
                            <span>pour chaque mdp</span>    
                            <HStack>
                                <Button
                                color={"black"} 
                                bg={"#ffffff85"}
                                shadow={"lg"}
                                _hover={{
                                    shadow: "inner"
                                }}>
                                    <span>voir</span>
                                </Button>
                                <Button
                                color={"black"} 
                                bg={"#ffffff85"}
                                shadow={"lg"}
                                _hover={{
                                    shadow: "inner"
                                }}>
                                    <span>supprimer</span>
                                </Button>
                            </HStack>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default Home