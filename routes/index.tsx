import { Head } from "aleph/react";
import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Heading,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from 'chakra-ui';

const maxBonus = 405;
const maxScore = 3000000;

const numberFormat = (v: number): string => v.toLocaleString();

export default function Index() {
  const bonus = Array.from(new Array(maxBonus / 5 + 1), (_, i) => i * 5);
  const score = Array.from(new Array(maxScore / 20000), (_, i) => i * 20000);

  const [target, setTarget] = useState(250);
  const [now, setNow]       = useState(0);
  const [need, setNeed]     = useState(0);

  useEffect(() => {
    setNeed(target - now);
  }, [target, now]);

  return (
    <Container className="screen index">
      <Head>
        <title>🦐</title>
        <meta name="description" content="Event point calcurator for 'Project Sekai colorful stage feat. Miku Hatsune.'" />
      </Head>
      <Heading as="h1">
        🦐 Event Point Calcurator { target }
      </Heading>
      <Box m={[2,10]} className="calcurator">
        <FormControl onChange={ e => setTarget(e.target.value) }>
          <FormLabel fontSize="sm" mb={1}>目標スコア</FormLabel>
          <NumberInput inputMode="numeric" size="sm" value={target} w="8.0em" format={numberFormat}>
            <NumberInputField />
          </NumberInput>
        </FormControl>
        <FormControl onChange={ e => setNow(e.target.value) }>
          <FormLabel fontSize="sm" mb={1}>現在スコア</FormLabel>
          <NumberInput inputMode="numeric" size="sm" value={now} w="8.0em" ms="4" format={numberFormat}>
            <NumberInputField />
          </NumberInput>
        </FormControl>
        <FormControl isReadOnly={true}>
          <FormLabel fontSize="sm" mb={1}>必要スコア</FormLabel>
          <NumberInput 
            inputMode="numeric" 
            size="sm" 
            value={need} 
            w="8.0em" 
            ms="4" 
            format={numberFormat}
          >
            <NumberInputField />
          </NumberInput>
        </FormControl>
      </Box>
      <Box mx={10} overflowX="auto">
        <TableContainer overflowX="unset" overflowY="unset">
          <Table className="sticky_table" variant='striped' colorScheme='whatsapp' size='sm'>
            <TableCaption>🦐 get points </TableCaption>
            <Thead>
              <Tr>
                <Th>score \ bonus</Th>
                { bonus.map(v => (<Th>{v} %</Th>)) }
              </Tr>
            </Thead>
            <Tbody>
              { score.map((sv, si) => (
                <Tr>
                  <Td>{sv} ~ {sv + 19999}</Td>
                  { bonus.map(bv => {
                    const pt = Math.floor((100 + si) * (100 + bv) / 100);
                    return (<Td className={pt === need && "target"}>{ pt }</Td>)
                  })}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}
