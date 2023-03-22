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
import {useHistory} from 'react-router-dom'


const HomePage = () => {
    const history = useHistory();


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
        // console.log(JSON.stringify({ flightNumber, airline, destination, departureTime, terminal, gateNumber }))
    }
    history.push('/')


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
                        <FormLabel>Enter Flight Number</FormLabel>
                        <Input max={10} type={'text'} name="flightNumber" value={User.flightNumber}
                            placeholder="Example: SG8134" onChange={handleInputs}

                        />
                    </FormControl>
                    <FormControl id="Airline" isRequired>
                        <FormLabel>Enter Airline</FormLabel>
                        <Input max={20} type={'text'} name="airline" value={User.airline}
                            placeholder="Example: SpiceJet" onChange={handleInputs}
                        />
                    </FormControl>
                    <FormControl id="Destination" isRequired>
                        <FormLabel>Enter Destination</FormLabel>
                        <Input max={50} type={'text'} name="destination" value={User.destination}
                            placeholder="Example: New Delhi" onChange={handleInputs}
                        />
                    </FormControl>
                    <FormControl id="Departure-Time" isRequired>
                        <FormLabel>Enter Departure Time</FormLabel>
                        <Input max={10} type={'time'} name="departureTime" value={User.departureTime}
                            placeholder="Example: 10:10 a.m." onChange={handleInputs}
                        />
                    </FormControl>
                    <FormControl id="Terminal" isRequired>
                        <FormLabel>Enter Terminal</FormLabel>
                        <Input max={2} type={'number'} name="terminal" value={User.terminal}
                            placeholder="Example: 11" onChange={handleInputs}
                        />
                    </FormControl>
                    <FormControl id="gate-number" isRequired>
                        <FormLabel>Enter Gate Number</FormLabel>
                        <Input max={2} type={'number'} name="gateNumber" value={User.gateNumber}
                            placeholder="Example 10" onChange={handleInputs} />
                    </FormControl>
                    <Button colorScheme="blue" width={'50%'} style={{ marginTop: 30 }} p={'1rem'} onClick={PostData}>Save</Button>
                    <Button colorScheme="red" width={'50%'} style={{ marginTop: 30, marginBottom: 30 }} onClick={handleCancel}>Cancel</Button>
                </VStack>
            </Box>
        </Container>
    );
}

export default HomePage
