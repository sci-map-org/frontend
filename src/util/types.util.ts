type GetObjDifferentKeys<
  T,
  U,
  T0 = Omit<T, keyof U> & Omit<U, keyof T>,
  T1 = {
    [K in keyof T0]: T0[K];
  }
> = T1;

type GetObjSameKeys<T, U> = Omit<T | U, keyof GetObjDifferentKeys<T, U>>;

// this generic call recursively DeepMergeTwoTypes<>

type MergeTwoObjects<
  T,
  U,
  // non shared keys are optional
  T0 = Partial<GetObjDifferentKeys<T, U>> &
    // shared keys are recursively resolved by `DeepMergeTwoTypes<...>`
    { [K in keyof GetObjSameKeys<T, U>]: DeepMergeTwoTypes<T[K], U[K]> },
  T1 = { [K in keyof T0]: T0[K] }
> = T1;

export type DeepMergeTwoTypes<T, U> =
  // check if generic types are arrays and unwrap it and do the recursion
  [T, U] extends [{ [key: string]: unknown }, { [key: string]: unknown }] ? MergeTwoObjects<T, U> : T | U;
