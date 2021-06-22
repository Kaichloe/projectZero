//Defining Post interface 
export interface IPost {
  handle?: string;
  email?: string;
  body?: string[];
}

class Post implements IPost {
  constructor(
    public handle?: string,
    public email?: string,
    public body?: string[]
  ){}
}

export default Post;