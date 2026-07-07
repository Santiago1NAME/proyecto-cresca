"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Controller } from "react-hook-form";
import SubRoles from "./subRoles";
import { Roles } from "@/core/data/roles";
import { useRolesUser } from "./useRolesUser";
import Link from "next/link";

const RolesUser = ({ idUser }: { idUser: number }) => {
    const { form, subRoles, activeModules, handleSwitch, onSubmit, error } = useRolesUser(idUser);

    if (error)   return <p className="text-red-500">{error}</p>;

    return (
        <div className="w-full">
            <Card className="p-4">
                <CardContent>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="flex">
                            <div className="w-full border-r-2 border-gray-200 mr-10">
                                <h2 className="font-bold text-gray-700">Roles principales</h2>
                                {Roles.map((rol) => (
                                    <div className="flex items-center my-2" key={rol.valor}>
                                        <Controller name="roles" control={form.control} render={({ field }) => (
                                            <Switch
                                                checked={activeModules.includes(rol.valor)}
                                                onCheckedChange={(checked) => handleSwitch(rol.valor, checked, field.onChange)}
                                                className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-200"
                                            />
                                        )} />
                                        <label className="ml-2">{rol.modulo}</label>
                                    </div>
                                ))}
                            </div>
                            <Controller name="roles" control={form.control} render={({ field }) => (
                                <SubRoles
                                    subRoles={subRoles}
                                    checkedRoles={field.value}
                                    onChange={field.onChange}
                                />
                            )} />
                        </div>
                        <div className="flex justify-end">
                            <Link className="bg-gray-200 text-gray-700 mt-2 p-2 rounded hover:bg-gray-300 mr-3" href={`/dashboard/users/${idUser}`}>Cancelar</Link>
                            <button type="submit" className="bg-blue-500 text-white mt-2 p-2 rounded hover:bg-blue-600">Guardar</button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default RolesUser;