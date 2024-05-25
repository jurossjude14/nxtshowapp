import Link from "next/link"

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    ListFilter,
} from "lucide-react"

import Watchlist from "./subcomponents/Watchlist";
import SeasonList from './subcomponents/SeasonList';
import SeasonAired from './subcomponents/SeasonAired';
import { useState } from "react"

import { useLiveQuery } from 'dexie-react-hooks'
import { db } from "@/app/providers/IndexedDbQuery";
const {animelist} = db;

const today = new Date();
const day = today.toLocaleDateString("en-US", { weekday: 'long' });

const Animefeed = () => {
    const [daynow, setDaynow] = useState(day);
    const days = ["monday","tuesday","wednesday","thursday","friday","saturday","sunday"];
    const allItems = useLiveQuery(() => animelist.toArray(), [])
    
    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                    <Breadcrumb className="hidden md:flex">
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href="#">Home</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href="#">Anima</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>
                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                    <Tabs defaultValue="airing">
                        <div className="flex items-center">
                            <TabsList>
                                <TabsTrigger value="all">All</TabsTrigger>
                                <TabsTrigger value="airing">Now Airing</TabsTrigger>
                            </TabsList>
                            <div className="ml-auto flex items-center gap-2">
                                <Watchlist allItems={allItems} />
                            </div>
                        </div>
                        <TabsContent value="all" className="box-parent">
                            <Card x-chunk="dashboard-06-chunk-0">
                                <CardHeader>
                                    <CardTitle>Anima Library</CardTitle>
                                    <CardDescription>
                                        Here's the latest anime for this season (we have only max 25 results)
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <SeasonList allItems={allItems} />
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="airing" className="box-parent">
                            <Card x-chunk="dashboard-06-chunk-0">
                                <CardHeader>
                                    <CardTitle className="filter-heading">
                                        Airing Today: {daynow}
                                        <span className="select-weekdays">
                                            <DropdownMenu >
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="outline" size="sm" className="h-8 gap-1">
                                                        <ListFilter className="h-3.5 w-3.5" />
                                                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap text-cap">
                                                            Day: {daynow}
                                                        </span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                                                    <DropdownMenuSeparator />
                                                    {days.map((day, index) => (<DropdownMenuCheckboxItem key={index} onClick={()=>setDaynow(day)} className="text-cap">{day}</DropdownMenuCheckboxItem>))}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </span>
                                    </CardTitle>
                                    <CardDescription>
                                        Here's the Daily Anime Showing
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <SeasonAired daynow={daynow} allItems={allItems}/>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </main>
            </div>
        </div>
    )
}
export default Animefeed
