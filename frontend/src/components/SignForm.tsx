import { Button, Flex, Heading, Input, Link, Stack, Text } from "@chakra-ui/react";

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
      <Flex flexDir={"column"} justifyContent={"center"} alignItems={"center"} gap={10}>
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
      </Flex>
    </Flex>
  );
};

export default SignInForm;
