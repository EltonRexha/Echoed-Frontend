import GithubUser from "./githubUser";
import GoogleUser from "./googleUser";
import LocalUser from "./localUser";

export type User = LocalUser | GithubUser | GoogleUser;  
