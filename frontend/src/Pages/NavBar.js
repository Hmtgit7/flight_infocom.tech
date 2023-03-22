import {
    Box,
    Flex,
    Button,
    Show,
    HStack,
    Text,
} from "@chakra-ui/react";
import "./Navbar.css";
import { Link, useHistory } from "react-router-dom";


export default function NavBar() {
    const history = useHistory();
    const navigateHome = () => history.push('/')
    const navigateList = () => history.push('./lists')
    const navigateChat = () => history.push('./chatgpt')
    return (
        <div id="navFix">
            <Box
                bg={'azure'}
                px={9}
                width={["100%"]}
            >
                <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
                    <HStack w="42%">
                        <Show breakpoint="(min-width: 1000px)">
                            {" "}
                            <Text fontSize="4xl" fontFamily="Work sans-800">Flight Infocom</Text>
                        </Show>
                    </HStack>

                    <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
                        <HStack spacing={8} alignItems={"center"}>
                            <HStack
                                as={"nav"}
                                spacing={4}
                                display={{ base: "none", md: "flex" }}
                                id="myDIV"
                            >
                                <Button className="btnRes" onClick={navigateHome}>
                                        {" "}
                                        <b>Home</b>
                                </Button>

                                <Button className="btnRes" onClick={navigateList}>
                                    <Link to="/ListingPage">
                                        <b>List Page</b>
                                    </Link>
                                </Button>

                                <Button className="btnRes" onClick={navigateChat}>
                                        {" "}
                                        <b>Chat Page</b>
                                    
                                </Button>
                            </HStack>
                        </HStack>
                    </Flex>
                </Flex>
            </Box>
        </div>
    );
}