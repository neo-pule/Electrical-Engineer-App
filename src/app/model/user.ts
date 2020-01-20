export class User{
    private name: string;
    private id: string;
    private comment: string;
    private serviceId: string;

    constructor(){}

    public setName(name: string){
        this.name = name;
    }
    public getName(){
        return this.name;
    }
    public setId(id: string){
        this.id = id;
    }
    public getId(){
        return this.id;
    }

    public setComment(text: string){
        this.comment = text;
    }
    public getComment(){
        return this.comment;
    }

    public setServiceId(id: string){
        this.serviceId = id;
    }
    public getServiceId(){
        return this.serviceId;
    }
}