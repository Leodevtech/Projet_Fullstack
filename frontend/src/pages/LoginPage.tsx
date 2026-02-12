import { Box, Flex, Text, Heading, Link, Image } from "@chakra-ui/react"

import  InstaIcon  from '../assets/instaLogo.png'
import FbLogo from '../assets/fbLogo.png'
import XLogo from '../assets/xLogo.png'

import SignInForm from "../components/SignForm"

const Login: React.FC = () => {
    return(
        <Flex justifyContent={"center"} alignItems={"center"} gap={10}
        color={"white"}
        m={8}>
            <Flex id="links"
            flexDir={"column"} justifyContent={"center"} alignItems={"center"} gap={"20px"}
            h={"500px"} w={"760px"}>
                <Box>
                    <Heading fontSize={"64px"} fontWeight={"700"}>Welcome back</Heading>
                </Box>
                <Box mt={"20px"}>
                    <Text fontSize={"32px"}>Or continue with</Text>
                </Box>
                <Flex gap={10}>
                    <Link href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"
                    bg={"transparent"} 
                    _focus={{
                        outline: "2px solid #fcff64",
                        borderRadius: "full"
                    }}>
                        <Image src={InstaIcon} h={"80px"} w={"80px"}/>
                    </Link>
                    <Link href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"
                    mr={"20px"}
                    bg={"transparent"}
                    _focus={{
                        outline: "2px solid #fcff64",
                        borderRadius: "full"
                    }}>
                        <Image src={FbLogo} h={"48px"} w={"48px"}/>
                    </Link>
                    <Link href="https://x.com/" target="_blank" rel="noopener noreferrer"
                    mr={"20px"}
                    bg={"transparent"}
                    _focus={{
                        outline: "2px solid #fcff64",
                        borderRadius: "full"
                    }}>
                        <Image src={XLogo} h={"48px"} w={"48px"}/>
                    </Link>
                </Flex>
            </Flex>
            <Box>
                <SignInForm />
            </Box>
        </Flex>
    )
}

export default Login