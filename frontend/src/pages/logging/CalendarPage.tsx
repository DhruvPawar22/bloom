import { useState } from "react";
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'

export function CalenderPage()
{
    const [month, setMonth] = useState(new Date());

    return (
        <DayPicker
            month={month}
            animate={true}
            onMonthChange={setMonth}
        />
    );
}