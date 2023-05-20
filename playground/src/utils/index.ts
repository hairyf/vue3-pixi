export type Deferred<T = void> = Promise<T> & { resolve: (value: T) => void; reject: Function }

export function createDeferred<T = void>(): Deferred<T> {
  let resolve: any, reject: any
  const promise = new Promise<any>((_resolve, _reject) => {
    resolve = _resolve
    reject = _reject
  }) as unknown as any
  promise.resolve = (v: any) => {
    resolve(v)
  }
  promise.reject = reject
  return promise
}
