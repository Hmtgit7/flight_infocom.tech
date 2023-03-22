import {
    Box,
    Container,
    Text
} from "@chakra-ui/react";
import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import React from 'react'
import { useState } from "react";
import { Center } from '@chakra-ui/react'
import axios from "axios";

const HomePage = () => {
    const [User, setUser] = useState({ flightNumber: '', airline: '', destination: '', departureTime: '', terminal: '', gateNumber: '', })
    let name, value;

    const handleInputs = (e) => {

        value = e.target.value;
        name = e.target.name;

        setUser({ ...User, [name]: value });
    }

    const handleCancel = (e) => {
        e.preventDefault();
        setUser({ flightNumber: '', airline: '', destination: '', departureTime: '', terminal: '', gateNumber: '', })
    }

    const PostData = async (e) => {
        e.preventDefault();
        const { flightNumber, airline, destination, departureTime, terminal, gateNumber } = User;
        const res = await fetch('/home', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ flightNumber, airline, destination, departureTime, terminal, gateNumber })
        })
        const data = await res.json();

        if (data.status === 422 || !data) {
            window.alert("Invalid")
            console.log("Invalid")
        }
        else {
            window.alert(" Data Added Success")
            console.log("Success Added Success")
        }
    }


    return (
        <Container maxW="xl" centerContent>
            <Box
                d="flex"
                justifyContent="center"
                p={3}
                bg="white"
                w="100%"
                m="40px 0 15px 0"
                style={{ marginTop: 30 }}
                borderRadius="lg"
                borderWidth="1px"
                boxShadow={'1 1 10px 1px white, 0 1px 1px azure'}
            >
                <Text fontSize="4xl" fontFamily="Work sans-800">
                    <Center> Flight Infocom</Center>
                </Text>
            </Box>
            <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px" boxShadow={'0 0 10px 1px white, 0 1px 1px azure'} style={{ marginTop: 30, marginBottom: 100 }}>
                <VStack spacing="5px">
                    <FormControl id="flight-number" isRequired>
                        <FormLabel>Flight Number</FormLabel>
                        <Input type={'text'} name="flightNumber" value={User.name}
                            placeholder="Enter Flight Number" onChange={handleInputs}

                        />
                    </FormControl>
                    <FormControl id="Airline" isRequired>
                        <FormLabel>Airline</FormLabel>
                        <Input type={'text'} name="airline" value={User.name}
                            placeholder="Enter Airline" onChange={handleInputs}
                        />
                    </FormControl>
                    <FormControl id="Destination" isRequired>
                        <FormLabel>Destination</FormLabel>
                        <Input type={'text'} name="destination" value={User.name}
                            placeholder="Enter Your Destination" onChange={handleInputs}
                        />
                    </FormControl>
                    <FormControl id="Departure-Time" isRequired>
                        <FormLabel>Departure Time</FormLabel>
                        <Input type={'text'} name="departureTime" value={User.name}
                            placeholder="Departure Time" onChange={handleInputs}
                        />
                    </FormControl>
                    <FormControl id="Terminal" isRequired>
                        <FormLabel>Terminal</FormLabel>
                        <Input type={'number'} name="terminal" value={User.name}
                            placeholder="Enter Terminal" onChange={handleInputs}
                        />
                    </FormControl>
                    <FormControl id="gate-number" isRequired>
                        <FormLabel>Gate Number</FormLabel>
                        <Input type={'number'} name="gateNumber" value={User.name}
                            placeholder="Enter Gate Number..." onChange={handleInputs} />
                    </FormControl>
                    <Button colorScheme="blue" width={'50%'} style={{ marginTop: 30 }} p={'1rem'} onClick={PostData}>Save</Button>
                    <Button colorScheme="red" width={'50%'} style={{ marginTop: 30, marginBottom: 30 }} onClick={handleCancel}>Cancel</Button>
                </VStack>
            </Box>
        </Container>
    );
}

export default HomePage
