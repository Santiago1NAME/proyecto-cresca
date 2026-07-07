import { useState, useEffect } from "react";
import requestGet from "@/core/services/requestGet";
import { getToken } from "@/core/actions/auth";

export const useUsers = () => {
    const [users, setUsers] = useState<any>(null);
    const [cantItems, setCantItems] = useState(10);
    const [page, setPage] = useState(1);

    const loadUsers = async () => {
        const token = await getToken();
        const data = await requestGet(
            `http://localhost:3000/api/v1/users/?page=${page}&limit=${cantItems}`,
            { token: token || "" }
        );
        setUsers(data);
    };

    useEffect(() => {
        loadUsers();
    }, [page, cantItems]);

    return { users, page, setPage, cantItems, setCantItems, loadUsers };
};