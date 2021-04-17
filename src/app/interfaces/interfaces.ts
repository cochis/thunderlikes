export interface User {
  uid: string;
  displayName: string;
  name: string;
  lastname: string;
  email: string;
  password: string;
  idRole: string;
  dateBirth: string;
  description: string;
  dateCreated: string;
  dateEdit: string;
  getPostLikes: string;
}
export interface UserSign {
  uid: string;
  displayname: string;
  email: string;
  date: string;
  emailVerified: boolean;
}

export interface UserSignData {
    dateSignIn: string;
    dateSignOut: string;
    emailSignIn: string;
  }
export interface PostToLike {
  idUser: string;
  nameUser: string;
  idPlattform: string;
  requires: [string];
  urlPostToLike: string;
  datePostEnd: string;
  dateCreatePostToLike: string;
  dateEditPostToLike: string;
}

export interface UserLogin {
    email: string;
    password: string;
  }
  export interface Parameters {
    active: boolean;
    code: string;
    type: string;
    value: string;
  }