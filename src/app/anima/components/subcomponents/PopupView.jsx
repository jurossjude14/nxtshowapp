
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import Image from "next/image"

const PopupView = ({open,setOpen,selecteditem}) => {
    return (
        <>
            <AlertDialog open={open} onOpenChange={setOpen} className="custom-pop-width">
                <AlertDialogContent className="custom-pop-width-full">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Preview Anime Details</AlertDialogTitle>
                        <AlertDialogDescription>
                            <span className="grid-popup">
                                <span className="child-popup first">
                                    <span className="byblock title">{selecteditem.title}</span>
                                    <span className="feat-top">
                                        <span className="byblock status">{selecteditem.status}</span>
                                        {selecteditem.broadcast?.day &&
                                            <span className="byblock broacast">{selecteditem.broadcast?.day}</span>
                                        }
                                        <span className="byblock eps">Episode list: {selecteditem?.episodes}</span>
                                    </span>
                                    <span className="iframe-holder">
                                        {selecteditem.trailer?.embed_url ?
                                            <iframe
                                                src={selecteditem.trailer?.embed_url}
                                                width="100%"
                                                height="400"
                                                allowFullScreen
                                                title="Embedded Content"
                                            /> :
                                            <Image
                                                width={0}
                                                height={0}
                                                sizes="100vw"
                                                alt="Product Preview"
                                                style={{ width: '100%', height: 'auto' }} // optional
                                                src={selecteditem.images?.webp.large_image_url}
                                            />
                                        }
                                    </span>
                                </span>
                                <span className="child-popup second">
                                    <span className="cont-grid">
                                        <span className="byblock rating">{selecteditem.rating}</span>
                                        <span className="byblock season">{selecteditem.season}</span>
                                        <span className="byblock type">{selecteditem.type}</span>
                                    </span>
                                    <span className="byblock synopsis">{selecteditem.synopsis?.substring(0, 1000)}..</span>
                                    <span className="byblock genres">
                                        {selecteditem.genres?.map((item, index) =>
                                            (<span className="byblock genre" key={index}>{item.name}</span>)
                                        )}
                                    </span>
                                </span>
                            </span>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction>Close</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export default PopupView
