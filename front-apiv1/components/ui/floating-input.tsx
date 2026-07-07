"use client"

import Image from "next/image";
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group";
import { Label } from "@/components/ui/label";

export function FloatingInput({
    id,
    type,
    label,
    icon,
    iconRight,
    field,
    fieldState,
    isEdit,
}: {
    id: string
    type: string
    label: string
    icon?: string
    iconRight?: boolean,
    field: any,
    fieldState: any,
    isEdit?: boolean,
}) {
    return (
        <InputGroup className="py-6">
            <InputGroupInput
                {...field}
                id={id}
                type={type}
                name={field.name}
                placeholder=" "
                data-invalid={fieldState.invalid}
                aria-invalid={fieldState.invalid}
                className={`peer ${!iconRight ? 'pl-2' : 'pl-10'} pt-6 pb-2 w-full ${ !isEdit ? 'text-bloack' : 'text-muted-foreground'}`}
                disabled={isEdit}
            />
            <Label
                htmlFor={id}
                className={`absolute ${!iconRight ? 'left-2' : 'left-13.5'} top-1 text-sm text-muted-foreground transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm peer-focus:text-primary`}
            >
                {label}
            </Label>
            {iconRight && icon ? (
                <InputGroupAddon aria-hidden="true" className="border-r-2 border-solid px-3">
                    <Image src={icon} alt="" width={20} height={20} />
                </InputGroupAddon>
            ) : null}
        </InputGroup>
    )
}