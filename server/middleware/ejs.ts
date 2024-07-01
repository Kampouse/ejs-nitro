import * as ejs from 'ejs';
import type { $Fetch } from 'ofetch';
export default defineNitroPlugin(eventHandler(async (nitro) => {
  //@ts-ignore
  const $fetcher = $fetch as $Fetch

  const url = getRequestURL(nitro)
  if (url.pathname.startsWith('/api')) {
    return Promise.resolve();
  }
  if (url.pathname === '/') {
    url.pathname = 'index';
  }
  const viewPath = "./server/views" + url.pathname + ".ejs";
  const data = await $fetcher<{ name: string }>("/api/hello", { method: "GET" })
  console.log("viewPath", viewPath)
  return ejs.renderFile(viewPath, data).catch((error) => {
    console.log("error", error)
    return ejs.renderFile("./server/views/404.ejs", { message: "File: \n" + viewPath + " : Not found :(" })
  })
}
))
