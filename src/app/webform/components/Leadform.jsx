'use client';

import Image from "next/image"
import Link from "next/link"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { Button } from "@/components/ui/button"

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

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { db } from "@/app/providers/IndexedDbQuery";

const { leadlist } = db;

import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";

const restdbapikey = process.env.RESTDB_API_KEY;
console.log('Rest DB KEY:', restdbapikey);

const restdbapiurl = process.env.RESTDB_API_URL;
console.log('Rest DB KEY:', restdbapiurl);


const formSchema = z.object({
  fullname: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().min(2, {
    message: "Input Email Address",
  }),
  phone: z.string().min(2, {
    message: "Input Correct Phone",
  }),
  webservice: z.string({
    required_error: "Please Select of Tyoe Service.",
  }),
  desc: z.string().min(10, {
    message: "Desc must be at least 10 characters.",
  })
    .max(160, {
      message: "Desc must not be longer than 30 characters.",
    }),
})

const today = new Date();
const day = today.toDateString();



const Leadform = () => {

  const { toast } = useToast()

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      email: "",
      phone: "",
      webservice: "",
      desc: "",
    },
  })


  const mutation = useMutation({
    mutationFn: (values) => {
      return fetch('/webform/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
    },
    onSuccess: async () => {
      toast({
        title: "Data added",
        description: "Kindly check if your data is on indexedDB",
      })
    }
  })


  // 2. Define a submit handler.
  const onSubmit = async (values) => {
    const singleObj = { ...values, datelog: day };
    mutation.mutate({ ...singleObj });
    await db.leadlist.add({ ...singleObj });

    form.reset();
    setTimeout(() => {
      mutation.reset();
    }, 1300);
  }
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
      <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
        <div className="flex items-center justify-center py-12">
          <div className="mx-auto grid w-[500px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Web Lead Form</h1>
              <p className="text-balance text-muted-foreground">
                kindly fillup the form below, we can evaluate your request
              </p>
            </div>
            <div className="grid gap-4 cs-form">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <FormField
                    control={form.control}
                    name="fullname"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Fullname" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Phone" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="webservice"
                    render={({ field }) => (
                      <FormItem>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Type of Service" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Web Fix">Web Fix</SelectItem>
                            <SelectItem value="Website Creation">Website Creation</SelectItem>
                            <SelectItem value="Web Master">Web Master</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="desc"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            placeholder="Tell me more about your inquiry.."
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="cs-btn-expand">Submit</Button>
                  {mutation.isLoading ? (<div>Adding Data...</div>) : null}
                  {mutation.isError ? (<div>An error occurred: {mutation.error.message}</div>) : null}
                </form>
              </Form>
            </div>
          </div>
        </div>
        <div className="hidden bg-muted lg:block">
          <Image
            src="/web-dev.jpg"
            alt="Image"
            width="1920"
            height="1080"
            className="h-full w-full object-cover dark:brightness-[0.6] dark:grayscale"
          />
        </div>
      </div>
    </>

  )
}

export default Leadform
