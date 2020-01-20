import { User } from './user';

export class Service{
    private name: string;
    private cost: string;
    private description: string;
    private comments: User[];

    constructor(){
        this.comments = [];
    }

    public setName(name: string){
        this.name = name;
    }
    public getName(){
        return this.name;
    }
    public setCost(cost: string){
        this.cost = cost;
    }
    public getCost(){
        return this.cost;
    }

    public setDescription(text: string){
        this.description = text;
    }
    public getDescription(){
        return this.description;
    }

    public setComments(user: User){
        this.comments.push(user)
    }
    public getComments(){
        return this.comments;
    }
}