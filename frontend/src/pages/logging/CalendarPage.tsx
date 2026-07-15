import { useState,useEffect } from "react";
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import { getLogsByRange } from "../../api/log";
import { useNavigate } from "react-router-dom";

export function CalenderPage()
{
    const [month, setMonth] = useState(new Date());
    const [status, setStatus] = useState<"success" | "error" | null>(null)
    const [loading, setLoading] = useState(false)
    const Navigate = useNavigate();

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

            await getLogsByRange(startStr,endStr)
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
        <DayPicker
        onDayClick={onDayClick}
            month={month}
            animate={true}
            onMonthChange={setMonth}
        />
    );
}