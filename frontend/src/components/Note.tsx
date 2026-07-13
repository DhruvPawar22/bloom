import { TextField } from "@mui/material"

type MedicationsProps = {
    note:string,
    onChange:(note:string)=>void
}

export function Note({note,onChange}:MedicationsProps)
{
    return (
        <div className="w-full rounded-[16px] bg-white p-4">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-[#1a1a2e] mb-1">Notes</p>
                    <p className="text-xs text-[#6b6b8a]">Optional</p>
                </div>
            </div>
                <TextField
                    type="text"
                    multiline
                    size="small"
                    maxRows={6}
                    value={note}
                    onChange={(e)=>onChange(e.target.value)}
                    placeholder="Anything else to note..."
                    fullWidth
                    sx={{
                        mt: 2,
                        "& .MuiOutlinedInput-root": {
                            borderRadius: "14px",
                            backgroundColor: "#fafafc",
                            fontSize: "0.875rem",
                            "& fieldset": { borderColor: "#e8e8f0" },
                            "&:hover fieldset": { borderColor: "#e85d75" },
                            "&.Mui-focused fieldset": { borderColor: "#e85d75" },
                        },
                        "& .MuiInputBase-input::placeholder": { color: "#b3b3c0", opacity: 1 },
                    }}
                />
        </div>
    )
}