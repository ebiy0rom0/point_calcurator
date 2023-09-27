
export const useMatrix = (
  columnsParam: CreateLabelsParam,
  rowsParam: CreateLabelsParam,
  calcMatrix: MatrixCalcurator
): [number[], number[], number[][]] => {
  const columns = createLabels(columnsParam);
  const rows    = createLabels(rowsParam);

  const matrix = rows.map(yv => columns.map(xv => calcMatrix(xv, yv)));

  return [columns, rows, matrix];
}

const createLabels = ({ min, max, span }: CreateLabelsParam): number[] => {
  console.log("create labels")
    return Array.from(new Array(Math.floor((max - min) / span)), (_, i) => i * span + min);
}

type CreateLabelsParam = {
  min: number,
  max: number,
  span: number
};

type MatrixCalcurator = (x: number, y: number) => number;