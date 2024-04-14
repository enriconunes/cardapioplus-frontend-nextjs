import { useState } from "react";

export function FloatInputContact({children, onChange, ...rest}){
    const [formattedValue, setFormattedValue] = useState('');

    const handleInputChange = (event) => {
        const rawValue = event.target.value.replace(/\D/g, ''); // Remove tudo que não for número
        let formattedNumber = '';

        if (rawValue.length <= 2) {
            formattedNumber = rawValue;
        } else if (rawValue.length <= 6) {
            formattedNumber = `(${rawValue.slice(0, 2)}) ${rawValue.slice(2)}`;
        } else if (rawValue.length <= 11) {
            formattedNumber = `(${rawValue.slice(0, 2)}) ${rawValue.slice(2, 7)}-${rawValue.slice(7)}`;
        } else {
            formattedNumber = `(${rawValue.slice(0, 2)}) ${rawValue.slice(2, 7)}-${rawValue.slice(7, 11)}`;
        }

        setFormattedValue(formattedNumber);
        onChange && onChange(rawValue); // Passa o valor formatado para o callback onChange, se existir
    };

    return(
        <label
            htmlFor={rest.id}
            className="relative block overflow-hidden border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 mb-4"
        >
            <input
                {...rest}
                value={formattedValue}
                placeholder={children}
                onChange={handleInputChange}
                maxLength={15} // Define o comprimento máximo do input
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
