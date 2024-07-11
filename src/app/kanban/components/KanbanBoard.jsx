import React, { useState } from 'react';
import Column from './Column';
import { db } from '../utils/db';
import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import PopupForm from './Popupform';
import { useLiveQuery } from 'dexie-react-hooks'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import Link from 'next/link';


import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const FormSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 5 characters.",
  }),
  description: z.string().min(2, {
    message: "Description must be at least 10 characters.",
  }),
})

const KanbanBoard = () => {
  const allItems = useLiveQuery(() => db.tasks.toArray(), []);
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      description: "",
      status: ""
    },
  })

  function onSubmit(data) {
    addTask(data);
    form.reset();
    setTimeout(() => {
      setOpen(false);
    }, 100);
  }

  const addTask = async (data) => {
    await db.tasks.add({ ...data, status: 'To Do' });
    const updatedTasks = await db.tasks.toArray();
    setTasks(updatedTasks);
  };


  const viewData = () => {
    setOpen(true);
  }

  return (
    <>
      <header className="border-b bg-background top-kanban-head">
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
                <Link href="/kanban/">Kanban</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <span className="top-banner-title">
          <h1>Todo Kanban APP</h1>
        </span>
      </header>
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="kanban-board">
          <div className="todo-to-add">
            <span className="todo-txt">
              Create Todo:
            </span>
            <Button size="sm" className="h-7 gap-1" onClick={() => viewData()}>
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add Task
              </span>
            </Button>
          </div>
          <div className="columns">
            {['To Do', 'In Progress', 'Complete'].map((status) => (
              <Column key={status} status={status} tasks={allItems} setTasks={setTasks} />
            ))}
          </div>
        </div>

      </main>
      <PopupForm open={open} setOpen={setOpen} addTask={addTask} >
      <span className="form-add-pop">
        <h3>Add Task Form</h3>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="fullwidth-form">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Title.." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea placeholder="Description.." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" variant="secondary">Submit</Button>
          </form>
        </Form>
      </span>
      </PopupForm>

    </>
  );
};

export default KanbanBoard;
