import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { ServerInformationService } from './server-information.service';
import { ServiceDto } from 'src/dto/service.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('api')
export class ServerInformationController {
    constructor(private serverInformationService: ServerInformationService){}

    @UseGuards(JwtAuthGuard)
    @Get("Statistic")
    getStatisticSystem(){
        return this.serverInformationService.getStatisticSystem()
    }

    @UseGuards(JwtAuthGuard)
    @Get("all")
    getStatistic(){
        return this.serverInformationService.getStatistic()
    }    

    @UseGuards(JwtAuthGuard)
    @Get("Services")
    getServices(){
        return this.serverInformationService.getStatisticServices()
    }

    @UseGuards(JwtAuthGuard)
    @Post("createService")
    createService(@Body() serviceDto: ServiceDto){
        console.log(serviceDto);
        
        return this.serverInformationService.createService(serviceDto)
    }

    @UseGuards(JwtAuthGuard)
    @Post("deleteService")
    deleteService(@Body() data){
        return this.serverInformationService.deleteService(data.id)
    }

    @UseGuards(JwtAuthGuard)
    @Post("change")
    changeService(@Body() data){
        return this.serverInformationService.startStopService(data)
    }
}
