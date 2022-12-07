export const merge = <T>(params: T, other: Partial<T>): T => {
  return {
    ...params,
    ...other,
  };
};
