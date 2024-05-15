'use client';

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Image from "next/image"
import {
    MoreHorizontal,
    ListFilter,
    Rocket
} from "lucide-react"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Skeleton } from "@/components/ui/skeleton"
import { getAllshowing } from '../../animaApi';
import { useQuery } from '@tanstack/react-query'
import { useContext, useState } from 'react';
import { Datacontext } from "@/app/providers/UseContextProvider";
import { db } from "@/app/providers/IndexedDbQuery";
const {animelist} = db;

const SeasonList = () => {
    const { objdata, setObjdata } = useContext(Datacontext);
    const [searchdata, setSearchData] = useState('movie');
    const [numresult, setNumresult] = useState(5);
    const [buttonStates, setButtonStates] = useState({});
    const [notif, setNotif] = useState(false);

    const filterAnmime = (search) => {
        setSearchData(search);
        refetch();
    }


    //Add Watchlist Function
    const addWatch = async (item, index) => {
        const { mal_id, title, images, episodes, aired, status, type } = item;
        const singleData = { mal_id, title, images, episodes, aired, status, type}
        setObjdata([...objdata, singleData]);
        setButtonStates((prevStates) => ({
            ...prevStates,
            [index]: { clicked: true, disabled: !prevStates[index]?.disabled }, // Toggle disabled state
        }));
        await animelist.add({...singleData });
        setNotif(true);
        setTimeout(() => {
            setNotif(false);
        }, 2500);
    }

    const req = `seasons/now?filter=${searchdata}&limit=${numresult}`;
    const { isLoading, error, refetch, data: itemlist } = useQuery({
        queryKey: ['repoAllshowing', searchdata,numresult],
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
            <Alert className="notify-box">
                <Rocket className="h-4 w-4" />
                <AlertTitle>Heads up!</AlertTitle>
                <AlertDescription>
                    Your Anime is now added to your watchlists
                </AlertDescription>
            </Alert>
            }

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="hidden w-[100px] sm:table-cell">
                            <span className="sr-only">Image</span>
                        </TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="hidden md:table-cell">
                            Episodes
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                            Duration
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                            Scheduled
                        </TableHead>
                        <TableHead className="action-list">
                            <span className="sr-only">Actions</span>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="sm" className="h-8 gap-1">
                                        <ListFilter className="h-3.5 w-3.5" />
                                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                            Filter: {searchdata}
                                        </span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start">
                                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuCheckboxItem onClick={() => filterAnmime('movie')}>
                                        Movie
                                    </DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem onClick={() => filterAnmime('tv')}>TV</DropdownMenuCheckboxItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                        <span className="numresults">
                            <DropdownMenu >
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="sm" className="h-8 gap-1">
                                        <ListFilter className="h-3.5 w-3.5" />
                                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                            Results: {numresult}
                                        </span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Results by</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuCheckboxItem onClick={() => setNumresult(10)}>
                                        10
                                    </DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem onClick={() => setNumresult(15)}>15</DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem onClick={() => setNumresult(25)}>25</DropdownMenuCheckboxItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            </span>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {itemlist.data?.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell className="hidden sm:table-cell">
                                <HoverCard>
                                    <HoverCardTrigger>
                                        <Image
                                            alt="Product image"
                                            className="aspect-square rounded-md object-cover"
                                            height="64"
                                            src={item.images.webp.large_image_url}
                                            width="64"
                                        />
                                    </HoverCardTrigger>
                                    <HoverCardContent>
                                        <Image
                                            width={0}
                                            height={0}
                                            sizes="100vw"
                                            alt="Product Preview"
                                            style={{ width: '100%', height: 'auto' }} // optional
                                            src={item.images.webp.large_image_url}
                                        />
                                        <h3>{item.title}</h3>
                                        <span className='cs-desc-img'>{item.synopsis}</span>
                                    </HoverCardContent>
                                </HoverCard>
                            </TableCell>
                            <TableCell className="font-medium">
                                {item.title.substring(0, 20)}
                                {item.synopsis && <span className='cs-desc-img'>{item.synopsis.substring(0, 50)}</span>}
                            </TableCell>
                            <TableCell>
                                <Badge variant="outline">{item.status}</Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                                {item.episodes}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                                {item.duration}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                                {item.aired.string}
                            </TableCell>
                            <TableCell>
                              <span className="cs-dot-btn"> 
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            aria-haspopup="true"
                                            size="icon"
                                            variant="ghost"
                                        >
                                            <MoreHorizontal className="h-6 w-6" />
                                            <span className="sr-only">Toggle menu</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                        <DropdownMenuItem onClick={() => addWatch(item, index)} >{buttonStates[index]?.clicked ? 'Bookmark' : 'Bookmark'}</DropdownMenuItem>
                                        <DropdownMenuItem >View</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                </span>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>

            </Table>
        </>
    )
}

export default SeasonList
