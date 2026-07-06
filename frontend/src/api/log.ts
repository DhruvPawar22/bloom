import client from "./client"
import axios from "axios"
import type { LogCreate,LogOutput } from "../types"

export async function createOrUpdateLog(data: LogCreate): Promise<LogOutput> {
  const response = await client.post<LogOutput>("/logs", data)
  return response.data
}

export async function getLogByDate(date: string): Promise<LogOutput | null> {
  try {
    const response = await client.get<LogOutput>(`/logs/${date}`)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null
    }
    throw error
  }
}
export async function getLogsByRange(start: string, end: string): Promise<LogOutput[]> {
  const response = await client.get<LogOutput[]>("/logs", {
    params: { start_date: start, end_date: end },
  })
  return response.data
}