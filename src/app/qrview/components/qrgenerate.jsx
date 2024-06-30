
'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import QRCode from "qrcode"
import { useQuery } from '@tanstack/react-query'
import { Switch } from "@/components/ui/switch"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const formSchema = z.object({
    gentxt: z.string({
      message: "Please provide URL Data",
    }),
    leadres: z.string({
      required_error: "Please Select Lead ID.",
    })
  })

const qrgenerate = () => {
    const [src, setSrc] = useState('');
    const [filename, setFilename] = useState('QR Gen Image');
    const [switchfield, switchSetfield] = useState(false);

    const getLeadAll = async() => {
      const res = await fetch(`/webform/api/lead/`);
      return await res.json();
    }
    

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
        leadres: "",
        gentxt: "",
        },
    });

    const onSubmit = async (values) => {
        const singleObj = { ...values};
        const leadurl = `${process.env.NEXT_PUBLIC_LOCALIVE_API_URL}/webform/${singleObj.leadres}`;
        
        if(switchfield === false) {
            generatecode(leadurl);
            setFilename(singleObj.leadres);
        }

        if(switchfield === true) {
            generatecode(singleObj.gentxt);
            setFilename(singleObj.gentxt);
        }
      }

    const generatecode = (genOne) => {
        const opts = {
            errorCorrectionLevel: 'H',
            type: 'image/jpeg',
            quality: 0.3,
            width:320,
            margin: 1,
          }
        QRCode.toDataURL(genOne,opts).then(setSrc);
    }

    const switching = () => {
        switchSetfield(!switchfield);
        form.reset();
    }

    
    const { isLoading, error, data: itemlist } = useQuery({
        queryKey: ['restGetLead'],
        queryFn: () => getLeadAll(),
    })

    if (isLoading) return 
    <>
    <div className='loading-cont-white'>
        <h1>Loading Data...</h1>
        <Skeleton className="h-[900px] w-[100%] rounded-xl" />
    </div>
    </>;
    if (error) return 'An error has occurred: ' + error.message

    return (
        <>
            <div className="mx-auto grid w-[350px] gap-6">
                <div className="grid gap-2 text-center">
                    <h1 className="text-3xl font-bold">QR Generator</h1>
                    <span className="toggle-field">
                      <h4>Switch to {switchfield ? (<span>Field QR</span>):(<span>Lead QR</span>)}</h4>
                      <Switch
                        checked={switchfield}
                        onCheckedChange={()=>switching()}
                      />
                    </span>
                </div>
                <div className="grid gap-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} >

                   {switchfield ? (     
                    <FormField
                      control={form.control}
                      name="gentxt"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="Provide URL Data" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />  
                    ):(
                    <FormField
                        control={form.control}
                        name="leadres"
                        render={({ field }) => (
                          <FormItem>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Please Select Lead ID" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                              {itemlist.data?.map((item, index) => (
                                    <SelectItem key={index} value={item._id}>{item._id}-({item.datelog})</SelectItem>
                                ))} 
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      /> 
                    )}
                    <Button type="submit" className="w-full qr-full">
                        Generate QR Code
                    </Button>
                   </form> 
                </Form>       
                </div>
                <div className="mt-4 text-center text-sm qr-cont">
                  {src? (
                     <TooltipProvider>
                     <Tooltip>
                       <TooltipTrigger asChild>
                          <a href={src} download={filename}><img src={src} width="100%"/></a>
                       </TooltipTrigger>
                       <TooltipContent>
                         <p>Click QR Image to Download</p>
                       </TooltipContent>
                     </Tooltip>
                   </TooltipProvider>
                  ):(                     
                <span className="placeimage">
                    <span className="placecontent">
                        QR PREVIEW HERE
                        <span className="imgicon">
                            🎲
                        </span>
                    </span>
                </span> 
                  )}
 
                </div>
            </div>
        </>
    )
}

export default qrgenerate
