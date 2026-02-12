import { Routes, Route } from "react-router-dom"
import { Box, Flex } from "@chakra-ui/react"

import Footer from './components/Footer'

import Login from './pages/LoginPage'
import Register from './pages/auth/RegisterPage';
import Home from "./pages/HomePage";

import bg from './assets/bg.png'

function App() {
  return (
    <Flex flexDir={"column"} justifyContent={"center"}
      backgroundImage={`url(${bg})`} backgroundRepeat={"no-repeat"} backgroundPosition={"center"} backgroundSize={"cover"} h={"100vh"}>
        <Box id='App-contents'>
          <Routes>
            
            <Route path='/' element={<Login />}/>

            <Route path="/register" element={<Register />}/>
    
            <Route path='/home' element={<Home />}/>
          </Routes>
        </Box>
        <Box id='footer'
        pos={"fixed"} bottom={"0"} pb={"10px"} w={"100%"} color={"white"}>
          <Footer />
        </Box>
    </Flex>
  )
}
export default App
