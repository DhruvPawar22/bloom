import { useState,useEffect,useMemo } from "react";
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import { getLogsByRange } from "../../api/log";
import { useNavigate } from "react-router-dom";
import { type LogOutput } from "../../types";
import Alert from '@mui/material/Alert';
import { CalendarDay } from "../../components/CalenderDay";
import { Divider } from "@mui/material";

export function CalenderPage()
{
    const [month, setMonth] = useState(new Date());
    const [status, setStatus] = useState<"success" | "error" | null>(null)
    const [loading, setLoading] = useState(false)
    const [log,setLog] = useState<LogOutput[]>([])

    const Navigate = useNavigate();
    const logMap = useMemo(() => new Map(log.map(l => [l.date, l])), [log])
    const legend = ["Spotting", "Light","Medium","Heavy","Activity","Medication","Predicted"]
    const legendColor: Record<string, string> ={
        Spotting: "#FDDDE6",
        Light: "#F9A8BF",
        Medium: "#E85D75",
        Heavy: "#9B1B35",
        Predicted: "#FFE8EC",
        Medication: "#10B981",
        Activity: "#8B5CF6",
    }

    function onDayClick(day:Date)
    {
        const iso = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}`
        Navigate(`/DailyLog/${iso}`)

    }


    useEffect(() => {
        const fetch = async () =>{
        setLoading(true)
        try{
            const start = new Date(month.getFullYear(), month.getMonth(), 1)
            const end = new Date(month.getFullYear(), month.getMonth() + 1, 0)

            const startStr = `${start.getFullYear()}-${String(start.getMonth() + 1).padStart(2, '0')}-01`
            const endStr = `${end.getFullYear()}-${String(end.getMonth() + 1).padStart(2, '0')}-${String(end.getDate()).padStart(2, '0')}`

            const response = await getLogsByRange(startStr,endStr)
            setLog(response)
            setStatus("success")
        }
        catch{
            setStatus("error")
        }
        finally{
            setLoading(false)
        }}
        fetch()
    }, [month]);

    return (
        <div className="min-h-screen flex flex-col px-4 py-6">
        <DayPicker
            month={month}
            animate={true}
            onMonthChange={setMonth}
            components={{
            Day: (props) => <CalendarDay {...props} logMap={logMap} onDayClick={onDayClick} />
            }}
        />
        <Divider sx={{ borderColor: "#d0d0e0", mt: 2, mx: -4 }} />
        {status==="error" && <Alert severity="error">Error fetching Entries.</Alert>}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '12px' }}>
            {legend.map((item, index) => (
                <li key={index} style={{ display: 'flex', alignItems: 'center', gap: '6px', listStyle: 'none' }}>
                    <div style={{ width: '12px', height: '12px', backgroundColor: legendColor[item], borderRadius: '3px' }} />
                    <span style={{ fontSize: '14px', fontWeight: 450, lineHeight: 1.2, color: '#6b6b8a' }}>{item}</span>
                </li>
            ))}
        </div>
        </div>
    );
}