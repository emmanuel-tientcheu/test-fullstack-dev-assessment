export interface ApiResponse<T> {
  message: string;
  data: T | null;
  status: number;
}

export function formatResponse<T>(
  message: string,
  data: T | null,
  status: number,
): ApiResponse<T> {
  return {
    message,
    data,
    status,
  };
}
