import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import {BrowserRouter} from 'react-router-dom'
import { ChakraProvider, createSystem, defaultConfig } from '@chakra-ui/react'

const rootElement = document.getElementById('root');
const system = createSystem(defaultConfig);

if (!rootElement) {
    throw new Error('Root element not found in index.html')
}



createRoot(rootElement).render(
      <ChakraProvider value={system}> 
        <BrowserRouter>
            <App />
        </BrowserRouter>
      </ChakraProvider>
)
