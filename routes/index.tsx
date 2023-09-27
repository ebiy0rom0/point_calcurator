import { Head } from "aleph/react";
import { useState, useEffect, useMemo } from "react";
import { NumberInputForm } from "~/components/NumberInputForm.tsx";
import { useMatrix } from "~/hooks/useMatrix.ts";
import {
  Box,
  Container,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from 'chakra-ui';

export default function Index() {
  const [base] = useState(100);

  const [target, setTarget] = useState(250);
  const [now, setNow]       = useState(0);
  const [need, setNeed]     = useState(0);

  const [columnsParam] = useState({ min: 0, max:     400, span:     5 });
  const [rowsParam]    = useState({ min: 0, max: 2000000, span: 20000 });

  const [columns, rows, matrix] = useMemo(() => useMatrix(
    columnsParam,
    rowsParam,
    (x, _xi, _y, yi) => Math.floor((base + yi) * (100 + x) / 100),
  ), [columnsParam, rowsParam]);

  // const hoge = matrix.

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
        🦐 Event Point Calcurator
      </Heading>
      <Box m={[2,10]} className="calcurator">
        <NumberInputForm
          label="目標スコア"
          value={ target }
          onChange={ setTarget }
        />
        <NumberInputForm
          label="現在スコア"
          value={ now }
          onChange={ setNow }
        />
        <NumberInputForm
          label="必要スコア"
          value={ need }
          onChange={ () => {} }
          isReadOnly={ true }
        />
      </Box>
      <Box>
        <TableContainer maxW="20%">
          <Table variant="striped" colorScheme="twitter" size="sm">
            <Thead color="twitter">
              <Tr>
                <Th>スコア</Th>
                <Th>ボーナス</Th>
              </Tr>
            </Thead>
            <Tbody>
              { matrix.map((mv, mi) =>
                  mv.map((v, i) =>
                    need === v ? (
                      <Tr>
                        <Td>{ rows[mi] } ~ { rows[mi] + 19999 }</Td>
                        <Td>{ columns[i] } %</Td>
                      </Tr>
                    ) : (<></>)
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
      <Box mx={10} overflowX="auto">
        <TableContainer overflowX="unset" overflowY="unset">
          <Table className="sticky_table" variant='striped' colorScheme='whatsapp' size='sm'>
            <Thead>
              <Tr>
                <Th>スコア \ ボーナス</Th>
                { columns.map(v => (<Th px="0.5rem">{v} %</Th>)) }
              </Tr>
            </Thead>
            <Tbody>
              { matrix.map((mv, mi) => (
                <Tr>
                  <Td>{ rows[mi] } ~ { rows[mi] + 19999 }</Td>
                  { mv.map(v => (<Td className={`${v === need && "target"}`} px="0.5rem">{ v }</Td>)) }
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}
