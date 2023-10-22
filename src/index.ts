import "./icons";
import Router from "./router";
import { cartService } from "./services/cart.service";
import { userService } from "./services/user.service";

new Promise(res => res(userService.init()))
.then(() => new Router().route())
.then(() => cartService.init())
.then(() => document.body.classList.add("is__ready"))
.catch(e => console.log(e))