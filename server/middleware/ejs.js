import * as ejs from 'ejs';
import { join } from 'path';

export default defineNitroPlugin(eventHandler(async (nitro) => {
  let str = new String(nitro._path);
  if (str.startsWith('/api')) {
    return Promise.resolve();
  }
  if (nitro._path === '/') {
    str = 'index';
  }

  const viewPath = "./views/" + str + ".ejs";
  const data = await $fetch("/api/hello")
  console.log(viewPath)
  return ejs.renderFile(viewPath, data)
}
))
