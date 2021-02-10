export const fetchData = async (
  method: Method,
  body: Record<string, unknown> | null = {},
  id: string | number | null = null,
): Promise<{ status: number; content: Promise<any> }> => {
  const response = await fetch(
    id ? address + `/id/${id}` : address,
    Object.assign(
      {},
      {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
      },
      method !== 'GET' ? { body: JSON.stringify(body) } : {},
    ),
  );

  return { status: response.status, content: response['json']() };
};

export enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export const address = 'https://localhost:44394/books';
