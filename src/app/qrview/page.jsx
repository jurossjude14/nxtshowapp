


import dynamic from 'next/dynamic'

const Qrgenerate = dynamic(() => import('./components/qrgenerate'), { ssr: false })
const Qrscanner = dynamic(() => import('./components/qrscanner'), { ssr: false })

import Link from "next/link"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"


const page = () => {
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
                <Link href="/qrview/">QR View</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </BreadcrumbList>
        </Breadcrumb>
      </header>        
        <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
            <div className="flex items-center justify-center py-12">
                <Qrgenerate />
            </div>
            <div className="flex items-center justify-center py-12 bg-muted">
                <Qrscanner />
            </div>
        </div>
    </>    
    )
}

export default page
