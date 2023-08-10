import { FormControl, FormLabel, Input, InputGroup, InputRightElement, Button } from '@chakra-ui/react'
import { VStack } from '@chakra-ui/layout'
import { useState } from 'react'
import { useToast } from '@chakra-ui/react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import React from 'react'

const Signup = () => {
  const [show, setShow] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [confirmpassword, setConfirmPassword] = useState('')
  const [password, setPassword] = useState('')
  const [pic, setPic] = useState('')
  const [loading, setLoading] = useState(false)
  const toast = useToast()
  const history = useHistory()

  const handleClick = () => setShow(!show)
  const postDetails = (pic) => {
    setLoading(true)
    
    if (pic === undefined) {
      toast({
        title: "Please select a Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      })
      return;
    }

    if (pic.type === "image/jpeg" || pic.type === "image/png") {
      const data = new FormData()
      data.append("file", pic)
      data.append("upload_preset", "chat-app")
      data.append("cloud_name", "asifmohmd")
      fetch("https://api.cloudinary.com/v1_1/asifmohmd/image/upload", {
        method: "post",
        body: data
      })
        .then(res => res.json())
        .then(data => {
          setPic(data.url.toString())
          setLoading(false)
        })
        .catch(err => {
          console.log(err)
          setLoading(false)
        })
    } else {
      toast({
        title: "Please select a Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      })
      setLoading(false)
      return;
    }

  };

  const submitHandler = async () => {
    setLoading(true)
    if (name === '' || email === '' || password === '' || confirmpassword === '' || pic === '') {
      toast({
        title: "Please fill all the fields!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      })
      setLoading(false)
      return;
    }
    if (password !== confirmpassword) {
      toast({
        title: "Password and Confirm Password doesn't match!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      })
      setLoading(false)
      return;
    }
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const { data } = await axios.post('/api/user', { name, email, password, pic }, config)
      toast({
        title: "Registered Successfully!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      })
      localStorage.setItem('userInfo', JSON.stringify(data))
      setLoading(false)
      history.push('/chats')
    } catch (error) {
      toast({
        title: "Error occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      })
      setLoading(false)
    }
  }




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
            type={show ? "text" : "password"}
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
            type={show ? "text" : "confirm-password"}
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
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Sign Up
      </Button>


    </VStack>
  )
}

export default Signup