import { FormControl, FormLabel, Input, InputGroup, InputRightElement, Button } from '@chakra-ui/react'
import { VStack } from '@chakra-ui/layout'
import { useState } from 'react'

import React from 'react'

const Signup = () => {
    const [show, setShow] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [confirmpassword, setConfirmPassword] = useState('')
    const [password, setPassword] = useState('')
    const [pic, setPic] = useState('')

    const handleClick = () => setShow(!show)
    const postDetails = (pic) => { };
    const submitHandler = () => { };




  return (
  <VStack spacing='5px' color='black'>

    <FormControl id='first-name' isRequired>
        <FormLabel>Name</FormLabel>
        <Input 
        placeholder='Enter Your Name'
        onChange={(e) => setName(e.target.value)}
        />
    </FormControl>

    <FormControl id='email' isRequired>
        <FormLabel>Email</FormLabel>
        <Input 
        placeholder='Enter Your Email'
        onChange={(e) => setEmail(e.target.value)}
        />
    </FormControl>

    <FormControl id='password' isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
        <Input 
        type={show? "text" : "password"}
        placeholder='Enter Your Password'
        onChange={(e) => setPassword(e.target.value)}
        />
        |<InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
    </FormControl>

    <FormControl id='confirm-password' isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
        <Input 
        type={show? "text" : "confirm-password"}
        placeholder='Confirm Your Password'
        onChange={(e) => setConfirmPassword(e.target.value)}
        />
        |<InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
    </FormControl>

    <FormControl id='pic' isRequired>
        <FormLabel>Upload your Picture</FormLabel>
        <Input 
        type="file"
        p={1.5}
        accept="image/*"
        onChange={(e) => postDetails(e.target.files[0])}
        />
    </FormControl>
    
    <Button 
    colorScheme='blue' 
    width="100%" 
    style={{marginTop :15 }} 
    onClick={submitHandler} 
    >
      Sign Up
      </Button>


  </VStack>
  )
}

export default Signup