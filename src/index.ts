import "./icons";
import Router from "./router";
import { cartService } from "./services/cart.service";
import { userService } from "./services/user.service";

new Promise(res => res(userService.init()))
.then(() => new Router().route())
.then(() => cartService.init())
.then(() => setTimeout(() => {
  document.body.classList.add("is__ready");
}, 250))
.catch(e => console.log(e))