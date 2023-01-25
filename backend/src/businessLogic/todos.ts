import { TodosAccess } from '../dataLayer/todosAcess'
import { AttachmentUtils } from '../helpers/attachmentUtils';
import { TodoItem } from '../models/TodoItem'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
//import { createLogger } from '../utils/logger'
import * as uuid from 'uuid'
//import * as createError from 'http-errors'
import { TodoUpdate } from '../models/TodoUpdate';

// TODO: Implement businessLogic

const attachmentUtils = new AttachmentUtils()
const todoAccess = new TodosAccess()

export async function createTodo(
    newTodo: CreateTodoRequest,
    userId: string
): Promise<TodoItem> {
    const todoId = uuid.v4()
    const createdAt = new Date().toISOString()
    const s3Url = attachmentUtils.getDefaultAttachmentUrl()
    const newItem = {
        userId,
        todoId,
        createdAt,
        done:false,
        attachmentUrl:s3Url,
        ...newTodo
    }
    return await todoAccess.createTodoItem(newItem)
}

export async function getTodosForUser(userId:string): Promise<TodoItem[]>{
    return todoAccess.getAllTodos(userId)
}

export async function updateTodo(todoId:string,todoUpdate:UpdateTodoRequest,userId:string):Promise<TodoUpdate>{
    return await todoAccess.updateTodoItem(todoId,userId,todoUpdate)
}

export async function deleteTodo(todoId:string,userId:string,) : Promise<string>{
    return await todoAccess.deleteTodoItem(todoId,userId)
}

export async function createAttachmentPresignedUrl(todoId:string): Promise<string>{
    return attachmentUtils.getUploadUrl(todoId)
}