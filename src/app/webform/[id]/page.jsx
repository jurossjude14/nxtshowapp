
import Leadget from "../components/Leadget"
import Image from "next/image"
import Link from "next/link"

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"

const webleadget = ({params:{id}}) => {
  return (
    <>
      <header className="sticky global-menu top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Breadcrumb className="hidden md:flex">
          <BreadcrumbList>
          <BreadcrumbItem>
              <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
              </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
              <BreadcrumbLink asChild>
              <Link href="/webform/">Web Lead Form</Link>
              </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          </BreadcrumbList>
      </Breadcrumb>
  </header>
  <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2">
      <div className="flex main-cont-result-lead justify-center">
        <div className="mx-auto grid w-[610px] gap-6">
          <Leadget lid={id}/>
          </div>
      </div>
  </div>
    </>
  )
}

export default webleadget
