export default async (call, params) => {
  let startCursor

  const result = []
  do {
    const callResult = await call({ ...params, start_cursor: startCursor })
    startCursor = callResult.next_cursor
    result.push(...callResult.results)
  } while (startCursor !== null)

  return result
}
