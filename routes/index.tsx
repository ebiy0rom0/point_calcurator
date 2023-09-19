import { Head } from "aleph/react";
import {
  Input,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from 'chakra-ui';

const maxBonus = 405;
const maxScore = 3000000;

export default function Index() {
  const bonus = Array.from(new Array(maxBonus / 5), (_, i) => i * 5);
  const score = Array.from(new Array(maxScore / 20000), (_, i) => i * 20000);

  return (
    <div className="screen index">
      <Head>
        <title>Aleph.js</title>
        <meta name="description" content="Event point calcurator for 'Project Sekai colorful stage feat. Miku Hatsune.'" />
      </Head>
      <h1>
        🦐 Event Point Calcurator
      </h1>
      <div>
        <Input placeholder="target points" size="sm"></Input>
      </div>
      <div>
        <TableContainer>
          <Table variant='striped' colorScheme='teal' size='sm'>
            <TableCaption>🦐 get points </TableCaption>
            <Thead>
              <Tr>
                <Th>range</Th>
                { bonus.map(v => (<Th>{v} %</Th>)) }
              </Tr>
            </Thead>
            <Tbody>
              { score.map((sv, si) => (
                <Tr>
                  <Td>{sv} ~ {sv + 19999}</Td>
                  { bonus.map(bv =>
                    (<Td>{Math.floor((100 + si) * (100 + bv) / 100)}</Td>)
                  )}
                </Tr>
              ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>To convert</Th>
                <Th>into</Th>
                <Th isNumeric>multiply by</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
