import { NestFactory } from "@nestjs/core"
import {AppModule} from "./app.module"


async function start() {
    const Port = process.env.app_port
    const app = await NestFactory.create(AppModule)
    

    await app.listen(Port, ()=>{
        console.log(`Server start on ${Port} port`)
    })
}

start()