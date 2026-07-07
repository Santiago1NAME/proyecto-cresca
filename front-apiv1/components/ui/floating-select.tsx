import Image from "next/image"
import { Label } from "@/components/ui/label"
import { InputGroup, InputGroupAddon } from "../ui/input-group"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const FloatingSelect = ({
    id,
    label,
    icon,
    iconRight,
    field,
    fieldState,
    options,
    isEdit
}: {
    id?: string
    label: string
    icon?: string
    iconRight?: boolean
    field: any
    fieldState: any
    options: { value: string; label: string }[],
    isEdit?: boolean,
}) => {
    const hasValue = !!field.value

    return (
        <InputGroup className={`
            py-6
            focus-within:ring-4
            focus-within:ring-blue-200
        `}>
            {/* Ícono a la izquierda (igual que FloatingInput con iconRight) */}
            {iconRight && icon ? (
                <InputGroupAddon aria-hidden="true" className="border-r-2 border-solid px-3">
                    <Image src={icon} alt="" width={20} height={20} />
                </InputGroupAddon>
            ) : null}

            {/* Label flotante: sube cuando hay valor seleccionado */}
            <Label
                htmlFor={id}
                className={`
                    absolute pointer-events-none z-10 transition-all
                    ${!iconRight ? "left-2" : "left-13.5"}
                    ${hasValue
                        ? "top-1 text-sm text-muted-foreground"
                        : "top-3 text-base text-muted-foreground"
                    }
                    ${fieldState.invalid ? "text-destructive" : ""}
                `}
            >
                {label}
            </Label>

            <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
            >
                <SelectTrigger
                    id={id}
                    data-invalid={fieldState.invalid}
                    aria-invalid={fieldState.invalid}
                    className={`
                        w-full h-auto pt-6 pb-2 border-0 shadow-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0
                        [&>svg]:absolute [&>svg]:right-3 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2
                        ${!iconRight ? "pl-2" : "pl-2"}
                    `}
                    disabled={isEdit}
                >
                {/* Placeholder vacío para no chocar con el label flotante */}
                <SelectValue placeholder="" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {options.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </InputGroup>
    )
}

export default FloatingSelect