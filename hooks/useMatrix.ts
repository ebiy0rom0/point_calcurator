
export const useMatrix = (
  columnsParam: CreateLabelsParam,
  rowsParam: CreateLabelsParam,
  calcMatrix: MatrixCalcurator
): [number[], number[], number[][]] => {
  const columns = createLabels(columnsParam);
  const rows    = createLabels(rowsParam);

  const matrix = (() => {
    console.log("create matrix")
    return rows.map((yv, yi) => columns.map((xv, xi) => calcMatrix(xv, xi, yv, yi)))
  })();

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

type MatrixCalcurator = (x: number, xi: number, y: number, yi: number) => number;