export const getTest = ():number => {
  const obj:any = {
    a: 1,
    c: 2,
  };
  return obj.a ?? 12;
};

export const test = 123;
