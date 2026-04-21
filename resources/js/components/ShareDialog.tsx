import { router } from "@inertiajs/react";
import { Loader2Icon, Share2Icon } from "lucide-react";
import { useState } from "react";
import { create } from "@/routes/events/share";
import type { Event } from "@/types";
import Clipboard from "./Clipboard";
import { Button } from "./ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";

export default function ShareDialog({ event }: { event: Event }) {
    const [isOpen, setIsOpen] = useState(false);
    const [publicId, setPublicId] = useState<string | null>(event.public_id);
    const [isGenerating, setIsGenerating] = useState(false);

    const checkShare = (open: boolean): void => {
        setIsOpen(open);

        if (!open || publicId || isGenerating) {
            return;
        }

        setIsGenerating(true);

        router.post(create.url(event.id), {}, {
            preserveState: true,
            preserveScroll: true,
            showProgress: false,
            only: ["event", "flash"],
            onSuccess: (page) => {
                const updatedEvent = page.props.event as Event | undefined;

                if (updatedEvent?.public_id) {
                    setPublicId(updatedEvent.public_id);
                }
            },
            onFinish: () => {
                setIsGenerating(false);
            },
        });
    };

    const link = publicId ? `${window.location.origin}/share/${publicId}` : "";

    return (
        <Dialog open={isOpen} onOpenChange={checkShare}>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <Share2Icon className="size-4" />
                    Share
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                {isGenerating && (
                    <div className="absolute top-0 left-0 w-full h-full bg-white/50 z-10 flex items-center justify-center">
                        <Loader2Icon className="size-4 animate-spin" />
                    </div>
                )}
                <DialogHeader>
                    <DialogTitle>Share link</DialogTitle>
                    <DialogDescription>
                        Anyone who has this link will be able to view this event.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <InputGroup>
                            <InputGroupInput
                                id="link"
                                value={link}
                                readOnly
                                placeholder={isGenerating ? "Generating share link..." : "Open dialog to generate link"}
                            />
                            <InputGroupAddon
                                align="inline-end"
                            >
                                <Clipboard value={link} />
                            </InputGroupAddon>
                        </InputGroup>
                    </div>
                </div>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild className="ml-auto">
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}