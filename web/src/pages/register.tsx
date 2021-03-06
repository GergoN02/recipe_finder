import { Box, Button, useToast } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import { InputField } from '../components/InputField';
import { Wrapper } from '../components/Wrapper';
import { useRegisterMutation, WhoAmIDocument, WhoAmIQuery } from '../generated/graphql';
import { convertErrorMsg } from '../utils/convertErrorMsg';
import { withApollo } from '../utils/withApollo';

interface registerProps {

}

const Register: React.FC<registerProps> = ({ }) => {
    const router = useRouter();
    const [register] = useRegisterMutation();
    const toast = useToast();

    return (
        <Wrapper variant='small'>
            <Formik
                initialValues={{ email: "", username: "", password: "" }}
                onSubmit={async (values, { setErrors }) => {
                    const response = await register({
                        variables: values,
                        update: (caches, { data }) => {
                            caches.writeQuery<WhoAmIQuery>({
                                query: WhoAmIDocument,
                                data: {
                                    __typename: 'Query',
                                    whoami: data?.register.user,
                                }
                            })
                        }
                    });
                    if (response.data?.register.errors) {
                        setErrors(convertErrorMsg(response.data.register.errors));
                    } else if (response.data?.register.user) {
                        //Got User object in response
                        toast({
                            title: "Successful Registration",
                            status: "success",
                            duration: 3000,
                            isClosable: false
                        })
                        router.push("/");
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <InputField
                            name="username"
                            label="Username"
                        />
                        <Box mt={4}>
                            <InputField
                                name="email"
                                label="Email"
                            />
                        </Box>
                        <Box mt={4}>
                            <InputField
                                name="password"
                                label="Password"
                                type="password"
                            />
                        </Box>
                        <Button
                            mt={4}
                            type="submit"
                            isLoading={isSubmitting}
                            colorScheme="teal"
                        >
                            Register
                        </Button>
                    </Form>
                )}
            </Formik>
        </Wrapper>
    );
}

export default withApollo({ ssr: false })(Register);