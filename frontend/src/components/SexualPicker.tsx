import { IOSSwitch } from "./IOSSwitch"


type SexualPickerProps = {
    value : boolean,
    onChange : (value:boolean)=>void
}

export function SexualPicker({value,onChange}:SexualPickerProps)
{
    return (
        <div className="w-full rounded-[16px] bg-white p-4 flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-[#1a1a2e] mb-1">Sexual Activity</p>
                <p className="text-xs text-[#6b6b8a]">Today</p>
            </div>
            <IOSSwitch
                checked={value}
                onChange={()=>onChange(!value)}
            />
        </div>
    )
}