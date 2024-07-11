
"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
} from "@/components/ui/alert-dialog"



const PopupForm = ({ open, setOpen, children }) => {

    return (
        <>
            <AlertDialog open={open} onOpenChange={setOpen} className="custom-pop-width-form">
                <AlertDialogContent className="custom-pop-width-full">
                    <AlertDialogHeader>
                        {children}
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction className="close-pop">Close</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export default PopupForm
