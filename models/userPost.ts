//Defining Post interface 
export interface IUserPost {
  handle?: string;
  email?: string;
  post?: string[];
}

class UserPost implements IUserPost {
  constructor(
    public handle?: string,
    public email?: string,
    public post?: string[]
  ){}
}

export default UserPost;