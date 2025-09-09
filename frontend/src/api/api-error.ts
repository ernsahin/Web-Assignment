import { AxiosError } from "axios";

export function extractApiMessage(error: unknown, fallback: string) {
  const axiosErr = error as AxiosError<{ message?: string }>;
  return axiosErr.response?.data?.message || axiosErr.message || fallback;
}
