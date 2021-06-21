//Defining Post interface 
export interface IPost {
  author: string;
  body: string
}

class Post implements IPost {

  public author: string;
  public body: string;

  constructor(author: string, body: string){
    this.author = author;
    this.body = body;
  }
}

export default Post;