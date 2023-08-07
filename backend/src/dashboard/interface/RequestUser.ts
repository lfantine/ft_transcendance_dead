import { Request } from "express";
import User from "src/user/User.entity";


interface RequestUser extends Request {
	UserId: string;
	data: any;
}

export default RequestUser;