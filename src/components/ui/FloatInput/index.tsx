export function FloatInput({children, ...rest}){
    return(
        <label
            htmlFor={rest.id}
            className="relative block overflow-hidden border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 mb-4"
            >
            <input
                {...rest}
                placeholder={children}
                className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
            />

            <span
                className="absolute start-3 top-3 -translate-y-1/2 text-xs text-blue-900 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-sm"
            >
                {children}
            </span>
        </label>
    )
}