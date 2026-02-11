import { Text, Flex } from "@chakra-ui/react"

export interface IFooterProps {}

const Footer: React.FC<IFooterProps> = () =>{
    return (
        <Flex flexDir={"row"} justifyContent={"space-around"} w={"100%"}>
            <Text>Projet Hackaton 2026</Text>
            <Text>Sujet 1 - Gestionnaire mot de passe</Text>
            <Text>Nissrine - Léo - Belyamine - Nicolas</Text>
        </Flex>
    )
}

export default Footer