import { ChakraProvider } from "chakra-ui";

export default function App({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider>
      {children}
    </ChakraProvider>
  );
}
