import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sinister } from './entities/sinister.entity';
import { Repository } from 'typeorm';
import { SinisterDTO } from './dto/sinister.dto';
import { GncDTO } from '../gnc/dto/gnc.dto';
import { TheftTireDTO } from '../theft-tire/dto/theftTire.dto';
import { TheftDTO } from '../theft/dto/theft.dto';
import { UserDTO } from '../users/dto/user.dto';
import { VehicleDTO } from '../vehicle/dto/vehicle.dto';
import { AssetDTO } from '../asset/dto/asset.dto';
import { SinisterTypeService } from '../sinister-type/sinister-type.service';
import { AssetService } from '../asset/asset.service';
import { ElectronicsService } from '../electronics/electronics.service';
import { GncService } from '../gnc/gnc.service';
import { LegalUsersService } from '../legal-users/legal-users.service';
import { SmartphonesService } from '../smartphones/smartphones.service';
import { UsersService } from '../users/users.service';
import { VehicleService } from '../vehicle/vehicle.service';
import { sinisterTypeDTO } from '../sinister-type/dto/sinisterType.dto';
import { TheftService } from '../theft/theft.service';
import { TheftTireService } from '../theft-tire/theft-tire.service';
import { FireService } from '../fire/fire.service';
import { FireDTO } from '../fire/dto/fire.dto';
import { InjuredDTO } from '../injured/dto/injured.dto';
import { InjuredService } from '../injured/injured.service';
import { InjuredInfoDTO } from '../injured-info/dto/injuredInfo.dto';
import { InjuredInfoService } from '../injured-info/injured-info.service';
import {
  InjuredData,
  ThirdParty,
  ThirdPartyVehicleData,
} from './dto/allSinister.dto';
import { Injured } from '../injured/entities/injured.entity';
import { CrashDTO } from '../crash/dto/crash.dto';
import { CrashService } from '../crash/crash.service';
import { ThirdPartyDriverDTO } from '../third-party-driver/dto/thirdPartyDriver.dto';
import { ThirdPartyVehicleDTO } from '../third-party-vehicle/dto/thirdPartyVehicle.dto';
import { ThirdPartyDriverService } from '../third-party-driver/third-party-driver.service';
import { ThirdPartyVehicleService } from '../third-party-vehicle/third-party-vehicle.service';
import { ThirdPartyVehicle } from '../third-party-vehicle/entities/thirdPartyVehicle.entity';
import { LegalUsersDTO } from '../legal-users/dto/legalUsers.dto';
import { SmartphoneDTO } from '../smartphones/dto/smartphone.dto';
import { ElectronicsDTO } from '../electronics/dto/electronics.dto';
import * as nodemailer from 'nodemailer';
import * as puppeteer from 'puppeteer';
import fs from 'fs';
import PDFDocument from 'pdfkit-table';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { ErrorManager } from 'src/utils/error.manager';
interface PDF {
  userDTO: UserDTO;
  legalUserDTO: LegalUsersDTO;
  vehicleDTO: VehicleDTO;
  electronicDTO: ElectronicsDTO;
  gncDTO: GncDTO;
  smartPhoneDTO: SmartphoneDTO;
  theftDTO: TheftDTO;
  fireDTO: FireDTO;
  crashDTO: CrashDTO;
  theftTireDTO: TheftTireDTO;
  injuredDTO: InjuredData;
  thirdPartyVehicleDTO: ThirdPartyVehicleData;
  assetDTO: AssetDTO;
  resolve: any;
}
@Injectable()
export class SinisterService {
  constructor(
    @InjectRepository(Sinister)
    private readonly sinisterRepository: Repository<Sinister>,
    private readonly userService: UsersService,
    private readonly legalUserService: LegalUsersService,
    private readonly vehicleService: VehicleService,
    private readonly electronicService: ElectronicsService,
    private readonly gncService: GncService,
    private readonly smartphoneService: SmartphonesService,
    private readonly assetService: AssetService,
    private readonly sinisterTypeService: SinisterTypeService,
    private readonly theftService: TheftService,
    private readonly theftTireService: TheftTireService,
    private readonly fireService: FireService,
    private readonly injuredService: InjuredService,
    private readonly injuredInfoService: InjuredInfoService,
    private readonly crashService: CrashService,
    private readonly thirdPartyVehicleService: ThirdPartyVehicleService,
    private readonly thirdPartyDriverService: ThirdPartyDriverService,
  ) {}

  public async generarPDF({
    userDTO,
    legalUserDTO,
    vehicleDTO,
    electronicDTO,
    gncDTO,
    smartPhoneDTO,
    theftDTO,
    fireDTO,
    crashDTO,
    theftTireDTO,
    injuredDTO,
    thirdPartyVehicleDTO,
  }: Partial<PDF>): Promise<Buffer> {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      let pdfContent = '';
      // <footer style='width: 100%; position: absolute; bottom: 5vh; right: 5vw; text-align: right; font-family: sans-serif;'>3</footer>
      if (userDTO) {
        pdfContent += `
      <section style='font-family: sans-serif; margin: 0 20px; height: 100vh;'>
        <header style='border-bottom: 1px solid #000; margin-bottom: 20px; width: 100%; color: #8B5CF6;'>
          <div style='width: 100%; display: flex; justify-content: flex-end;'>
            <h2 style='margin-left: auto; padding-right: 20px;' >ReclamoWeb</h2>
          </div>
        </header>
        <div>
          <h2 style='padding: 20px 0; color: #8B5CF6;'>Persona particular</h2>
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Nombre: <span style='font-weight: 200;'>${userDTO.name}</span></h4>
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Apellido: <span style='font-weight: 200;'>${userDTO.lastName}</span></h4>
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>DNI: <span style='font-weight: 200;'>${userDTO.dni}</span></h4>
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Fecha de nacimiento: <span style='font-weight: 200;'>${userDTO.birthDate}</span></h4>
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Genero: <span style='font-weight: 200;'>${userDTO.gender}</span></h4>
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Numero telefonico: <span style='font-weight: 200;'>${userDTO.phoneNumber}</span></h4>
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Email: <span style='font-weight: 200;'>${userDTO.email}</span></h4>
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Email alternativo: <span style='font-weight: 200;'>${userDTO.altEmail}</span></h4>
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Direccion: <span style='font-weight: 200;'>${userDTO.address}</span></h4>
        </div>
        <div style="page-break-after: always;"></div>
        </section>
        `;
      }

      if (legalUserDTO) {
        pdfContent += `
       <section style='font-family: sans-serif; margin: 0 20px; height: 100vh;'>
        <header style='border-bottom: 1px solid #000; margin-bottom: 20px; width: 100%; color: #8B5CF6;'>
          <div style='width: 100%; display: flex; justify-content: flex-end;'>
            <h2 style='margin-left: auto; padding-right: 20px;' >ReclamoWeb</h2>
          </div>
        </header>
        <div>
          <h2 style='padding: 20px 0; color: #8B5CF6;'>Persona juridica</h2>
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Nombre de la compañia: <span style='font-weight: 200;'>${legalUserDTO.companyName}</span></h4>
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>CUIT: <span style='font-weight: 200;'>${legalUserDTO.cuit}</span></h4>
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Numero telefonico: <span style='font-weight: 200;'>${legalUserDTO.email}</span></h4>
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Email: <span style='font-weight: 200;'>${legalUserDTO.altEmail}</span></h4>
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Email alternativo: <span style='font-weight: 200;'>${legalUserDTO.altEmail}</span></h4>
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Direccion <span style='font-weight: 200;'>${legalUserDTO.address}</span></h4>
        </div>
        <div style="page-break-after: always;"></div>
        </section>
        `;
      }

      if (vehicleDTO) {
        pdfContent += `
        <section style='font-family: sans-serif; margin: 0 20px; height: 100vh;'>
        <header style='border-bottom: 1px solid #000; margin-bottom: 20px; width: 100%; color: #8B5CF6;'>
          <div style='width: 100%; display: flex; justify-content: flex-end;'>
            <h2 style='margin-left: auto; padding-right: 20px;' >ReclamoWeb</h2>
          </div>
        </header>
        <div>
          <h2 style='padding: 20px 0; color: #8B5CF6;'>Vehiculo</h2>
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Vehiculo tipo: <span style='font-weight: 200;'>${
            vehicleDTO.type
          }</span></h4>
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Patente: <span style='font-weight: 200;'>${
            vehicleDTO.plate
          }</span></h4>
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Año: <span style='font-weight: 200;'>${
            vehicleDTO.year
          }</span></h4>
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Marca: <span style='font-weight: 200;'>${
            vehicleDTO.brand
          }</span></h4>
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Modelo: <span style='font-weight: 200;'>${
            vehicleDTO.model
          }</span></h4>
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Color: <span style='font-weight: 200;'>${
            vehicleDTO.color
          }</span></h4>
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Daño: <span style='font-weight: 200;'>${
            vehicleDTO.damage ? 'Si' : 'No'
          }</span></h4>
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Lugar dañado: <span style='font-weight: 200;'>${
            vehicleDTO.damageLocation
          }</span></h4>
          <div style="display: flex; flex-direction: column">
            <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Fotos del vehiculo:</h4>
            <div style="display: flex; flex-wrap: wrap; gap: 5px">
              ${(vehicleDTO.images as unknown as string[]).map(
                (el: string) =>
                  `
                <img src="${el}" style="max-width: 30%; max-height: 300px; object-fit: contain;"/>
                `,
              )}
            </div>
          </div>
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Es 0km: <span style='font-weight: 200;'>${
            vehicleDTO.okm ? 'Si' : 'No'
          }</span></h4>
                  <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Es GNC: <span style='font-weight: 200;'>${
                    vehicleDTO.gnc ? 'Si' : 'No'
                  }</span></h4>
                  ${
                    gncDTO
                      ? `
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Numero de oblea: <span style='font-weight: 200;'>${gncDTO.oblea}</span></h4>
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Patente: <span style='font-weight: 200;'>${gncDTO.plate}</span></h4>
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Fecha de expiracion: <span style='font-weight: 200;'>${gncDTO.expireDate}</span></h4>
          `
                      : ''
                  }
          ${
            vehicleDTO && (crashDTO || theftDTO || fireDTO)
              ? ''
              : `
        <h4 style='padding: 20px 0 10px 0; text-decoration: underline;'>Neumaticos:</h4>
        <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Marca: <span style='font-weight: 200;'>${vehicleDTO.tireBrand}</span></h4>
        <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Tamaño: <span style='font-weight: 200;'>${vehicleDTO.tireSize}</span></h4>
        <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Desgaste: <span style='font-weight: 200;'>${vehicleDTO.tireWear}</span></h4>
        `
          }
        <div style="page-break-after: always;"></div>
        </section>
        </div>
        `;
      }

      if (electronicDTO) {
        pdfContent += `
        <section style='font-family: sans-serif; margin: 0 20px; height: 100vh;'>
        <header style='border-bottom: 1px solid #000; margin-bottom: 20px; width: 100%; color: #8B5CF6;'>
          <div style='width: 100%; display: flex; justify-content: flex-end;'>
            <h2 style='margin-left: auto; padding-right: 20px;' >ReclamoWeb</h2>
          </div>
        </header>
        <div>
          <h2 style='padding: 20px 0; color: #8B5CF6;'>Electrodomestico</h2>
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Electrodomestico tipo: <span style='font-weight: 200;'>${
            electronicDTO.type
          }</span></h4>
          ${
            smartPhoneDTO
              ? `
        <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Numero del movil: <span style='font-weight: 200;'>${smartPhoneDTO.phoneNumber}</span></h4>
        <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Servicio del movil: <span style='font-weight: 200;'>${smartPhoneDTO.phoneService}</span></h4>
        <h4 style='margin-bottom: 5px; font-weight: 600; display:'>IMEI: <span style='font-weight: 200;'>${smartPhoneDTO.imei}</span></h4>
        `
              : ''
          }
        <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Marca: <span style='font-weight: 200;'>${
          electronicDTO.brand
        }</span></h4>
        <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Modelo: <span style='font-weight: 200;'>${
          electronicDTO.model
        }</span></h4>
        </div>
        <div style="page-break-after: always;"></div>
        </section>
        `;
      }

      if (theftDTO) {
        pdfContent += `
        <section style='font-family: sans-serif; margin: 0 20px; height: 100vh;'>
        <header style='border-bottom: 1px solid #000; margin-bottom: 20px; width: 100%; color: #8B5CF6;'>
          <div style='width: 100%; display: flex; justify-content: flex-end;'>
            <h2 style='margin-left: auto; padding-right: 20px;' >ReclamoWeb</h2>
          </div>
        </header>
        <div>
          <h2 style='padding: 20px 0; color: #8B5CF6;'>Denuncia: Robo</h2>
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Horario del suceso: <span style='font-weight: 200;'>${
            theftDTO.time
          }</span></h4>
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Fecha del suceso: <span style='font-weight: 200;'>${
            theftDTO.date
          }</span></h4>
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Ubicacion del suceso: <span style='font-weight: 200;'>${
            theftDTO.location
          }</span></h4>
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Ubicacion del suceso: <span style='font-weight: 200;'>${
            theftDTO.location
          }</span></h4>
          <div style="display: flex; flex-direction: column">
            <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Fotos de la denuncia:</h4>
            <div style="display: flex; flex-wrap: wrap ; gap: 5px">
              <div style="display: flex; flex-wrap: wrap; gap: 5px">
              ${(theftDTO.reportPhoto as unknown as string[]).map(
                (el: string) =>
                  `
                <img src="${el}" style="max-width: 30%; max-height: 300px; object-fit: contain;"/>
                `,
              )}
            </div>
          </div>
          ${
            theftTireDTO && theftDTO.isTire
              ? `
              <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Neumaticos robados: <span style='font-weight: 200;'>${
                theftTireDTO.tireAmount
              }</span></h4>
          ${
            theftTireDTO.tireAmount > 0
              ? `
              <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Desgaste de los neumaticos: <span style='font-weight: 200;'>${
                theftTireDTO.tireWear
              }%</span></h4>
              <div style="display: flex; flex-direction: column">
                <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Fotos de rueda:</h4>
                <div style="display: flex; flex-wrap: wrap ; gap: 5px">
                  <div style="display: flex; flex-wrap: wrap; gap: 5px">
                  ${(theftTireDTO.tirePhoto as unknown as string[]).map(
                    (el: string) =>
                      `
                    <img src="${el}" style="max-width: 30%; max-height: 300px; object-fit: contain;"/>
                    `,
                  )}
                </div>
              </div>
              <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Localidad de reposicion: <span style='font-weight: 200;'>${
                theftTireDTO.replacementLocation
              }%</span></h4>
              `
              : ''
          }
          `
              : ''
          }
        <div style="page-break-after: always;"></div>
        </div>
        <div style="page-break-after: always;"></div>
        </section>
        `;
      }

      if (fireDTO) {
        pdfContent += `
        <section style='font-family: sans-serif; margin: 0 20px; height: 100vh;'>
        <header style='border-bottom: 1px solid #000; margin-bottom: 20px; width: 100%; color: #8B5CF6;'>
          <div style='width: 100%; display: flex; justify-content: flex-end;'>
            <h2 style='margin-left: auto; padding-right: 20px;' >ReclamoWeb</h2>
          </div>
        </header>
        <div>
          <h2 style='padding: 20px 0; color: #8B5CF6;'>Denuncia: Incendio</h2>
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Horario del suceso: <span style='font-weight: 200;'>${
            fireDTO.time
          }</span></h4>
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Fecha del suceso: <span style='font-weight: 200;'>${
            fireDTO.date
          }</span></h4>
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Ubicacion del suceso: <span style='font-weight: 200;'>${
            fireDTO.location
          }</span></h4>
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Detalles del suceso: <span style='font-weight: 200;'>${
            fireDTO.details
          }</span></h4>
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Lesiones: <span style='font-weight: 200;'>${
            fireDTO.injured ? 'Si' : 'No'
          }</span></h4>
          ${
            fireDTO.injured
              ? `
              <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Tipo de lesiones: <span style='font-weight: 200;'>${fireDTO.injuries}</span></h4>`
              : ''
          }
        <h4>Ambulancia: ${fireDTO.ambulance ? 'Si' : 'No'}</h4>
        ${
          fireDTO.ambulance
            ? `
            <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Destino de la ambulancia: <span style='font-weight: 200;'>${fireDTO.ambulanceTo}</span></h4>`
            : ''
        }
        <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Terceros lesionados: <span style='font-weight: 200;'>${
          fireDTO.thirdInjured ? 'Si' : 'No'
        }</span></h4>
        </div>
        <div style="page-break-after: always;"></div>
        </section>
        `;
      }

      if (crashDTO) {
        pdfContent += `
               <section style='font-family: sans-serif; margin: 0 20px; min-height: 100vh;'>
        <header style='border-bottom: 1px solid #000; margin-bottom: 20px; width: 100%; color: #8B5CF6;'>
          <div style='width: 100%; display: flex; justify-content: flex-end;'>
            <h2 style='margin-left: auto; padding-right: 20px;' >ReclamoWeb</h2>
          </div>
        </header>
        <div>
          <h2 style='padding: 20px 0; color: #8B5CF6;'>Denuncia: Choque</h2>
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Horario del suceso: <span style='font-weight: 200;'>${
            crashDTO.time
          }</span></h4>
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Fecha del suceso: <span style='font-weight: 200;'>${
            crashDTO.date
          }</span></h4>
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Ubicacion del suceso: <span style='font-weight: 200;'>${
            crashDTO.location
          }</span></h4>
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Detalles del suceso: <span style='font-weight: 200;'>${
            crashDTO.details
          }</span></h4>
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Lesiones: <span style='font-weight: 200;'>${
            crashDTO.injured ? 'Si' : 'No'
          }</span></h4>
          ${
            crashDTO.injured
              ? `
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Tipo de lesiones: <span style='font-weight: 200;'>${crashDTO.injuries}}</span></h4>    `
              : ''
          }
        <h4>Ambulancia: ${crashDTO.ambulance ? 'Si' : 'No'}</h4>
        ${
          crashDTO.ambulance
            ? `
            <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Destino de la ambulancia: <span style='font-weight: 200;'>${crashDTO.ambulanceTo}</span></h4>  `
            : ''
        }
        <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Terceros lesionados: <span style='font-weight: 200;'>${
          crashDTO.thirdInjured ? 'Si' : 'No'
        }</span></h4>
        <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Declaracion amistosa: <span style='font-weight: bold; color: #8B5CF6;'>${
          crashDTO.friendlyStatement ? 'Si' : 'No'
        }</span></h4>
        </div>
        <div style="page-break-after: always;"></div>
        </section>
        `;
      }

      if (injuredDTO) {
        const algo = injuredDTO.injuredInfo.map(
          (el: InjuredInfoDTO, i: number) => {
            const text = [];
            !(i === 0)
              ? text.push(`
       <section style='font-family: sans-serif; margin: 0 20px; min-height: 100vh;'>
        <header style='border-bottom: 1px solid #000; margin-bottom: 20px; width: 100%; color: #8B5CF6; height: 6vh;'>
          <div style='width: 100%; display: flex; justify-content: flex-end;'>
            <h2 style='margin-left: auto; padding-right: 20px;' >ReclamoWeb</h2>
          </div>
        </header>
        <div style='height: 90vh;'>
          <h2 style='color: #8B5CF6;'>Lesionado N° ${i + 1}</h2>
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Nombre: <span style='font-weight: 200;'>${
            el.name
          }</span></h4>
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Apellido: <span style='font-weight: 200;'>${
            el.lastName
          }</span></h4>
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Fecha de nacimiento: <span style='font-weight: 200;'>${
            el.birthDate
          }</span></h4>
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>DNI: <span style='font-weight: 200;'>${
            el.dni
          }</span></h4>
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Email: <span style='font-weight: 200;'>${
            el.email
          }</span></h4>
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Genero: <span style='font-weight: 200;'>${
            el.gender
          }</span></h4>
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Numero telefonico: <span style='font-weight: 200;'>${
            el.phoneNumber
          }</span></h4>
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Tipo de lesiones: <span style='font-weight: 200;'>${
            el.injuries
          }</span></h4>
          </div>
          </section>
          `)
              : text.push(`
              <div style='min-height: 88vh'>
              <h2 style='padding: 20px 0; color: #8B5CF6;'>Lesionado N° ${
                i + 1
              }</h2>
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Nombre: <span style='font-weight: 200;'>${
            el.name
          }</span></h4>
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Apellido: <span style='font-weight: 200;'>${
            el.lastName
          }</span></h4>
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Fecha de nacimiento: <span style='font-weight: 200;'>${
            el.birthDate
          }</span></h4>
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>DNI: <span style='font-weight: 200;'>${
            el.dni
          }</span></h4>
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Email: <span style='font-weight: 200;'>${
            el.email
          }</span></h4>
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Genero: <span style='font-weight: 200;'>${
            el.gender
          }</span></h4>
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Numero telefonico: <span style='font-weight: 200;'>${
            el.phoneNumber
          }</span></h4>
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Tipo de lesiones: <span style='font-weight: 200;'>${
            el.injuries
          }</span></h4> 
          </div>`);
            return text.join(',');
          },
        );
        pdfContent += `
        <section style='font-family: sans-serif; margin: 0 20px; min-height: 100vh;'>
        <header style='border-bottom: 1px solid #000; margin-bottom: 20px; width: 100%; color: #8B5CF6; height: 6vh;'>
          <div style='width: 100%; display: flex; justify-content: flex-end;'>
            <h2 style='margin-left: auto; padding-right: 20px;' >ReclamoWeb</h2>
          </div>
        </header>
        <div>
          <h2 style='color: #8B5CF6; height: 2vh'>Terceros lesionados</h2>
           ${algo.join('')}
        </div>
        </section>
 
        `;
      }

      if (thirdPartyVehicleDTO) {
        const algo2 = thirdPartyVehicleDTO.thirdPartyVehicleInfo.map(
          (el: ThirdPartyVehicleDTO & ThirdPartyDriverDTO, i: number) => {
            const text = [];
            !(i === 0)
              ? text.push(`
        <section style='font-family: sans-serif; margin: 0 20px; min-height: 100vh;'>
        <header style='border-bottom: 1px solid #000; margin-bottom: 20px; width: 100%; color: #8B5CF6; height: 6vh;'>
          <div style='width: 100%; display: flex; justify-content: flex-end;'>
            <h2 style='margin-left: auto; padding-right: 20px;' >ReclamoWeb</h2>
          </div>
        </header>
        <div style='height: 85vh;'>
          <h2 style='color: #8B5CF6;'>Vehiculo N° ${i + 1}</h2>
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Nombre: <span style='font-weight: 200;'>${
            el.name
          }</span></h4>
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Año: <span style='font-weight: 200;'>${
            el.year
          }</span></h4>
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Patente: <span style='font-weight: 200;'>${
            el.plate
          }</span></h4>
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Marca: <span style='font-weight: 200;'>${
            el.brand
          }</span></h4>
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Modelo: <span style='font-weight: 200;'>${
            el.model
          }</span></h4>
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Compañia de seguros: <span style='font-weight: 200;'>${
            el.insuranceCompany
          }</span></h4>
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Poliza de seguros: <span style='font-weight: 200;'>${
            el.insurancePolicy
          }</span></h4>
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Nombre del propietario: <span style='font-weight: 200;'>${
            el.ownerName
          }</span></h4>
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Apellido del propietario: <span style='font-weight: 200;'>${
            el.ownerLastName
          }</span></h4>
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>DNI del propietario: <span style='font-weight: 200;'>${
            el.ownerDni
          }</span></h4>
          <div style="display: flex; flex-direction: column">
            <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Fotos de la denuncia:</h4>
            <div style="display: flex; flex-wrap: wrap; gap: 5px">
              ${(el.licensePhoto as unknown as string[]).map(
                (el: string) =>
                  `
                <img src="${el}" style="max-width: 30%; max-height: 300px; object-fit: contain;"/>
                `,
              )}
            </div>
          </div>
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Email del conductor: <span style='font-weight: 200;'>${
            el.email
          }</span></h4>  
          ${
            el.name || el.lastName || el.dni
              ? `
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Nombre del conductor: <span style='font-weight: 200;'>${el.name}</span></h4> 
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Apellido del conductor: <span style='font-weight: 200;'>${el.lastName}</span></h4> 
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>DNI del conductor: <span style='font-weight: 200;'>${el.dni}</span></h4> 
          `
              : ''
          } 
        <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Residencia del conductor: <span style='font-weight: 200;'>${
          el.address
        }</span></h4> 
        <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Telefono del conductor: <span style='font-weight: 200;'>${
          el.phoneNumber
        }</span></h4> 
        </div>
        </section>
        `)
              : text.push(`
          <div style='height: 88vh;'>
          <h2 style='padding-bottom: 20px 0; color: #8B5CF6;'>Vehiculo N° ${
            i + 1
          }</h2>
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Nombre: <span style='font-weight: 200;'>${
            el.name
          }</span></h4>
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Año: <span style='font-weight: 200;'>${
            el.year
          }</span></h4>
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Patente: <span style='font-weight: 200;'>${
            el.plate
          }</span></h4>
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Marca: <span style='font-weight: 200;'>${
            el.brand
          }</span></h4>
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Modelo: <span style='font-weight: 200;'>${
            el.model
          }</span></h4>
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Compañia de seguros: <span style='font-weight: 200;'>${
            el.insuranceCompany
          }</span></h4>
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Poliza de seguros: <span style='font-weight: 200;'>${
            el.insurancePolicy
          }</span></h4>
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Nombre del propietario: <span style='font-weight: 200;'>${
            el.ownerName
          }</span></h4>
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Apellido del propietario: <span style='font-weight: 200;'>${
            el.ownerLastName
          }</span></h4>
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>DNI del propietario: <span style='font-weight: 200;'>${
            el.ownerDni
          }</span></h4>
          <div style="display: flex; flex-direction: column">
            <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Fotos de la denuncia:</h4>
            <div style="display: flex; flex-wrap: wrap; gap: 5px">
              ${(el.licensePhoto as unknown as string[]).map(
                (el: string) =>
                  `
                <img src="${el}" style="max-width: 30%; max-height: 300px; object-fit: contain;"/>
                `,
              )}
            </div>
          </div>
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Email del conductor: <span style='font-weight: 200;'>${
            el.email
          }</span></h4>  
          ${
            el.name || el.lastName || el.dni
              ? `
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Nombre del conductor: <span style='font-weight: 200;'>${el.name}</span></h4> 
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Apellido del conductor: <span style='font-weight: 200;'>${el.lastName}</span></h4> 
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>DNI del conductor: <span style='font-weight: 200;'>${el.dni}</span></h4> 
          `
              : ''
          } 
        <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Residencia del conductor: <span style='font-weight: 200;'>${
          el.address
        }</span></h4> 
        <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Telefono del conductor: <span style='font-weight: 200;'>${
          el.phoneNumber
        }</span></h4> 
        </div>
        `);

            return text.join(',');
          },
        );
        pdfContent += `
        <section style='font-family: sans-serif; margin: 0 20px; min-height: 100vh;'>
        <header style='border-bottom: 1px solid #000; margin-bottom: 20px; width: 100%; color: #8B5CF6; height: 6vh;'>
          <div style='width: 100%; display: flex; justify-content: flex-end;'>
            <h2 style='margin-left: auto; padding-right: 20px;' >ReclamoWeb</h2>
          </div>
        </header>
        <div>
          <h2 style='color: #8B5CF6; height: 2vh'>Vehiculo de terceros</h2>
           ${algo2.join('')}

        </div>
        </section>
        `;
      }

      await page.setContent(pdfContent);
      const pdfBuffer = await page.pdf({ format: 'A4' });

      await browser.close();
      if (!pdfBuffer) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Error generatin PDF',
        });
      }
      return pdfBuffer;
    } catch (err) {
      throw ErrorManager.createSignaturError(err.message);
    }
  }

  public async sendPdfEmail(
    pdfBuffer: any,
    recipients: string[],
  ): Promise<void> {
    try {
      // process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
      const configService = new ConfigService();
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: `${configService.get('EMAIL_USER')}`,
          pass: `${configService.get('EMAIL_PASSWORD')}`,
        },
        tls: {
          rejectUnauthorized: false,
        },
        requireTLS: true,
      });

      const mailOptions = {
        from: `Aqui esta su denuncia <${configService.get('EMAIL_USER')}>`,
        to: recipients.join(', '),
        subject: 'PDF Denuncia',
        text: 'Aqui esta la denuncia que solicito.',
        attachments: [
          {
            filename: 'Denuncia.pdf',
            content: pdfBuffer,
          },
        ],
      };

      await transporter.sendMail(mailOptions);

      // delete process.env.NODE_TLS_REJECT_UNAUTHORIZED;
    } catch (err) {
      throw ErrorManager.createSignaturError(err.message);
    }
  }

  public async getAllVehicles(): Promise<Sinister[]> {
    try {
      const sinisters: Sinister[] = await this.sinisterRepository.find();
      if (sinisters.length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No users found',
        });
      }
      return sinisters;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async getVehicleById(id: string): Promise<Sinister> {
    try {
      const sinister = await this.sinisterRepository
        .createQueryBuilder('sinister')
        .where({ id })
        //  .leftJoinAndSelect('asset.asset', 'users')
        //  .leftJoinAndSelect('user.users', 'asset')
        .getOne();

      if (!sinister) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No users found',
        });
      }
      return sinister;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async createSinister(body: SinisterDTO): Promise<Sinister> {
    try {
      const sinister = await this.sinisterRepository.save(body);
      if (!sinister) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Sinister not found',
        });
      }
      return sinister;
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }

  // User
  public async createUserVehicleTheft(
    userDTO: UserDTO,
    vehicleDTO: VehicleDTO,
    gncDTO: GncDTO,
    theftDTO: TheftDTO,
    theftTireDTO: TheftTireDTO,
    assetDTO: AssetDTO,
    swornDeclaration: boolean,
  ) {
    try {
      if (!swornDeclaration) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Without sworn declaration',
        });
      }
      const newVehicle = await this.vehicleService.createVehicle(vehicleDTO);

      if (newVehicle.gnc) {
        const vehicleGnc = {
          ...gncDTO,
          vehicle: newVehicle.id,
        };

        await this.gncService.createGnc(vehicleGnc);
      }

      const newUser = await this.userService.createUser(userDTO);

      const fullAsset = {
        ...assetDTO,
        vehicle: newVehicle,
        users: newUser,
      };

      const newAsset = await this.assetService.createAsset(fullAsset);

      const theftDate = theftDTO.date;
      const theftLocation = theftDTO.location;
      const theftTime = theftDTO.time;

      const bodySinister: SinisterDTO = {
        date: theftDate,
        location: theftLocation,
        time: theftTime,
        asset: newAsset,
      };

      const newSinister = await this.sinisterRepository.save(bodySinister);

      const newTheft = await this.theftService.createTheft(theftDTO);

      if (newTheft.isTire) {
        const theftTire = {
          ...theftTireDTO,
          theft: newTheft.id,
        };

        await this.theftTireService.createTheftTire(theftTire);
      }

      const bodySinisterType = {
        crash: undefined,
        fire: undefined,
        damage: undefined,
        theft: newTheft,
        sinister: newSinister,
      };

      //newSinisterType
      await this.sinisterTypeService.createSinisterType(bodySinisterType);

      const response = {
        sinister: newSinister,
      };

      //Generate PDF and send Email
      const generatePdf = await this.generarPDF({
        userDTO,
        vehicleDTO,
        gncDTO,
        theftDTO,
        theftTireDTO,
        assetDTO,
      });

      this.sendPdfEmail(generatePdf, [userDTO.email]);

      return response;
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }

  public async createUserVehicleFire(
    userDTO: UserDTO,
    vehicleDTO: VehicleDTO,
    gncDTO: GncDTO,
    fireDTO: FireDTO,
    injuredDTO: InjuredData,
    assetDTO: AssetDTO,
    swornDeclaration: boolean,
  ) {
    try {
      if (!swornDeclaration) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Without sworn declaration',
        });
      }
      const newVehicle = await this.vehicleService.createVehicle(vehicleDTO);

      if (newVehicle.gnc) {
        const vehicleGnc = {
          ...gncDTO,
          vehicle: newVehicle.id,
        };

        await this.gncService.createGnc(vehicleGnc);
      }

      const newUser = await this.userService.createUser(userDTO);

      const fullAsset = {
        ...assetDTO,
        vehicle: newVehicle,
        users: newUser,
      };

      const newAsset = await this.assetService.createAsset(fullAsset);

      const fireDate = fireDTO.date;
      const fireLocation = fireDTO.location;
      const fireTime = fireDTO.time;

      const bodySinister: SinisterDTO = {
        date: fireDate,
        location: fireLocation,
        time: fireTime,
        asset: newAsset,
      };

      const newSinister = await this.sinisterRepository.save(bodySinister);

      const newFire = await this.fireService.createFire(fireDTO);

      const bodySinisterType: sinisterTypeDTO = {
        crash: undefined,
        fire: newFire,
        damage: undefined,
        theft: undefined,
        sinister: newSinister,
      };

      //newSinisterType
      await this.sinisterTypeService.createSinisterType(bodySinisterType);

      if (injuredDTO) {
        let newInjured: InjuredDTO & Injured;

        if (newFire.thirdInjured && injuredDTO.amount) {
          const bodyInjured: InjuredDTO = {
            amount: injuredDTO.amount,
            injuredInfo: injuredDTO.injuredInfo,
            sinister: newSinister,
          };

          newInjured = await this.injuredService.createInjured(bodyInjured);

          const allPeopleInjured = injuredDTO.injuredInfo;

          for (let i = 0; i < allPeopleInjured.length; i++) {
            const el = allPeopleInjured[i];

            const bodyInjuredInfo: InjuredInfoDTO = {
              ...el,
              injured: newInjured,
            };
            await this.injuredInfoService.createInjuredInfo(bodyInjuredInfo);
          }
        }
      }

      //Generate PDF and send Email
      const generatePdf = await this.generarPDF({
        userDTO,
        vehicleDTO,
        gncDTO,
        fireDTO,
        injuredDTO,
      });

      this.sendPdfEmail(generatePdf, [userDTO.email]);

      const response = {
        injured: newSinister,
      };

      return response;
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }

  public async createUserVehicleCrash(
    userDTO: UserDTO,
    vehicleDTO: VehicleDTO,
    gncDTO: GncDTO,
    crashDTO: CrashDTO,
    injuredDTO: InjuredData,
    thirdPartyVehicleDTO: ThirdPartyVehicleData,
    assetDTO: AssetDTO,
    swornDeclaration: boolean,
  ) {
    try {
      if (!swornDeclaration) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Without sworn declaration',
        });
      }
      const newVehicle = await this.vehicleService.createVehicle(vehicleDTO);

      if (newVehicle.gnc) {
        const vehicleGnc = {
          ...gncDTO,
          vehicle: newVehicle.id,
        };

        await this.gncService.createGnc(vehicleGnc);
      }

      const newUser = await this.userService.createUser(userDTO);

      const fullAsset = {
        ...assetDTO,
        vehicle: newVehicle,
        users: newUser,
      };

      const newAsset = await this.assetService.createAsset(fullAsset);

      const crashDate = crashDTO.date;
      const crashLocation = crashDTO.location;
      const crashTime = crashDTO.time;

      const bodySinister: SinisterDTO = {
        date: crashDate,
        location: crashLocation,
        time: crashTime,
        asset: newAsset,
      };

      const newSinister = await this.sinisterRepository.save(bodySinister);

      const newCrash = await this.crashService.createCrash(crashDTO);

      const bodySinisterType: sinisterTypeDTO = {
        crash: newCrash,
        fire: undefined,
        damage: undefined,
        theft: undefined,
        sinister: newSinister,
      };

      //newSinisterType
      await this.sinisterTypeService.createSinisterType(bodySinisterType);

      if (injuredDTO) {
        let newInjured: InjuredDTO & Injured;

        if (newCrash.thirdInjured) {
          const bodyInjured: InjuredDTO = {
            amount: injuredDTO.amount,
            injuredInfo: injuredDTO.injuredInfo,
            sinister: newSinister,
          };

          newInjured = await this.injuredService.createInjured(bodyInjured);

          const allPeopleInjured = injuredDTO.injuredInfo;

          for (let i = 0; i < allPeopleInjured.length; i++) {
            const el = allPeopleInjured[i];

            const bodyInjuredInfo: InjuredInfoDTO = {
              ...el,
              injured: newInjured,
            };
            await this.injuredInfoService.createInjuredInfo(bodyInjuredInfo);
          }
        }
      }

      let newThirdPartyVehicle: ThirdPartyVehicle;
      const thirdPartyVehicleEmails: string[] = [];

      const allThirdParty: ThirdParty =
        thirdPartyVehicleDTO.thirdPartyVehicleInfo;
      if (allThirdParty) {
        for (let i = 0; i < allThirdParty.length; i++) {
          const el = allThirdParty[i];
          thirdPartyVehicleEmails.push(el.email);

          const bodyThirdPartyVehicle: ThirdPartyVehicleDTO = {
            brand: el.brand,
            model: el.model,
            year: el.year,
            plate: el.plate,
            insuranceCompany: el.insuranceCompany,
            insurancePolicy: el.insurancePolicy,
            ownerName: el.ownerLastName,
            ownerLastName: el.ownerLastName,
            ownerDni: el.ownerDni,
            sinister: newSinister,
          };

          newThirdPartyVehicle =
            await this.thirdPartyVehicleService.createThirdPartyVehicle(
              bodyThirdPartyVehicle,
            );

          const bodyThirdPartyDriver: ThirdPartyDriverDTO = {
            name: el.name,
            lastName: el.lastName,
            dni: el.dni,
            address: el.address,
            phoneNumber: el.phoneNumber,
            licensePhoto: el.licensePhoto,
            email: el.email,
            thirdPartyVehicle: newThirdPartyVehicle,
          };

          //newThirdPartyDriver
          await this.thirdPartyDriverService.createThirdPartyDriver(
            bodyThirdPartyDriver,
          );
        }
      }

      //Generate PDF and send Email
      const generatePdf = await this.generarPDF({
        userDTO,
        vehicleDTO,
        gncDTO,
        crashDTO,
        injuredDTO,
        thirdPartyVehicleDTO,
      });

      const emails = crashDTO.friendlyStatement
        ? [userDTO.email, ...thirdPartyVehicleEmails]
        : [userDTO.email];

      this.sendPdfEmail(generatePdf, [...emails]);

      const response = {
        thirdParty: newSinister,
      };

      return response;
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }

  public async createUserElectronicTheft(
    userDTO: UserDTO,
    electronicDTO: ElectronicsDTO,
    smartPhoneDTO: SmartphoneDTO,
    theftDTO: TheftDTO,
    theftTireDTO: TheftTireDTO,
    assetDTO: AssetDTO,
    swornDeclaration: boolean,
  ) {
    try {
      if (!swornDeclaration) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Without sworn declaration',
        });
      }
      const newElectronic = await this.electronicService.createElectronics(
        electronicDTO,
      );

      if (newElectronic.type === 'CELULAR') {
        const relatedSmartphone = {
          ...smartPhoneDTO,
          electronics: newElectronic.id,
        };

        await this.smartphoneService.createSmartphone(relatedSmartphone);
      }

      const newUser = await this.userService.createUser(userDTO);

      const fullAsset = {
        ...assetDTO,
        electronics: newElectronic,
        users: newUser,
      };

      const newAsset = await this.assetService.createAsset(fullAsset);

      const theftDate = theftDTO.date;
      const theftLocation = theftDTO.location;
      const theftTime = theftDTO.time;

      const bodySinister: SinisterDTO = {
        date: theftDate,
        location: theftLocation,
        time: theftTime,
        asset: newAsset,
      };

      const newSinister = await this.sinisterRepository.save(bodySinister);

      const newTheft = await this.theftService.createTheft(theftDTO);

      if (newTheft.isTire) {
        const theftTire = {
          ...theftTireDTO,
          theft: newTheft.id,
        };

        await this.theftTireService.createTheftTire(theftTire);
      }

      const bodySinisterType = {
        crash: undefined,
        fire: undefined,
        damage: undefined,
        theft: newTheft,
        sinister: newSinister,
      };

      //newSinisterType
      await this.sinisterTypeService.createSinisterType(bodySinisterType);

      const response = {
        sinister: newSinister,
      };

      //Generate PDF and send Email
      const generatePdf = await this.generarPDF({
        userDTO,
        electronicDTO,
        smartPhoneDTO,
        theftDTO,
        theftTireDTO,
      });

      this.sendPdfEmail(generatePdf, [userDTO.email]);

      return response;
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }

  // Legaluser
  public async createLegalUserVehicleTheft(
    legalUserDTO: LegalUsersDTO,
    vehicleDTO: VehicleDTO,
    gncDTO: GncDTO,
    theftDTO: TheftDTO,
    theftTireDTO: TheftTireDTO,
    assetDTO: AssetDTO,
    swornDeclaration: boolean,
  ) {
    try {
      if (!swornDeclaration) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Without sworn declaration',
        });
      }
      const newVehicle = await this.vehicleService.createVehicle(vehicleDTO);

      if (newVehicle.gnc) {
        const vehicleGnc = {
          ...gncDTO,
          vehicle: newVehicle.id,
        };

        await this.gncService.createGnc(vehicleGnc);
      }

      const newLegalUser = await this.legalUserService.createLegalUsers(
        legalUserDTO,
      );

      const fullAsset = {
        ...assetDTO,
        vehicle: newVehicle,
        legalUsers: newLegalUser,
      };

      const newAsset = await this.assetService.createAsset(fullAsset);

      const theftDate = theftDTO.date;
      const theftLocation = theftDTO.location;
      const theftTime = theftDTO.time;

      const bodySinister: SinisterDTO = {
        date: theftDate,
        location: theftLocation,
        time: theftTime,
        asset: newAsset,
      };

      const newSinister = await this.sinisterRepository.save(bodySinister);

      const newTheft = await this.theftService.createTheft(theftDTO);

      if (newTheft.isTire) {
        const theftTire = {
          ...theftTireDTO,
          theft: newTheft.id,
        };

        await this.theftTireService.createTheftTire(theftTire);
      }

      const bodySinisterType = {
        crash: undefined,
        fire: undefined,
        damage: undefined,
        theft: newTheft,
        sinister: newSinister,
      };

      //newSinisterType
      await this.sinisterTypeService.createSinisterType(bodySinisterType);

      const response = {
        sinister: newSinister,
      };

      //Generate PDF and send Email
      const generatePdf = await this.generarPDF({
        legalUserDTO,
        vehicleDTO,
        gncDTO,
        theftDTO,
        theftTireDTO,
      });

      this.sendPdfEmail(generatePdf, [legalUserDTO.email]);

      return response;
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }

  public async createLegalUserVehicleFire(
    legalUserDTO: LegalUsersDTO,
    vehicleDTO: VehicleDTO,
    gncDTO: GncDTO,
    fireDTO: FireDTO,
    injuredDTO: InjuredData,
    assetDTO: AssetDTO,
    swornDeclaration: boolean,
  ) {
    try {
      if (!swornDeclaration) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Without sworn declaration',
        });
      }
      const newVehicle = await this.vehicleService.createVehicle(vehicleDTO);

      if (newVehicle.gnc) {
        const vehicleGnc = {
          ...gncDTO,
          vehicle: newVehicle.id,
        };

        await this.gncService.createGnc(vehicleGnc);
      }

      const newLegalUser = await this.legalUserService.createLegalUsers(
        legalUserDTO,
      );

      const fullAsset = {
        ...assetDTO,
        vehicle: newVehicle,
        legalUsers: newLegalUser,
      };

      const newAsset = await this.assetService.createAsset(fullAsset);

      const fireDate = fireDTO.date;
      const fireLocation = fireDTO.location;
      const fireTime = fireDTO.time;

      const bodySinister: SinisterDTO = {
        date: fireDate,
        location: fireLocation,
        time: fireTime,
        asset: newAsset,
      };

      const newSinister = await this.sinisterRepository.save(bodySinister);

      const newFire = await this.fireService.createFire(fireDTO);

      const bodySinisterType: sinisterTypeDTO = {
        crash: undefined,
        fire: newFire,
        damage: undefined,
        theft: undefined,
        sinister: newSinister,
      };

      //newSinisterType
      await this.sinisterTypeService.createSinisterType(bodySinisterType);

      if (injuredDTO) {
        let newInjured: InjuredDTO & Injured;

        if (newFire.thirdInjured && injuredDTO.amount) {
          const bodyInjured: InjuredDTO = {
            amount: injuredDTO.amount,
            injuredInfo: injuredDTO.injuredInfo,
            sinister: newSinister,
          };

          newInjured = await this.injuredService.createInjured(bodyInjured);

          const allPeopleInjured = injuredDTO.injuredInfo;

          for (let i = 0; i < allPeopleInjured.length; i++) {
            const el = allPeopleInjured[i];

            const bodyInjuredInfo: InjuredInfoDTO = {
              ...el,
              injured: newInjured,
            };
            await this.injuredInfoService.createInjuredInfo(bodyInjuredInfo);
          }
        }
      }

      const response = {
        injured: newSinister,
      };

      //Generate PDF and send Email
      const generatePdf = await this.generarPDF({
        legalUserDTO,
        vehicleDTO,
        gncDTO,
        fireDTO,
        injuredDTO,
      });

      this.sendPdfEmail(generatePdf, [legalUserDTO.email]);

      return response;
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }

  public async createLegalUserVehicleCrash(
    legalUserDTO: LegalUsersDTO,
    vehicleDTO: VehicleDTO,
    gncDTO: GncDTO,
    crashDTO: CrashDTO,
    injuredDTO: InjuredData,
    thirdPartyVehicleDTO: ThirdPartyVehicleData,
    assetDTO: AssetDTO,
    swornDeclaration: boolean,
  ) {
    try {
      if (!swornDeclaration) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Without sworn declaration',
        });
      }
      const newVehicle = await this.vehicleService.createVehicle(vehicleDTO);

      if (newVehicle.gnc) {
        const vehicleGnc = {
          ...gncDTO,
          vehicle: newVehicle.id,
        };

        await this.gncService.createGnc(vehicleGnc);
      }

      const newLegalUser = await this.legalUserService.createLegalUsers(
        legalUserDTO,
      );

      const fullAsset = {
        ...assetDTO,
        vehicle: newVehicle,
        legalUsers: newLegalUser,
      };

      const newAsset = await this.assetService.createAsset(fullAsset);

      const crashDate = crashDTO.date;
      const crashLocation = crashDTO.location;
      const crashTime = crashDTO.time;

      const bodySinister: SinisterDTO = {
        date: crashDate,
        location: crashLocation,
        time: crashTime,
        asset: newAsset,
      };

      const newSinister = await this.sinisterRepository.save(bodySinister);

      const newCrash = await this.crashService.createCrash(crashDTO);

      const bodySinisterType: sinisterTypeDTO = {
        crash: newCrash,
        fire: undefined,
        damage: undefined,
        theft: undefined,
        sinister: newSinister,
      };

      //newSinisterType
      await this.sinisterTypeService.createSinisterType(bodySinisterType);

      if (injuredDTO) {
        let newInjured: InjuredDTO & Injured;

        if (newCrash.thirdInjured && injuredDTO.amount) {
          const bodyInjured: InjuredDTO = {
            amount: injuredDTO.amount,
            injuredInfo: injuredDTO.injuredInfo,
            sinister: newSinister,
          };

          newInjured = await this.injuredService.createInjured(bodyInjured);

          const allPeopleInjured = injuredDTO.injuredInfo;

          for (let i = 0; i < allPeopleInjured.length; i++) {
            const el = allPeopleInjured[i];

            const bodyInjuredInfo: InjuredInfoDTO = {
              ...el,
              injured: newInjured,
            };
            await this.injuredInfoService.createInjuredInfo(bodyInjuredInfo);
          }
        }
      }

      let newThirdPartyVehicle: ThirdPartyVehicle;
      const thirdPartyVehicleMails: string[] = [];

      if (crashDTO.friendlyStatement) {
        const allThirdParty: ThirdParty =
          thirdPartyVehicleDTO.thirdPartyVehicleInfo;

        for (let i = 0; i < allThirdParty.length; i++) {
          const el = allThirdParty[i];
          thirdPartyVehicleMails.push(el.email);
          const bodyThirdPartyVehicle: ThirdPartyVehicleDTO = {
            brand: el.brand,
            model: el.model,
            year: el.year,
            plate: el.plate,
            insuranceCompany: el.insuranceCompany,
            insurancePolicy: el.insurancePolicy,
            ownerName: el.ownerLastName,
            ownerLastName: el.ownerLastName,
            ownerDni: el.ownerDni,
            sinister: newSinister,
          };

          newThirdPartyVehicle =
            await this.thirdPartyVehicleService.createThirdPartyVehicle(
              bodyThirdPartyVehicle,
            );

          const bodyThirdPartyDriver: ThirdPartyDriverDTO = {
            name: el.name,
            lastName: el.lastName,
            dni: el.dni,
            address: el.address,
            phoneNumber: el.phoneNumber,
            licensePhoto: el.licensePhoto,
            email: el.email,
            thirdPartyVehicle: newThirdPartyVehicle,
          };

          //newThirdPartyDriver
          await this.thirdPartyDriverService.createThirdPartyDriver(
            bodyThirdPartyDriver,
          );
        }
      }

      const response = {
        thirdParty: newSinister,
      };

      //Generate PDF and send Email
      const generatePdf = await this.generarPDF({
        legalUserDTO,
        vehicleDTO,
        gncDTO,
        crashDTO,
        injuredDTO,
        thirdPartyVehicleDTO,
      });

      const emails = crashDTO.friendlyStatement
        ? [legalUserDTO.email, ...thirdPartyVehicleMails]
        : [legalUserDTO.email];

      this.sendPdfEmail(generatePdf, [...emails]);

      return response;
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }

  public async createLegalUserElectronicTheft(
    legalUserDTO: LegalUsersDTO,
    electronicDTO: ElectronicsDTO,
    smartPhoneDTO: SmartphoneDTO,
    theftDTO: TheftDTO,
    theftTireDTO: TheftTireDTO,
    assetDTO: AssetDTO,
    swornDeclaration: boolean,
  ) {
    try {
      if (!swornDeclaration) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Without sworn declaration',
        });
      }
      const newElectronic = await this.electronicService.createElectronics(
        electronicDTO,
      );

      if (newElectronic.type === 'CELULAR') {
        const relatedSmartphone = {
          ...smartPhoneDTO,
          electronics: newElectronic.id,
        };

        await this.smartphoneService.createSmartphone(relatedSmartphone);
      }

      const newLegalUser = await this.legalUserService.createLegalUsers(
        legalUserDTO,
      );

      const fullAsset = {
        ...assetDTO,
        electronics: newElectronic,
        legalUsers: newLegalUser,
      };

      const newAsset = await this.assetService.createAsset(fullAsset);

      const theftDate = theftDTO.date;
      const theftLocation = theftDTO.location;
      const theftTime = theftDTO.time;

      const bodySinister: SinisterDTO = {
        date: theftDate,
        location: theftLocation,
        time: theftTime,
        asset: newAsset,
      };

      const newSinister = await this.sinisterRepository.save(bodySinister);

      const newTheft = await this.theftService.createTheft(theftDTO);

      if (newTheft.isTire) {
        const theftTire = {
          ...theftTireDTO,
          theft: newTheft.id,
        };

        await this.theftTireService.createTheftTire(theftTire);
      }

      const bodySinisterType = {
        crash: undefined,
        fire: undefined,
        damage: undefined,
        theft: newTheft,
        sinister: newSinister,
      };

      //newSinisterType
      await this.sinisterTypeService.createSinisterType(bodySinisterType);

      const response = {
        sinister: newSinister,
      };

      //Generate PDF and send Email
      const generatePdf = await this.generarPDF({
        legalUserDTO,
        electronicDTO,
        smartPhoneDTO,
        theftDTO,
        theftTireDTO,
      });

      this.sendPdfEmail(generatePdf, [legalUserDTO.email]);

      return response;
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }
}