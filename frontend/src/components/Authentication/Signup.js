import { FormControl, FormLabel, Input } from '@chakra-ui/react'
import { VStack } from '@chakra-ui/layout'
import { useState } from 'react'

import React from 'react'

const Signup = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [confirmpassword, setConfirmPassword] = useState('')
    const [password, setPassword] = useState('')
    const [pic, setPic] = useState('')


  return (
  <VStack spacing='5px' color='black'>
    <FormControl id='first-name' isRequired>
        <FormLabel>Name</FormLabel>
        <Input 
        placeholder='Enter Your Name'
        onChange={(e) => setName(e.target.value)}

        />
        
        
    </FormControl>

  </VStack>
  )
}

export default Signup