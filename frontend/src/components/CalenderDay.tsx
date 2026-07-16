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
        predicted:"#ffe8ecFF;"
    }

    const bg = intensity && intensity !== "none" ? bgColor[intensity] : undefined
    const textcolor = modifiers.today ? '#e85d75' : intensity === "medium" || intensity === "heavy" ? '#ffffff' : '#1a1a2e'
    const border = modifiers.today ? '2px solid #e85d75' : '1px solid #d0d0e0'
    const fontWeight = modifiers.today ? '700' : '500'

    return(
        <td
            onClick={() => onDayClick(day.date)}
            style={{ backgroundColor: bg, color: textcolor, border, fontWeight }}
            className="rdp-day"
        >
            {day.date.getDate()}
        </td>
    )
}