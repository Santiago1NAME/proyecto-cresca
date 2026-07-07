import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const ToolTipTableOptions = (
    {
        userId,
        tittle,
        side = 'top',
        children,
        className,
        onClick
    }:
    {
        userId: number,
        tittle: string,
        side?: any,
        children: any,
        className: string,
        onClick?: () => void;
    }
) => {

    const handleClick = (e: React.MouseEvent) => {
        if (onClick) {
            e.preventDefault();
            onClick();
        }
    };

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Link href={`/dashboard/users/${userId}`} className={className} onClick={handleClick}>
                    {children}
                </Link>
            </TooltipTrigger>
            <TooltipContent side={side}>
                <p>{ tittle }</p>
            </TooltipContent>
        </Tooltip>
    )
}

export default ToolTipTableOptions;