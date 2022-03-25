import { useApolloClient } from '@apollo/client';
import { Box, Button, useToast } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import { InputField } from '../components/InputField';
import { Wrapper } from '../components/Wrapper';
import { useLoginMutation, useWhoAmIQuery, WhoAmIDocument, WhoAmIQuery } from '../generated/graphql';
import { convertErrorMsg } from '../utils/convertErrorMsg';
import { withApollo } from '../utils/withApollo';

interface loginProps {

}

const Login: React.FC<loginProps> = ({ }) => {
    const router = useRouter();
    const toast = useToast();
    const [login] = useLoginMutation();

    return (
        <Wrapper variant='small'>
            <Formik
                initialValues={{ username: "", password: "" }}
                onSubmit={async (values, { setErrors }) => {
                    const response = await login({
                        variables: values,
                        update: (caches, { data }) => { // Updating the cache for live reload
                            caches.writeQuery<WhoAmIQuery>({
                                query: WhoAmIDocument,
                                data: {
                                    __typename: "Query",
                                    whoami: data?.login.user,
                                }
                            })
                        }
                    });
                    if (response.data?.login.errors) {
                        setErrors(convertErrorMsg(response.data.login.errors));
                    } else if (response.data?.login.user) {
                        //Got User object in response
                        toast({
                            title: "Successful Login",
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
                            Login
                        </Button>
                    </Form>
                )}
            </Formik>
        </Wrapper>
    );
}

export default withApollo({ ssr: false })(Login);