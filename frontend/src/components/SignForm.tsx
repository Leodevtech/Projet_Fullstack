import { Button, Flex, Heading, Input, Link, Stack, Text, DialogRoot, DialogTrigger,DialogContent, DialogHeader, DialogBody, DialogFooter, DialogTitle, DialogActionTrigger, DialogCloseTrigger, Portal, DialogBackdrop, DialogPositioner } from "@chakra-ui/react";

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

  // function for form submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    window.location.href = "/home"
  }

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

        <form onSubmit={handleSubmit}>
          <Stack gap={8}>
            <Input
              type="email"
              h={"80px"}
              w={"690px"}
              color={"black"}
              fontSize={"32px"}
              bg={"#D9D9D9"}
              borderColor={"#D9D9D9"}
              borderRadius={"20px"}
              placeholder="email"
              _placeholder={{ textAlign: "center", color: "black" }}
            />

            <Input
              type="password"
              h={"80px"}
              w={"690px"}
              color={"black"}
              fontSize={"32px"}
              bg={"#D9D9D9"}
              borderColor={"#D9D9D9"}
              borderRadius={"20px"}
              placeholder="mot de passe"
              _placeholder={{ textAlign: "center", color: "black" }}
            />
          </Stack>

          <Button type="submit" display={"none"} bg={"transparent"}></Button>
        </form>
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
                        <Button 
                        bg={"transparent"}
                        shadow={"lg"}
                        borderRadius={"full"}
                        _hover={{
                          shadow: "inner"
                        }}>
                          Annuler
                        </Button>
                  </DialogActionTrigger>
                  <Button 
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
