import type { FlowIntensity } from "../types"

type FlowPickerProps = {
    FlowIntensity:FlowIntensity[],
    value: FlowIntensity | null
    onChange: (flow: FlowIntensity) => void
}

export function FlowPicker({FlowIntensity, value,onChange}:FlowPickerProps)
{
    const flowColors: Record<string, string> = {
        none: "#e8e8f0",
        spotting: "#FDDDE6",
        light: "#F9A8BF",
        medium: "#E85D75",
        heavy: "#9B1B35",
    }
    return (
        <>
        <p>How was your flow today?</p>
        <div className="flex gap-2">
            {
                FlowIntensity.map(flow=>(
                    <button 
                    onClick={()=>onChange(flow)}
                    type="button" 
                    className="flex-1 py-2 rounded-[10px] text-sm flex flex-col items-center gap-1" 
                    key={flow}>
                    <span
                    className={`w-[44px] h-[44px] rounded-full ${
                       flow === value ? "ring-2 ring-offset-2 ring-[#e85d75]" : ""
                     }`}
                    style={{ backgroundColor: flowColors[flow] }}
                    />
                        {flow}
                    </button>
                ))
            }
        </div>
    </>
    )
}  