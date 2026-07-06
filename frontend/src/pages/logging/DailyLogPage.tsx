import { ChevronLeft } from "lucide-react"
import { FlowPicker } from "../../components/FlowPicker"
import { useState } from "react"
import { type FlowIntensity, type MoodType } from "../../types"
import { MoodPicker } from "../../components/MoodPicker"

export function DailyLogPage()
{
    const d = new Date()
    const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
    const flowOptions: FlowIntensity[] = ["none", "spotting", "light","medium","heavy"]
    const moodOptions: MoodType[] =   ["happy","calm","energetic","focused","sad","sensitive","irritable","anxious","tired","overwhelmed"]

    const [flowIntensity, setFlowIntensity] = useState<FlowIntensity | null>(null)

    const [moods, setMoods] = useState<MoodType[]>([])

    const handleMood = (mood: MoodType) => {
    setMoods(prev =>
        prev.includes(mood)
            ? prev.filter(m => m !== mood)
            : [...prev, mood]
        )
        }

    return(
        <div className="min-h-screen bg-[#f8f8fc] flex flex-col">
            <div className="w-full rounded-[16px] bg-white p-4">
                <div className="flex items-center gap-2">
                    <ChevronLeft />
                    <p className="auth-heading mb-0">Log For Today</p>
                </div>
                <p className="auth-subtitle mb-0">{iso}</p>
            </div>

            <div className="log_page">
                <FlowPicker FlowIntensity={flowOptions} value={flowIntensity} onChange={setFlowIntensity} />
                <MoodPicker moodType={moodOptions} value={moods} onChange={handleMood}/>
            </div>
        </div>
    )
}