import { Clipboard as ClipboardIcon, ClipboardCheck } from 'lucide-react';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

interface ClipboardProps {
    value?: string | null;
    ariaLabel?: string;
    ariaLabelCopied?: string;
    className?: string;
}

// If svg is inside a button add "[&_svg]:pointer-events-auto" to the button class

export default function Clipboard({ value, ariaLabel = 'Kopieer', ariaLabelCopied = 'Gekopieerd', className = 'ml-auto size-4 cursor-pointer' }: ClipboardProps) {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = (): void => {
        if (!value) {
            return;
        }

        navigator.clipboard?.writeText(value).then(() => {
            setCopied(true);
        }).catch(() => {
            console.error('Failed to copy to clipboard');
        });
    };

    useEffect(() => {
        if (copied) {
            const timer = setTimeout(() => {
                setCopied(false);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [copied]);

    if (copied) {
        return (
            <ClipboardCheck
                className={`${className} text-green-600`}
                role="button"
                tabIndex={0}
                aria-label={ariaLabelCopied}
            />
        );
    }

    return (
        <ClipboardIcon
            className={`${className} text-gray-500 hover:text-gray-700`}
            onClick={(event) => {
                event.stopPropagation();
                copyToClipboard();
            }}
            role="button"
            tabIndex={0}
            aria-label={ariaLabel}
            onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    copyToClipboard();
                }
            }}
        />
    );
}
