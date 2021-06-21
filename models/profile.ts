//Defining Profile interface 
export interface IProfile {
  handle: string;
  age: string;
  email: string;
}

class Profile implements IProfile {

  public handle: string;
  public age: string;
  public email: string;

  constructor(handle, age, email){
    this.handle = handle;
    this.age = age;
    this.email = email;
  }
}

export default Profile;