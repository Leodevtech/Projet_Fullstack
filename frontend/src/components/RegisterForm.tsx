import { Button, Flex, Input, Stack } from "@chakra-ui/react"

const RegisterForm: React.FC = () => {
    
    // function for form submit
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        window.location.href="/home"
    }

    return (
        <Flex justifyContent={"center"} alignItems={"center"}
        h={"550px"} w={"850px"}
        textAlign={"center"}
        bg={"#909E9660"}
        borderRadius={"20px"}>            
            <form onSubmit={handleSubmit}>
                <Stack gap={8}>
                    <Input type="text" 
                    h={"80px"} w={"690px"}
                    color={"black"} fontSize={"32px"}
                    bg={"#D9D9D9"}
                    borderColor={"#D9D9D9"} borderRadius={"20px"}
                    placeholder="nom complet"
                    _placeholder={{
                        textAlign: "center",
                        color: "black"
                    }}/>
                    <Input type="email" 
                    h={"80px"} w={"690px"}
                    color={"black"} fontSize={"32px"}
                    bg={"#D9D9D9"}
                    borderColor={"#D9D9D9"} borderRadius={"20px"}
                    placeholder="email"
                    _placeholder={{
                        textAlign: "center",
                        color: "black"
                    }}/>
                    <Input type="password"
                    h={"80px"} w={"690px"}
                    color={"black"} fontSize={"32px"}
                    bg={"#D9D9D9"}
                    borderColor={"#D9D9D9"} borderRadius={"20px"}
                    placeholder="mot de passe"
                    _placeholder={{
                        textAlign: "center",
                        color: "black"
                    }}/>
                    <Input type="password"
                    h={"80px"} w={"690px"}
                    color={"black"} fontSize={"32px"}
                    bg={"#D9D9D9"}
                    borderColor={"#D9D9D9"} borderRadius={"20px"}
                    placeholder="confirmer mot de passe"
                    _placeholder={{
                        textAlign: "center",
                        color: "black"
                    }}/>
                    <Button type="submit"
                    fontSize={"40px"} fontWeight={"700"}
                    bg={"transparent"}
                    _focusVisible={{
                        outline: "solid 2px #fcff64",
                        borderRadius: "full"
                    }}
                    _hover={{
                        color: "#ffffff9f"
                    }}>
                        Create account
                    </Button>
                </Stack>
            </form>
        </Flex>
    )
}

export default RegisterForm