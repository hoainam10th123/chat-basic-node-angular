export class UserChatBox{
    username: string;
    right: number;//position

    constructor(_user: string, _right: number){
        this.username = _user;
        this.right = _right;
    }
}