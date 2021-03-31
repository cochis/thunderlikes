export interface User {
    name: string,
    lastname: string,
    email: string,
    idRole: string,
    dateBirth: string,
    description: string,
    dateCreated: string,
    dateEdit: string,
    getPostLikes: string
}
export interface UserSign {
    nickname: string,
    email: string,
    password: string,
    date: string
}

export interface UserSignData {
    dateSignIn: string,
    dateSignOut: string,
    emailSignIn: string
}
export interface PostToLike {
    idUser: string,
    idPlattform: string,
    requires: string,
    urlPostToLike: string,
    datePostEnd: string,
    dateCreatePostToLike: string,
    dateEditPostToLike: string 
}


 