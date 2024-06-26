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
import { useForm, useFieldArray } from "react-hook-form"
import { z } from "zod"
import { PackagePlusIcon, MinusCircle} from "lucide-react"

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

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { db } from "@/app/providers/IndexedDbQuery";

const { leadlist } = db;

import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";



const formSchema = z.object({
  fullname: z.string().min(5, {
    message: "Fullname must be at least 5 characters.",
  }),
  email: z.string().email({ message: "Invalid Email Address" }),
  phone: z.string().min(5, {
    message: "Input Correct Phone",
  }),
  website: z.string().url({ message: "Invalid Website Url" }),
  webservice: z.string({
    required_error: "Please Select of Type of Service.",
  }),
  desc: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  })
    .max(160, {
      message: "Description must not be longer than 30 characters.",
    }),
  refer: z.enum(["socials", "webmail", "searching"], {
    required_error: "You need to select where do you find my profile.",
  }),
  other: z.string({
    required_error: "Please fill in additional resources",
  }),
  items: z.array(
    z.object({
      itemName: z.string({
        required_error: "Please fill in urls you want to provide",
      })
    })
  ).min(0),
})

const today = new Date();
const day = today.toDateString();



const Leadform = () => {
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [resultSingle, setResultSingle] = useState({});

  const { toast } = useToast()

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      email: "",
      phone: "",
      website: "",
      webservice: "",
      desc: "",
      refer: "",
      other: "",
      items: [],
    },
  })

  const { fields, append, remove } = useFieldArray({
    name: 'items', // Name used to access the array in form values
    control: form.control
  });

  const next = () => {
    setPreviousStep(currentStep);
    setCurrentStep(step => step + 1);
  }

  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep);
      setCurrentStep(step => step - 1);
    }
  }


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
        title: "Data added 🚀",
        className: "custom-send-toast",
        description: "Kindly check if your data is on indexedDB and RestDBIO",
      })
      form.reset();
      setTimeout(() => {
        mutation.reset();
      }, 1300);
      setCurrentStep(2);
    }
  })


  // 2. Define a submit handler.
  const onSubmit = async (values) => {
    const singleObj = { ...values, datelog: day };
    mutation.mutate({ ...singleObj });
    await db.leadlist.add({ ...singleObj });
    setResultSingle({ ...singleObj });
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
          <div className="mx-auto grid w-[610px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Web Lead Form</h1>
              <p className="text-balance text-muted-foreground">
                kindly fillup the form below, we can evaluate your request
                {mutation.isPending ? (<div><h3>Adding Data...</h3></div>) : null}
              </p>
            </div>
            <div className="grid gap-4 cs-form">
           
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  {currentStep === 0 && (
                    <>
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
                        name="website"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input placeholder="Website" {...field} />
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
                    </>
                  )}
                  {currentStep === 1 && (
                    <>
                      <FormField
                        control={form.control}
                        name="refer"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>Where do you find my profile</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-1"
                              >
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="socials" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    Social Media
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="webmail" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    Through Email or Phone
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="searching" />
                                  </FormControl>
                                  <FormLabel className="font-normal">Did some searching</FormLabel>
                                </FormItem>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="other"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Textarea
                                placeholder="Please provide more information or resources"
                                className="resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="dynamic-field">
                      <span className="title-cont">
                        <FormLabel>Social Media Links</FormLabel>
                        <a onClick={() => append({ itemName: '' })} variant="secondary" size="sm">  
                            <PackagePlusIcon className="mr-2 h-4 w-4" /> Add Item
                        </a>
                      </span>  
                        {fields.map((field, index) => (
                          <div key={field.id} className="child-fields">
                            <FormField
                              control={form.control}
                              name={`items[${index}].itemName`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input placeholder="URL..." {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <Button onClick={() => remove(index)} variant="outline" size="sm">  
                                <MinusCircle className="mr-2 h-4 w-4" /> Remove
                            </Button>    
                          </div>
                        ))}
                        
                      </div>
                      <Button type="submit" className="cs-btn-expand" disabled={mutation.isPending}> {mutation.isPending ? 'Sending Data...' : 'Submit'}</Button>
                      {mutation.isError ? (<div>An error occurred: {mutation.error.message}</div>) : null}
                    </>
                  )}

                  {currentStep === 2 && ( 
                    <>
                      <h2 className="h2-data">Your Data is Added here's your information</h2>
                      <span className="data-list-one">
                        {JSON.stringify(resultSingle,null,'\t')}
                      </span>
                    </>
                  )}


                </form>
                <span className="stepcaption">
                  <span className="titletab">
                    <h3>
                      {currentStep === 0 && ('STEP 1 Important Fields')}
                      {currentStep === 1 && ('STEP 2 Additional Fields')}
                    </h3>
                  </span>

                  {currentStep <= 1  && ( 
                    <Pagination className="stepper-parent">
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious onClick={prev} isActive className={`${currentStep === 0 && 'dont-click'}`} />
                        </PaginationItem>
                        <PaginationItem className={`${currentStep === 0 && 'active-class'}`}>
                          <PaginationLink onClick={() => setCurrentStep(0)} isActive={currentStep === 0}>
                            1
                          </PaginationLink>
                        </PaginationItem>
                        <PaginationItem className={`${currentStep === 1 && 'active-class'}`}>
                          <PaginationLink onClick={() => setCurrentStep(1)} isActive={currentStep === 1}>
                            2
                          </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationNext onClick={next} isActive className={`${currentStep >= 1 && 'dont-click'}`} />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  )}

                </span>
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
