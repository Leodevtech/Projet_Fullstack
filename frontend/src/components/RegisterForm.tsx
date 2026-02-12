import { Button, Flex, Input, Stack } from "@chakra-ui/react"
import { useState } from "react"


export interface IData {
  nom: string,
  email: string,
  password_hash: string,
  vault_salt?: string,
  role: string,
  is_verified: boolean,
  verify_token: string,
  reset_token: string,
  create_at: Date,
  update_at: Date
}

const RegisterForm: React.FC = () => {

    const [nom, setNom] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [verifPassword, setVerifPassword] = useState<string>("")
    
    // function for form submit
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (password === verifPassword) {
            try {
                const res: Response = await api.post("/auth/register", )
                navigate("/home")
            } catch (err) {
                console.error('Erreur :', err);                
            }
        } else alert('Mots de passes ne sont pas identiques !')
    }

    return (
        <Flex justifyContent={"center"} alignItems={"center"}
        h={"550px"} w={"850px"}
        textAlign={"center"}
        bg={"#909E9660"}
        borderRadius={"20px"}>            
            <form onSubmit={handleSubmit}>
                <Stack gap={8}>
                    <Input type="text" onSubmit={(e) => setNom(e.target.value)}
                    h={"80px"} w={"690px"}
                    color={"black"} fontSize={"32px"}
                    bg={"#D9D9D9"}
                    borderColor={"#D9D9D9"} borderRadius={"20px"}
                    placeholder="nom complet"
                    _placeholder={{
                        textAlign: "center",
                        color: "black"
                    }}/>
                    <Input type="email" onSubmit={(e) => setEmail(e.target.value)}
                    h={"80px"} w={"690px"}
                    color={"black"} fontSize={"32px"}
                    bg={"#D9D9D9"}
                    borderColor={"#D9D9D9"} borderRadius={"20px"}
                    placeholder="email"
                    _placeholder={{
                        textAlign: "center",
                        color: "black"
                    }}/>
                    <Input type="password" onSubmit={(e) => setPassword(e.target.value)}
                    h={"80px"} w={"690px"}
                    color={"black"} fontSize={"32px"}
                    bg={"#D9D9D9"}
                    borderColor={"#D9D9D9"} borderRadius={"20px"}
                    placeholder="mot de passe"
                    _placeholder={{
                        textAlign: "center",
                        color: "black"
                    }}/>
                    <Input type="password" onSubmit={(e) => setVerifPassword(e.target.value)}
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