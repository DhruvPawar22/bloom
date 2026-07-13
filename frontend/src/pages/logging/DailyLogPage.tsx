import { ChevronLeft } from "lucide-react"
import { FlowPicker } from "../../components/FlowPicker"
import { useState } from "react"
import { type FlowIntensity, type MoodType } from "../../types"
import { MoodPicker } from "../../components/MoodPicker"
import {SexualPicker} from "../../components/SexualPicker"
import { Medications } from "../../components/Medications"
import {Note} from "../../components/Note"
import { Button } from "@mui/material"

export function DailyLogPage()
{
    const d = new Date()
    const iso = d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    const flowOptions: FlowIntensity[] = ["none", "spotting", "light","medium","heavy"]
    const moodOptions: MoodType[] =   ["happy","calm","energetic","focused","sad","sensitive","irritable","anxious","tired","overwhelmed"]

    const [flowIntensity, setFlowIntensity] = useState<FlowIntensity | null>(null)
    const [moods, setMoods] = useState<MoodType[]>([])
    const [sexualActivity,setSexualActivity] = useState(false);
    const [medications,setMedications] = useState(false);
    const [medicationsnote,setMedicationsnote] = useState("");
    const [note,setNote] = useState("");

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
                    <div className="flex flex-col">
                        <p className="auth-heading mb-0">Log For Today</p>
                        <p className="auth-subtitle mb-0">{iso}</p>
                    </div>
                </div>
            </div>

            <div className="log_page">
                <FlowPicker FlowIntensity={flowOptions} value={flowIntensity} onChange={setFlowIntensity} />
                <MoodPicker moodType={moodOptions} value={moods} onChange={handleMood}/>
                <SexualPicker value={sexualActivity} onChange={setSexualActivity}/>
                <Medications medication={medications} medicationsnote={medicationsnote} setMedications={setMedications} setMedicationsnote={setMedicationsnote}/>
                <Note note={note} onChange={setNote}/>
                <Button
                    variant="contained"
                    fullWidth
                    sx={{
                        backgroundColor: "#e85d75",
                        borderRadius: "12px",
                        textTransform: "none",
                        fontWeight: 600,
                        height: 48,
                        "&:hover": { backgroundColor: "#d44d65" },
                    }}
                >Save Log</Button>
            </div> 
        </div>
    )
}