"use client"

import { useTheme } from "next-themes";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDown, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"


export default function Home() {
  const [themecolor, setThemecolor] = useState(false);
  const { setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const switchtheme = () => {
    setThemecolor(!themecolor);
    if (themecolor == true) {
      setTheme("dark");
    } else {
      setTheme("light")
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex cs-home-top">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Visit: &nbsp;
          <code className="font-mono font-bold">https://nxtshowapp.vercel.app/</code>
        </p>
        <div className="flex items-center space-x-2">
            <Switch id="airplane-mode" checked={themecolor} onCheckedChange={() => switchtheme()} />
            <Label htmlFor="airplane-mode">Switch to: Dark/Light</Label>
          </div>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <Collapsible 
                        open={isOpen}
                        onOpenChange={setIsOpen}
                        className="w-[350px] space-y-2 contact-collapse "
                      >
                        <div className="flex items-center justify-between space-x-4 px-4">
                          <h4 className="text-sm font-semibold cs-label">
                            Contact Information
                          </h4>
                          <CollapsibleTrigger asChild>
                            <Button variant="ghost" size="sm" className="w-9 p-0 cs-home-btn">
                              <ChevronsUpDown className="h-4 w-4" />
                              <span className="sr-only">Toggle</span>
                            </Button>
                          </CollapsibleTrigger>
                        </div>
                        <div className="rounded-md border px-4 py-3 font-mono text-sm">
                          @Phone: <a href="tel:09260551289">+639260551289</a>
                        </div>
                        <CollapsibleContent className="space-y-2">
                          <div className="rounded-md border px-4 py-3 font-mono text-sm">
                          @Email: <a href="mailto:jurosswebtwopointzero@gmail.com">jurosswebtwopointzero@gmail.com</a>
                          </div>
                          <div className="rounded-md border px-4 py-3 font-mono text-sm">
                            @Github: <a href="https://github.com/jurossjude14">jurossjude14</a>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
        </div>
      </div>

      <div className="main-block">
        <div>
          <Card
            className="overflow-hidden" x-chunk="dashboard-05-chunk-4"
          >
            <CardHeader className="flex flex-row items-start bg-muted/50">
              <div className="grid gap-0.5">
                <CardTitle className="group flex items-center gap-2 text-lg">
                  JUROSS JUDE MADRID
                </CardTitle>
                <CardDescription>
                  Web and Frontend Developer
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-6 text-sm">
              <div className="grid gap-3">
                <div className="font-semibold">MY INFORMATION</div>
                <dl className="grid gap-3">
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">Love to create websites and explore new technologies can upskill my profile. Looking forward to work with you. Im web developer with over 5 years of Wordpress experience and passion for responsive website design and a problem solver to innovate new ideas that can create great website.</dt>
                  </div>
                </dl>
              </div>
              <Separator className="my-4" />
              <div className="grid gap-3">
                <div className="font-semibold">SKILL EXPERIENCE</div>
                <dl className="grid gap-3">
                  <div className="flex items-center justify-between">
                    <dt className="flex items-center gap-1 text-muted-foreground">
                      <Badge variant="secondary">Wordpress</Badge> <Badge variant="secondary">Reactjs</Badge> <Badge variant="secondary">Nextjs</Badge> <Badge variant="secondary">PHP</Badge> <Badge variant="secondary">JS</Badge> <Badge variant="secondary">CSS</Badge>
                    </dt>
                  </div>
                </dl>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left app-list">
        <a
          href="/anima/"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            ✪ Anima APP{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Your Latest Anime Libray & Current on air show.
          </p>
        </a>

        <a
          href="/webform/"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800 hover:dark:bg-opacity-30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            ✪ Web Form {" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            A lead form that has each steps section and submitted to 3rd party integration
          </p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            ✪ Templates{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Explore starter templates for Next.js.
          </p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            ✪ Deploy{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50 text-balance`}>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
  );
}
