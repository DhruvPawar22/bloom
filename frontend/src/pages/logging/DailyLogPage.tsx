import { ChevronLeft } from "lucide-react"
import { FlowPicker } from "../../components/FlowPicker"
import { useEffect, useState } from "react"
import { type FlowIntensity, type MoodType } from "../../types"
import { MoodPicker } from "../../components/MoodPicker"
import {SexualPicker} from "../../components/SexualPicker"
import { Medications } from "../../components/Medications"
import {Note} from "../../components/Note"
import { Button } from "@mui/material"
import { createOrUpdateLog } from "../../api/log"
import Alert from '@mui/material/Alert';
import { useNavigate, useParams } from "react-router-dom"
import { getLogByDate } from "../../api/log"
export function DailyLogPage()
{
    const { date } = useParams<{ date: string }>()
    const d = new Date()
    const iso = date ?? `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}` 
    const displayDate = new Date(iso + 'T00:00:00').toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })

    const flowOptions: FlowIntensity[] = ["none", "spotting", "light","medium","heavy"]
    const moodOptions: MoodType[] =   ["happy","calm","energetic","focused","sad","sensitive","irritable","anxious","tired","overwhelmed"]

    const [flowIntensity, setFlowIntensity] = useState<FlowIntensity | null>(null)
    const [moods, setMoods] = useState<MoodType[]>([])
    const [sexualActivity,setSexualActivity] = useState(false);
    const [medications,setMedications] = useState(false);
    const [medicationsnote,setMedicationsnote] = useState("");
    const [note,setNote] = useState("");
    const [status, setStatus] = useState<"success" | "error" | null>(null)
    const [loading, setLoading] = useState(false)

    const Navigate = useNavigate()

    const handleMood = (mood: MoodType) => {
    setMoods(prev =>
        prev.includes(mood)
            ? prev.filter(m => m !== mood)
            : [...prev, mood]
        )
        }
    async function handleSubmit()
    {
        const data = {
            date:iso,
            flow_intensity:flowIntensity,
            moods:moods,
            sexual_activity:sexualActivity,
            notes:note,
            medication: medications ? { occurred: true, note: medicationsnote } : null
        }
        setLoading(true)
        try {
            await createOrUpdateLog(data);
            setStatus("success")
        } catch (error) {
            setStatus("error")
        } finally {
            setLoading(false)
        }

    }
    useEffect(()=>{
            const fetch = async ()=>{
        try {
                const response = await getLogByDate(iso)
                if (response)
                {
                    setFlowIntensity(response.flow_entries[0]?.intensity ?? null)
                    setMoods(response.moods.map(item=>item.mood) ?? [])
                    setSexualActivity(response.sexual_activity[0]?.occurred ?? false)
                    setNote(response.notes ?? "")
                    setMedications(response.medications[0]?.occurred ?? false)
                    setMedicationsnote(response.medications[0]?.note ?? "")
                }
            }
        
        catch (error) {
            setStatus("error")
        }

    }
    fetch()
    },[iso])
    return(
        <div className="min-h-screen bg-[#f8f8fc] flex flex-col">
            <div className="w-full rounded-[16px] bg-white p-4">
                <div className="flex items-center gap-2">
                    <ChevronLeft 
                    onClick={()=>{
                        Navigate(`/Calender`)
                    }}
                    />
                    <div className="flex flex-col">
                        <p className="auth-heading mb-0">Log For Today</p>
                        <p className="auth-subtitle mb-0">{displayDate}</p>
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
                    onClick={handleSubmit}
                    loading={loading}
                    disabled={loading}
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
                {status === "success" && <Alert severity="success">Log Successfully Submitted!</Alert>}
                {status === "error" && <Alert severity="error">There was an error in your submission.</Alert>}
            </div> 

        </div>
    )
}