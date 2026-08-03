import { Switch } from "@/components/ui/switch";

type SubRoles = Record<string, Record<string, string>>;

const SubRoles = ({
    subRoles,
    checkedRoles = [],
    onChange,
}: {
    subRoles: SubRoles;
    checkedRoles?: string[];
    onChange?: (roles: string[]) => void;
}) => {

    const handleSwitch = (valor: string, checked: boolean) => {
        const updated = checked
            ? [...checkedRoles, valor]
            : checkedRoles.filter(r => r !== valor);
        onChange?.(updated);
    };

    return (
        <div className="w-full">
            <h2 className="font-bold text-gray-700">Roles secundarios</h2>

            {Object.entries(subRoles).map(([modulo, roles]) => (
                <div key={modulo} className="mb-4">
                    <h3 className="font-semibold text-gray-600 border-b pb-1 mb-2">{modulo}</h3>
                    <div className="grid grid-cols-2">
                        {Object.entries(roles).map(([nombre, valor]) => (
                            <div className="flex items-center my-2" key={valor}>
                                <Switch
                                    checked={checkedRoles.includes(valor)}
                                    onCheckedChange={(checked) => handleSwitch(valor, checked)}
                                    className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-200"
                                />
                                <label className="ml-2">{nombre}</label>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SubRoles;