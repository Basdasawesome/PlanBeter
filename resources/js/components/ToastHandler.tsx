import { usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { toast } from "sonner";

const ToastHandler = () => {
    const { flash } = usePage().props as {
        flash?: {
            success?: string;
            error?: string
            info?: string
            warning?: string
            loading?: string
        };
    };

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success, {
                duration: 2000,
            });
        }

        if (flash?.error) {
            toast.error(flash.error, {
                duration: 5000,
            });
        }

        if (flash?.info) {
            toast.info(flash.info, {
                duration: 5000,
            });
        }

        if (flash?.warning) {
            toast.warning(flash.warning, {
                duration: 5000,
            });
        }

        if (flash?.loading) {
            toast.loading(flash.loading, {
                duration: 2000,
            });
        }
    }, [flash]);

    return null;
};

export default ToastHandler;