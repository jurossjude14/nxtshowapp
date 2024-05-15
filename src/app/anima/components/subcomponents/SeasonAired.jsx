'use client';

import Image from "next/image"
import {
    PlusCircle,
    MinusCircle,
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
import { useContext, useState } from 'react';
import { Datacontext } from "@/app/providers/UseContextProvider";
import { db } from "@/app/providers/IndexedDbQuery";
const {animelist} = db;

const SeasonAired = () => {

    const { objdata, setObjdata } = useContext(Datacontext);
    const [notif, setNotif] = useState(false);

    //Add Watchlist Function
    const addWatch = async (item) => {
        const { mal_id, title, images, episodes, aired, status, type } = item;
        const singleData = { mal_id, title, images, episodes, aired, status, type}
        setObjdata([...objdata, singleData]);
        await animelist.add({...singleData });
        setNotif(true);
        setTimeout(() => {
            setNotif(false);
        }, 2500);
        //console.log(objdata);
    }


    const today = new Date();

    const day = today.toLocaleDateString("en-US", { weekday: 'long' });
    const lowerCaseDay = day.toLowerCase();

    const req = `schedules?filter=${lowerCaseDay}`;
    const { isLoading, error, data: itemlist } = useQuery({
        queryKey: ['repoAiring'],
        queryFn: () => getAllshowing(req),
    })
    //console.log(itemlist);

    if (isLoading) return <>
        <div className='loading-cont'>
            <Skeleton className="h-[900px] w-[100%] rounded-xl" />
        </div>
    </>;
    if (error) return 'An error has occurred: ' + error.message

    return (
        <>
            {notif &&
                <Alert className="airing-list notify-box">
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
                                <Button variant="outline" size="sm" className="h-8 gap-1" onClick={() => addWatch(item)}>
                                    <PlusCircle className="h-3.5 w-3.5" />
                                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                        Add Watchlist
                                    </span>
                                </Button>
                            </span>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </>
    )
}

export default SeasonAired
