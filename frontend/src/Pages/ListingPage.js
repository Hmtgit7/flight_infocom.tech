import { border, Box, Card, Center, Container, Table, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const ListingPage = () => {

  const [chats, setChats] = useState([])
  const fetchChats = async () => {
    const { data } = await axios.get("/home");
    setChats(data);
    console.log()
  }

  useEffect(() => {
    fetchChats();
  }, [])

  return (
    <Container maxW="l" centerContent>
        {/* {chats.map((chat) => <div key={chat.id}></div>)} */}
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
          <Text colorScheme={'blue'} fontSize="4xl" fontFamily="Work sans-800">
            <Center> List Of All Flights</Center>
          </Text>
        </Box>

      <TableContainer>
        <Table Center size='sm'>
          <Thead>
            <Tr>
              <Th>Flight Number</Th>
              <Th>Airline</Th>
              <Th>Destination</Th>
              <Th isNumeric>Time</Th>
              <Th isNumeric>Terminal</Th>
              <Th isNumeric> Gate Number</Th>
            </Tr>
          </Thead>
          <Tbody>

            
              {/* {chats.map((chat) => <div key={chat.id}> 
                <Td>{chat.flightNumber}</Td>
                <Td>{chat.Airline}</Td>
                <Td>{chat.Destination}</Td>
                <Td>{chat.Detail}</Td>
                <Td>{chat.Terminal}</Td>
                <Td>{chat.gateNumber}</Td>  
            </div>)} */}

              {chats.map(chat => {
                return (
                  <Tr>
              <Td>{chat.flightNumber}</Td>
                <Td>{chat.airline}</Td>
                <Td>{chat.destination}</Td>
                <Td>{chat.departureTime}</Td>
                <Td>{chat.terminal}</Td>
                <Td>{chat.gateNumber}</Td>
                  </Tr>
                )
              })} 
          </Tbody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default ListingPage
