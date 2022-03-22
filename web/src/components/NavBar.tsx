import { Box, Button, Flex, Link } from '@chakra-ui/react';
import React from 'react'
import NextLink from "next/link";
import { useWhoAmIQuery } from '../generated/graphql';

interface NavBarProps {

}

export const NavBar: React.FC<NavBarProps> = ({ }) => {
    const { data, loading } = useWhoAmIQuery();
    let body = null;

    if (loading) {
        //Can add loading bar?
    }
    else if (!data?.whoami) {
        body = (
            <>
                <NextLink href={"/login"}>
                    <Link mr={2} color={"white"} >Login</Link>
                </NextLink>
                <NextLink href={"/register"}>
                    <Link mr={2} color={"white"} >Register</Link>
                </NextLink>
            </>
        )
    } else {
        body = (
            <Box>
                Hi, {data.whoami.user_name}
                <Button ml={4}>Logout</Button>
            </Box>
        )

    }

    return (
        <Flex background={'red'} p={4}>
            <Box ml={"auto"}>
                {body}
            </Box>
        </Flex>
    );
}