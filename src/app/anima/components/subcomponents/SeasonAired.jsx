'use client';

import Image from "next/image"
import {
    PlusCircle,
    Monitor,
    Rocket
} from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getAllshowing } from "../../animaApi"
import { useQuery } from '@tanstack/react-query'
import { Skeleton } from "@/components/ui/skeleton"
import { useState } from 'react';
import { addWatchdb } from "../../animaApi";
import PopupView from "./PopupView";


const SeasonAired = ({daynow, allItems}) => {


    const [notif, setNotif] = useState(false);
    const [selecteditem, setSelecteditem] = useState({});
    const [open, setOpen] = useState(false);

    const addWatch = async (item) => {
            await addWatchdb(item);
            setNotif(true);
            setTimeout(() => {
                setNotif(false);
            }, 3000);
        
    }

    //Viewlist Function
    const viewData = (item) => {
        setSelecteditem(item);
        setOpen(true);
    }

    const req = `schedules?filter=${daynow}`;
    const { isLoading, error, data: itemlist } = useQuery({
        queryKey: ['repoAiring',daynow],
        queryFn: () => getAllshowing(req),
    })

    if (isLoading) return <>
        <div className='loading-cont'>
            <Skeleton className="h-[900px] w-[100%] rounded-xl" />
        </div>
    </>;
    if (error) return 'An error has occurred: ' + error.message

    return (
        <>
            {notif &&
                <Alert className="airing-list notify-box elementToFadeInAndOut">
                    <Rocket className="h-4 w-4" />
                    <AlertTitle>Heads up!</AlertTitle>
                    <AlertDescription>
                        Your Anime is now added to your watchlists
                    </AlertDescription>
                </Alert>
            }
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-5">
                {itemlist.data?.map((item, index) => (
                    <Card x-chunk="dashboard-01-chunk-0" key={index}>
                        <div className="img-container">
                            <Image
                                alt="Product image"
                                className="aspect-square rounded-md object-cover"
                                src={item.images.webp.large_image_url}
                                width={0}
                                height={0}
                                sizes="100vw"
                                style={{ width: '100%', height: 'auto' }} // optional
                            />
                        </div>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-lg font-medium">
                                {item.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-md title-summary">{item.status}| EPS {item.episodes} | {item.aired.string} | {item.season} </div>
                            <p className="text-xs text-muted-foreground">
                                {item.synopsis && item.synopsis.substring(0, 100)}
                            </p>
                            <span className="btn-remove">
                                <Button variant="outline" size="sm" className="h-8 gap-1" onClick={() => addWatch(item)} disabled={allItems?.some((one) => one.mal_id === item.mal_id)}>
                                    <PlusCircle className="h-3.5 w-3.5" />
                                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                        Watchlist
                                    </span>
                                </Button>
                                <Button variant="secondary" size="sm" className="h-8 gap-1" onClick={() => viewData(item)}>
                                    <Monitor className="h-3.5 w-3.5" />
                                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                        View
                                    </span>
                                </Button>
                            </span>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <PopupView open={open} setOpen={setOpen} selecteditem={selecteditem}/>
        </>
    )
}

export default SeasonAired
