import { Flex, Heading, Link, Text } from "@chakra-ui/react"

import RegisterForm from '../components/RegisterForm'

export type IRegisterProps = unknown

const Register: React.FC<IRegisterProps> = () => {
    return (
        <Flex flexDir={"column"} justifyContent={"center"} alignItems={"center"} gap={2}
        color={"white"}>
            <Heading fontSize={"64px"} fontWeight={"700"}
            mb={"20px"}>
                Get started
            </Heading>
            <RegisterForm />
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