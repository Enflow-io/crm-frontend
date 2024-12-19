"use client";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import Api from "../../services/Api";
import * as Lockr from "lockr";
import { useEvent } from "../../hooks/core";
import { User } from "../../services/types";

const useSession = () => {
    const router = useRouter();
    const [session, setSession] = useState<User | null>(null);
    const logout = useEvent(() => {
        Lockr.rm("user");
        router.replace("/login");
    });

    useEffect(() => {
        Api.getCurrentUser()
            .then((res) => {
                setSession(res);
            })
            .catch(logout);
    }, [logout]);
    return [session] as const;
};

export const AuthGuard = ({ children }: { children?: ReactNode }) => {
    const [session] = useSession();
    if (session === null) {
        return null;
    }
    return <>{children}</>;
};
