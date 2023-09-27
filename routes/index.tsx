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
  const [basicPt, setBasicPt] = useState(115);

  const [targetPt,  setTargetPt]  = useState(250);
  const [currentPt, setCurrentPt] = useState(0);
  const [needPt,    setNeedPt]    = useState(0);

  const [columnsParam] = useState({ min: 0, max:     400, span:     5 });
  const [rowsParam]    = useState({ min: 0, max: 2000000, span: 20000 });

  const [columns, rows, matrix] = useMemo(() => useMatrix(
    columnsParam,
    rowsParam,
    (x, y) => Math.floor((basicPt * (100 + Math.floor(y / 20000))) * (100 + x) / 10000),
  ), [columnsParam, rowsParam]);

  useEffect(() => {
    setNeedPt(targetPt - currentPt);
  }, [targetPt, currentPt]);

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
          value={ targetPt }
          onChange={ setTargetPt }
        />
        <NumberInputForm
          label="現在スコア"
          value={ currentPt }
          onChange={ setCurrentPt }
        />
        <NumberInputForm
          label="必要スコア"
          value={ needPt }
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
                    needPt === v ? (
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
                  { mv.map(v => (<Td className={`${v === needPt && "target"}`} px="0.5rem">{ v }</Td>)) }
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}
