export const currencyFormat = (
  number: number,
  currency?: string,
  maxFraction?: number
) => {
  return new Intl.NumberFormat("en-US", {
    style: currency && "currency",
    currency: currency ?? "USD",
    maximumFractionDigits: maxFraction ?? 0,
  }).format(number);
};

export const getDayTime = (inputDateStr: string) => {
  const dateObj = new Date(inputDateStr);
  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const year = dateObj.getFullYear();
  const outputDateStr = `${day}/${month}/${year}`;
  return outputDateStr;
};

export const generateOptions = (options: {
  [x: string]:
    | {
        code: string;
        name: string;
      }[]
    | undefined;
}) => {
  const keys = Object.keys(options);
  const valueArrays = keys
    .map((key) => options[key]?.map((item) => item.code))
    .filter((i) => i);
  const combinations = valueArrays.reduce(
    (acc, curr) => acc.flatMap((x: any) => curr?.map((y) => [...x, y])),
    [[]] as any
  );
  return combinations.map((combination: []) => ({
    label: combination.join(""),
    value: combination.join(""),
  }));
};
