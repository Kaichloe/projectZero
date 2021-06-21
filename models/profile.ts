//Defining Profile interface 
export interface IProfile {
  handle?: string;
  age?: string;
  email?: string;
}

class Profile implements IProfile {
  constructor(
    public handle?: string,
    public age?: string,
    public email?: string
  ){}
}

export default Profile;