import { useDrag } from 'react-dnd';
import { useState } from 'react';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import PopupForm from './Popupform';

import { Button } from "@/components/ui/button"
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
import { db } from '../utils/db';

const FormSchema = z.object({
  title: z.string(),
  description: z.string()
})

const Task = ({ task, deleteTask }) => {

  const [open, setOpen] = useState(false);
  const [popinfo, setPopinfo] = useState('');

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: popinfo.title,
      description: popinfo.description,
    },
  })


  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'TASK',
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  function onSubmit(data) {
    updateTask(data);
    form.reset();
    setTimeout(() => {
      setOpen(false);
    }, 100);
  }

  const updateTask = async (data) => {
    db.tasks.update(popinfo.id, {...data}).then(function (updated) {
      if (updated)
        console.log ("Update Task Info"); 
      else
        console.log ("Nothing was updated");
    });
  };

  const viewinfo = (task) => {
    setOpen(true);
    setPopinfo(task)
  }

  return (
  <>  
    <Card ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }} className="task-board" onDoubleClick={() => viewinfo(task)}>
      <CardHeader>
        <CardTitle className="heading-kb">{task.title} </CardTitle>
        <CardDescription>{task?.description.substring(0, 150)}</CardDescription>
        <a onClick={()=> deleteTask(task.id)} className="remove-icon">X</a>
      </CardHeader>
    </Card>
    <PopupForm open={open} setOpen={setOpen}> 

      <span className="form-edit-pop">
        <h3>View Task</h3>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="fullwidth-form">
            <span className="form-styling-fields">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea rows="1" placeholder="Title.." {...field}  defaultValue={popinfo?.title} className="title-input no-border-field"/>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea placeholder="Description.." {...field} defaultValue={popinfo?.description} className="description-textarea no-border-field"/>
                  </FormControl>
                </FormItem>
              )}
            />
            </span>
            <Button type="submit"  variant="secondary" className="btn-update">Update</Button>
          </form>
        </Form>
      </span>
    </PopupForm>

  </>
  );
  
};

export default Task;
