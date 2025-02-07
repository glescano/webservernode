import { Router } from "express";
import { TodoRoutes } from "./todos/routes";
// import { TodosController } from "./todos/controller";

export class AppRoutes {
    static get routes():Router{
        const router = Router();
        
        //const todosController = new TodosController();
        //router.get('/api/todos', (req, res) => todosController.getTodos(req, res));

        router.use('/api/todos', TodoRoutes.routes);

        return router;
    }
}