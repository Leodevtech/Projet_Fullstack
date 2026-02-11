import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ChakraProvider, createSystem, defaultConfig } from '@chakra-ui/react'

const rootElement = document.getElementById('root');
const system = createSystem(defaultConfig);

if (!rootElement) {
    throw new Error('Root element not found in index.html')
}



createRoot(rootElement).render(
      <ChakraProvider value={system}> 
            <App />
      </ChakraProvider>
)