'use client';

import {
    PlusCircle,
    MinusCircle,
    Monitor,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

import { deleteWatch } from "../../animaApi";

const Watchlist = ({ allItems }) => {

    return (
        <>
            <Drawer>
                <DrawerTrigger asChild>
                    <Button size="lg" className="h-10 gap-1 mb-2">
                        <Monitor className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            My Watchlist<small className="btn-note">Press Space Fullview</small>
                        </span>
                    </Button>
                </DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>My Watchlist</DrawerTitle>
                        <ScrollArea className="cs-watchlist-cont whitespace-nowrap">
                            <DrawerDescription>
                                <span className="parentWatchlist">
                                    {!allItems?.length && <span className="center-align">You've not added any anime yet.</span>}
                                    {allItems?.map((item, index) => (
                                        <span className="image-watch-child" key={index}>
                                            <span className="eachImg">
                                                <img src={item.images.webp.image_url} alt={item.title} width="100%" height="auto" />
                                            </span>
                                            <span className="eachTitle">
                                                {item.title}
                                            </span>
                                            <span className="eachFeat">
                                                <span className="airedString">{item.aired.string}</span>
                                                <span className="eachStatus">{item.status}</span>
                                                <span className="eachType">EPS: {item.episodes} {item.type}</span>
                                                <span className="btn-remove">
                                                    <Button variant="outline" size="sm" className="h-8 gap-1" onClick={() => deleteWatch(item.id)}>
                                                        <MinusCircle className="h-3.5 w-3.5" />
                                                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                                            Remove
                                                        </span>
                                                    </Button>
                                                </span>
                                            </span>
                                        </span>
                                    ))}
                                </span>
                            </DrawerDescription>
                            <ScrollBar orientation="horizontal" />
                            <ScrollBar orientation="vertical" />
                        </ScrollArea>
                    </DrawerHeader>
                    <DrawerFooter>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default Watchlist
