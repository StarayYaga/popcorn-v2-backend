import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as nou from "node-os-utils"
import * as si from "systeminformation"
import defaultExport from "check-disk-space"
import { Service } from './service.model';
import { InjectModel } from '@nestjs/sequelize';
import { ServiceDto } from 'src/dto/service.dto';
import {exec} from "child_process"

@Injectable()
export class ServerInformationService {
    constructor(@InjectModel(Service) private serviceRepository: typeof Service){}


    async getStatisticSystem(){
        const cpu = nou.cpu
        const uptime = await si.time().uptime /60 /60
        let cpuTemp = (await si.cpuTemperature()).main
        const cpuLoad = await cpu.usage()
        const memTotal = await si.mem()
        const memUsed = await si.mem()
        const diskSize = await si.diskLayout()
        const diskFree = await defaultExport("/")
        
        if (cpuTemp == null){
            cpuTemp = 0
        }
        // console.log(cpuTemp);
        
        const RamLoad = ((memUsed.used/1024/1024/1024) / (memTotal.total/1024/1024/1024))*100
        const DiskLoad = ((diskFree.free/1024/1024/1024) / (diskSize[0].size/1024/1024/1024))*100
        
        const cpuLoadData = { name: "CPU load", style: `--p: ${cpuLoad.toFixed(2)};--b:10px;--c: ${this.getColor(cpuLoad.toFixed(2))};`, system: "%", count: cpuLoad.toFixed(2) }
        const cpuTempData = { name: "CPU temp",  style: `--p: ${await cpuTemp.toFixed(2)};--b:10px;--c: ${this.getColor(await cpuTemp.toFixed(2))};`, system: "°C", count: await cpuTemp.toFixed(2)}
        const RamLoadData ={ name: "RAM load",  style: `--p: ${RamLoad.toFixed(2)};--b:10px;--c: ${this.getColor(RamLoad.toFixed(2))};`, system: "%", count: RamLoad.toFixed(2) }
        const DiskLoadData = { name: "HDD load",  style: `--p: ${DiskLoad.toFixed(2)};--b:10px;--c: ${this.getColor(DiskLoad.toFixed(2))};`, system: "GB", count: (diskFree.free/1024/1024/1024).toFixed(2) }
        
        return [
            cpuLoadData, cpuTempData, RamLoadData, DiskLoadData
        ]

    }

    getColor(num){
        if (num <= 45){
            return '#00CA14'
        } else if (num <=75){
            return '#FFE601'
        } 
        return '#FF0000'
    }

    async getStatisticServices(){
        const data = []
        const services = await this.serviceRepository.findAll()
        for (let service of services){
            let statusIs
            let statusSwitchIs
            let status = await si.services(service.name)  
            if (status[0].running){
                statusIs = "online"
                statusSwitchIs = "STOP"
            } else {
                statusIs = "offline"
                statusSwitchIs="START"
            }
            const info = {
                id: service.id,
                name: service.name,
                status: statusIs,
                statusSwitchIs: statusSwitchIs
            }
            data.push(info)
        }
        return data
    }

    async getStatistic(){
        const stat = await this.getStatisticSystem()
        const services = await this.getStatisticServices()

        return {system: stat, services: services}
    }
    

    async createService(service: ServiceDto){
        const candidate = await this.serviceRepository.findOne({where: {name: service.name}})
        if (candidate){
            throw new HttpException ("Сервис с таким названием уже отслеживается!", HttpStatus.BAD_REQUEST)
        }
        await this.serviceRepository.create(service)
    }

    async deleteService(id){
        this.serviceRepository.destroy({where: {id: id}})
    }

    async startStopService(data){
        console.log(data)
        exec(`systemctl ${data.status} ${data.name}`, (error, stdout, stderr) => {
            console.log(`systemctl ${data.status} ${data.name}`)
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
        });
    }

}
