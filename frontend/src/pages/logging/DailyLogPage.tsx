import { ChevronLeft } from "lucide-react"
import { FlowPicker } from "../../components/FlowPicker"
import { useState } from "react"
import { type FlowIntensity } from "../../types"

export function DailyLogPage()
{
    const d = new Date()
    const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
    const flowOptions: FlowIntensity[] = ["none", "spotting", "light","medium","heavy"]
    const [flowIntensity, setFlowIntensity] = useState<FlowIntensity | null>(null)


    return(
        <div className="auth-page">

            <div className="flex">
            <ChevronLeft />
            <p className="auth-heading">Log For Today</p>
           </div>
            <p className="auth-subtitle">{iso}</p>


            <FlowPicker FlowIntensity={flowOptions} value={flowIntensity} onChange={setFlowIntensity} />
            <p>{flowIntensity}</p>
        </div>
    )
}