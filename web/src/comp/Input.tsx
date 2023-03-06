type InputProps = {
    label: string
    placeholder: string
    type?: string
    value: string
    name: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    error: boolean
    errorMsg: string
    required?: boolean
}

export const Input = ({
    label,
    placeholder,
    type = "text",
    value,
    name,
    onChange,
    error,
    errorMsg,
    required = false
}: InputProps) => {
    return (
        <label className="grid">
            <p className="ml-2 text-gray-50 text-base font-semibold tracking-wide">
                {label}
                {required && <span className="text-xs text-red-500 ml-1">*</span>}
            </p>
            <input
                type={type}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                className="
                rounded-full px-4 py-1 bg-slate-800 border-2 border-slate-900 font-xl
                focus:outline-none focus:border-sky-500 focus:bg-slate-900
                placeholder:text-sm placeholder:font-semibold
                w-full
                "
            />
            {error
                ? <p className="text-xs text-red-500 ml-2 mt-1">{errorMsg}</p>
                : null}
        </label>
    )
}
