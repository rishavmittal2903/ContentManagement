export const groupBy = (input:Array<any>, key:string) => {
    return input.reduce((acc, currentValue) => {
      let groupKey = currentValue[key];
      if (!acc[groupKey]) {
        acc[groupKey] = {};
      }
      acc[groupKey] = JSON.stringify(JSON.parse(currentValue?.value));
      return acc;
    }, {});
  };