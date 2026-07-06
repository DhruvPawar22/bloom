import { type MoodType } from "../types";


type MoodPickerProps = {
    onChange:(mood:MoodType)=>void,
    value:MoodType[] | null,
    moodType:MoodType[]

}


export function MoodPicker({value,moodType,onChange}:MoodPickerProps)
{

    return(
        <div className="w-full rounded-[16px] bg-white p-4">

        <p className="text-sm font-medium text-[#1a1a2e] mb-1">How are you feeling?</p>
        <p className="text-xs font-small text-[#6b6b8a] mb-2">Select all that apply  •  scroll for more →</p>
        <div className="flex gap-2 overflow-x-auto flex-nowrap snap-x snap-mandatory scrollbar-hide">
        {
            moodType.map(mood=>(
                <button
                onClick={()=>onChange(mood)}
                type="button"
                key={mood}
                className={`p-2 rounded-[24px] text-sm whitespace-nowrap snap-start ${value?.includes(mood) ? "bg-[#e85d75] text-white" : "bg-[#fce8ec] text-[#1a1a2e]"}`}
                >{mood}</button>
            ))
        }
        </div>
        </div>
    )
}