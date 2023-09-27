import { Head } from "aleph/react";
import { useState, useMemo } from "react";
import { NumberInputForm } from "~/components/NumberInputForm.tsx";
import { useMatrix } from "~/hooks/useMatrix.ts";
import {
  Box,
  Flex,
  HStack,
  Container,
  Heading,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from 'chakra-ui';

type EventPoint = {
  id: number
  name: string
  point: number
}

export default function Index() {
  const [eventPoints, setEventPoints] = useState<EventPoint[]>([
    {
      id: 1,
      name: "🦐",
      point: 100
    },
    {
      id: 2,
      name: "🐑",
      point: 115
    }
  ]);
  const [selectMusic, setSelectMusic] = useState(0);
  const music = eventPoints[selectMusic];

  const [targetPt,  setTargetPt]  = useState(150);
  const [currentPt, setCurrentPt] = useState(0);
  const needPt = targetPt - currentPt;

  const [bonusParam] = useState({ min: 0, max:     400, span:     5 });
  const [scoreParam] = useState({ min: 0, max: 2000000, span: 20000 });

  const [bonus, score, matrix] = useMemo(() => useMatrix(
    bonusParam,
    scoreParam,
    (bonus, score) => Math.floor(music.point * (100 + Math.floor(score / 20000)) * (100 + bonus) / 10000),
  ), [music, bonusParam, scoreParam]);

  return (
    <Container className="screen index">
      <Head>
        <title>🦐</title>
        <meta name="description" content="Event point calcurator for 'Project Sekai colorful stage feat. Miku Hatsune.'" />
      </Head>
      <Heading as="h1">
        🦐 Event Point Calcurator
      </Heading>
      <HStack m={[2,10]} gap="5">
        <Select
          variant="flushed"
          size="sm"
          w="10.0em"
          onChange={ e => setSelectMusic(+e.target.value) }
        >
          { eventPoints.map((v, i) => (
            <option key={ v.id } value={ i }>{ v.name }</option>
          )) }
        </Select>
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
      </HStack>
      <Flex gap="5" px="5.0em" overflowX="auto">
        <Box>
          <TableContainer>
            <Table variant="striped" colorScheme="teal" size="sm">
              <Thead>
                <Tr>
                  <Th>スコア</Th>
                  <Th>ボーナス</Th>
                </Tr>
              </Thead>
              <Tbody>
                { matrix.map((mv, mi) =>
                    mv.map((v, i) =>
                      needPt === v && (
                        <Tr key={ score[mi] + ":" + bonus[i] }>
                          <Td>{ score[mi] } ~ { score[mi] + 19999 }</Td>
                          <Td>{ bonus[i] } %</Td>
                        </Tr>
                      )
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
        <Box overflowX="auto">
          <TableContainer overflowX="unset" overflowY="unset">
            <Table className="sticky_table" variant='striped' colorScheme='twitter' size='sm'>
              <Thead>
                <Tr>
                  <Th>スコア \ ボーナス</Th>
                  { bonus.map(v => (<Th key={ v } px="0.5rem">{ v } %</Th>)) }
                </Tr>
              </Thead>
              <Tbody>
                { matrix.map((mv, mi) => (
                  <Tr key={ score[mi] }>
                    <Td>{ score[mi] } ~ { score[mi] + 19999 }</Td>
                    { mv.map((v, i) => (
                      <Td
                        key={ score[mi] + ":" + bonus[i] }
                        className={`${v === needPt && "target"}`}
                        px="0.5rem"
                      >
                        { v }
                      </Td>
                    ))}
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Flex>
    </Container>
  );
}
