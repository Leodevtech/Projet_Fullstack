import { Box, Button, Flex, Heading, HStack, Text } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import type { FieldValues, SubmitHandler } from "react-hook-form";
import api from "../api/axios";
import axios from "axios";

const Home: React.FC = () => {
    
    const navigate = useNavigate()

    //function for disconnect
    const handleClickDeco: SubmitHandler<FieldValues> = async () => {
        const token = localStorage.getItem("token")
        if (token) {
            try {
                await api.post("http://localhost:3000/api/auth/logout", {token})
                console.log(token);
                alert("Deconnexion en cours")               
                navigate("/")
            } catch (error: unknown) {
                console.error(error);
                let errorMessage = "Une erreur est survenue lors de la déconnexion";

                if (axios.isAxiosError(error)) {
                    errorMessage = error.response?.data?.message || errorMessage;
                } else if (error instanceof Error) {
                    errorMessage = error.message;
                }
                alert(errorMessage);
            }
        } else alert('Pas de compte connecté :/')
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
            onClick={handleClickDeco}>
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
                    <Heading>My Vault</Heading>
                    <Button bg={"#ffffff1c"} 
                    borderRadius={"10px"}
                    shadow={"lg"}
                    _hover={{
                        shadow: "inner"
                    }}>
                        + Add password
                    </Button>
                </Flex>
                <Flex direction={"column"} gap={2}
                w={"100%"} p={3}>
                    <Box>
                        <Heading>Welcome <span>Nom utilisateur</span></Heading>
                        <Text>You have <span>Nombre de mdp</span> passwords saved</Text>
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