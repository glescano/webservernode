import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";

const todos = [
    {id:1, text: 'Buy milk', createdAt: new Date()},
    {id:2, text: 'Buy bread', createdAt: null},
    {id:3, text: 'Buy butter', createdAt: new Date()},
];

export class TodosController{
    //* DI
    constructor(){}

    public getTodos = async (req: Request, res: Response)=>{
        const todos = await prisma.todo.findMany();
        return res.json(todos);
    };

    public getTodosById = async (req: Request, res: Response)=>{
        const id = +req.params.id; // el + hace la conversion automatica
        if (isNaN(id)) return res.status(400).json({error: `Id argument is not a number.`});
        //console.log(id, 10);
        const todo = await prisma.todo.findFirst({
            where: {
                id: id
            }
        });
        
        //const todo = todos.find(todo => todo.id === id);

        (todo)
        ? res.json(todo)
        : res.status(404).json({error: `TODO with id ${id} not found`});
    };

    public createTodo = async(req: Request, res: Response) => {
        const [error, createTodoDto] = CreateTodoDto.create(req.body);
        if (error) return res.status(400).json({error});
        //const {text} = req.body;
        //if (!text) return res.status(400).json({error: 'Text property is required'});

        // const todo = await prisma.todo.create({
        //     data: { text }
        // });

        const todo = await prisma.todo.create({
            data: createTodoDto!
        });

        // const newTodo = {
        //     id: todos.length + 1,
        //     text: text,
        //     createdAt: null
        // };

        // todos.push(newTodo);
        // res.json(newTodo);
        res.json(todo);
    };

    public updateTodo = async (req: Request, res: Response)=>{
        const id = +req.params.id;
        const [error, updateTodoDto] = UpdateTodoDto.create({...req.body, id});
        //if (isNaN(id)) return res.status(400).json({error: `Id argument is not a number.`});
        if (error) return res.status(400).json({error});
        //const todo = todos.find(todo => todo.id === id);
        const todo = await prisma.todo.findFirst({
            where:{
                id:id,
            }
        });

        if (!todo) return res.status(404).json({error: `Todo with id ${id} not found.`});

        

        //const {text, createdAt} = req.body;
        // todo.text = text || todo.text;
        // (createdAt === 'null')
        // ? todo.createdAt = null
        // : todo.createdAt = new Date(createdAt || todo.createdAt);
        
        // const updatedTodo = await prisma.todo.update({
        //     where: { id }, 
        //     data:{ 
        //         text, 
        //         completedAt: (createdAt) ? new Date(createdAt) : null
        //     }

        // });

        const updatedTodo = await prisma.todo.update({
            where: { id }, 
            data: updateTodoDto!.values
        });
        
        

        //if (!text) return res.status(400).json({error: 'Text property is required'});

        
        //todo.text = text;
        // todos.forEach((todo, index) =>{
        //     if (todo.id === id){
        //         todos[index] = todo;
        //     }
        // });

        res.json(updatedTodo);
    }

    public deleteTodo = async (req: Request, res: Response) =>{
        const id = +req.params.id;
        if (isNaN(id)) return res.status(400).json({error: `Id argument is not a number.`});
        
        const todo = await prisma.todo.findFirst({
            where:{ id }
        });
        //const todo = todos.find(todo  => todo.id === id);
        if (!todo) return res.status(404).json({error: `Todo with id ${id} not found.`});
        
        /*const index = todos.indexOf(todo);
        if (index > -1){
            todos.splice(index, 1);
        }     */
        
        const deleted = await prisma.todo.delete({
            where: {id}
        });

        (deleted) 
        ? res.json(deleted)
        : res.status(400).json({error: `Todo with id ${id} not found`});
    }
}