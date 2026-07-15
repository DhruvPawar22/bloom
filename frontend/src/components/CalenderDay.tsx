import { type LogOutput } from "../types"

type CalendarDayProps = {
    day: { date: Date }
    modifiers: Record<string, boolean>
    logMap: Map<string, LogOutput>
    onDayClick:(day:Date)=>void
}
export function CalendarDay({day, modifiers, logMap, onDayClick}: CalendarDayProps)
{
    if (modifiers.outside) return <td className="rdp-day rdp-outside" />
    const iso = `${day.date.getFullYear()}-${String(day.date.getMonth() + 1).padStart(2, '0')}-${String(day.date.getDate()).padStart(2, '0')}`
    const log = logMap.get(iso)
    const intensity = log?.flow_entries[0]?.intensity

    const bgColor = {
        spotting: "#FDDDE6",
        light: "#F9A8BF",
        medium: "#E85D75",
        heavy: "#9B1B35",
    }

    const bg = intensity && intensity !== "none" ? bgColor[intensity] : undefined

    return(
        <td
        onClick={()=>{onDayClick(day.date)}}
            style={{ backgroundColor: bg }}
            className="rdp-day"
        >
            {day.date.getDate()}
        </td>
    )
}