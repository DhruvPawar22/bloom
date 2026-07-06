export interface User {
  id: string
  email: string
  display_name: string | null
  created_at: string
}

export type FlowIntensity = "none" | "spotting" | "light" | "medium" | "heavy"

export type MoodType =
  | "happy"
  | "calm"
  | "energetic"
  | "focused"
  | "sad"
  | "sensitive"
  | "irritable"
  | "anxious"
  | "tired"
  | "overwhelmed"


export interface Medication {
  occurred: boolean
  note: string | null
}


export interface LogCreate {
  date: string
  flow_intensity: FlowIntensity | null
  moods: MoodType[]
  sexual_activity: boolean | null
  notes: string | null
  medication: Medication | null
}


export interface FlowEntry {
  id: string
  intensity: FlowIntensity
}

export interface Mood {
  id: string
  mood: MoodType
}

export interface SexualActivity {
  id: string
  occurred: boolean
}

export interface MedicationOutput extends Medication {
  id: string
}

export interface LogOutput {
  id: string
  date: string
  notes: string | null
  flow_entries: FlowEntry[]
  moods: Mood[]
  sexual_activity: SexualActivity[]
  medications: MedicationOutput[]
}