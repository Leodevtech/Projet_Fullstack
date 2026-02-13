import { Button, Input, Stack, Box, Text } from "@chakra-ui/react"

import type { IInputs } from "../types/input"
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form"

export interface IRegisterFormProps {inputs: IInputs[], onSubmit: SubmitHandler<FieldValues>, submitLabel: string}

const RegisterForm: React.FC<IRegisterFormProps> = ({inputs, onSubmit, submitLabel}) => {

    const {register, handleSubmit, formState: {errors}} = useForm()

    return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={8}>
            {
                inputs.map((i: IInputs) => {
                    const errorField = errors[i.name];
                    const errorMessage = errorField?.message as string | undefined;

                    return(
                        <Box key={i.name}>
                            <Input type={i.type} {...register(i.name, i.validation)}
                            h={"80px"} w={"690px"}
                            color={"black"} fontSize={"32px"}
                            bg={"#D9D9D9"}
                            borderColor={"#D9D9D9"} borderRadius={"20px"}
                            placeholder={i.placeHolder}
                            _placeholder={{
                                textAlign: "center",
                                color: "black"
                            }}/>
                            {errorMessage && (<Text as={"p"}>{errorMessage}</Text>)}
                        </Box>)
                })
            }
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
                {submitLabel}
            </Button>
        </Stack>
    </form>
    )
}

export default RegisterForm