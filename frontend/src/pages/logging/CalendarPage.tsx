import { useState,useEffect,useMemo } from "react";
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import { getLogsByRange } from "../../api/log";
import { useNavigate } from "react-router-dom";
import { type LogOutput } from "../../types";
import Alert from '@mui/material/Alert';
import { CalendarDay } from "../../components/CalenderDay";

export function CalenderPage()
{
    const [month, setMonth] = useState(new Date());
    const [status, setStatus] = useState<"success" | "error" | null>(null)
    const [loading, setLoading] = useState(false)
    const [log,setLog] = useState<LogOutput[]>([])

    const Navigate = useNavigate();
    const logMap = useMemo(() => new Map(log.map(l => [l.date, l])), [log])

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
        <div>
        <DayPicker
            month={month}
            animate={true}
            onMonthChange={setMonth}
            components={{
            Day: (props) => <CalendarDay {...props} logMap={logMap} onDayClick={onDayClick} />
            }}
        />
        {status==="error" && <Alert severity="error">Error fetching Entries.</Alert>}
        </div>
    );
}