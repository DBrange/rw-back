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

      if (userDTO) {
        pdfContent += `
        <h1>Persona particular</h1>
        <h4>Nombre: ${userDTO.name}</h4>
        <h4>Apellido: ${userDTO.lastName}</h4>
        <h4>DNI: ${userDTO.dni}</h4>
        <h4>Fecha de nacimiento: ${userDTO.birthDate}</h4>
        <h4>Genero: ${userDTO.gender}</h4>
        <h4>Numero telefonico: ${userDTO.phoneNumber}</h4>
        <h4>Email: ${userDTO.email}</h4>
        <h4>Email alternativo: ${userDTO.altEmail}</h4>
        <h4>Direccion: ${userDTO.address}</h4>
        <div style="page-break-after: always;"></div>
        `;
      }

      if (legalUserDTO) {
        pdfContent += `
        <h1>Persona juridica</h1>
        <h4>Nombre de la compañia: ${legalUserDTO.companyName}</h4>
        <h4>CUIT: ${legalUserDTO.cuit}</h4>
        <h4>Numero telefonico: ${legalUserDTO.phoneNumber}</h4>
        <h4>Email: ${legalUserDTO.email}</h4>
        <h4>Email alternativo: ${legalUserDTO.altEmail}</h4>
        <h4>Direccion: ${legalUserDTO.address}</h4>
        <div style="page-break-after: always;"></div>
        `;
      }

      if (vehicleDTO) {
        pdfContent += `
        <h1>Vehiculo</h1>
        <h4>Vehiculo tipo: ${vehicleDTO.type}</h4>
        <h4>Patente: ${vehicleDTO.plate}</h4>
        <h4>Año: ${vehicleDTO.year}</h4>
        <h4>Marca: ${vehicleDTO.brand}</h4>
        <h4>Modelo: ${vehicleDTO.model}</h4>
        <h4>Color: ${vehicleDTO.color}</h4>
        <h4>Daño: ${vehicleDTO.damage ? 'Si' : 'No'}</h4>
        <h4>Lugar dañado: ${vehicleDTO.damageLocation}</h4>
        <div style="display: flex; flex-direction: column">
          <p>Fotos del vehiculo</p>
          <div style="display: flex; flex-wrap: wrap ; gap: 5px">
          ${(vehicleDTO.images as unknown as string[]).map(
            (el: string) =>
              `
            <img src="${el}" style="max-width: 30%; height: auto; object-fit: cover;"/>
            `,
          )}
          </div>
        </div>
        <h4>Es 0km: ${vehicleDTO.okm ? 'Si' : 'No'}</h4>
        <h4>Combustible: ${vehicleDTO.fuel}</h4>
        ${
          vehicleDTO && (crashDTO || theftDTO || fireDTO)
            ? ''
            : `
        <h3>Neumaticos:</h3>
        <h4>Marca: ${vehicleDTO.tireBrand}</h4>
        <h4>Tamaño: ${vehicleDTO.tireSize}</h4>
        <h4>Desgaste: ${vehicleDTO.tireWear}%</h4>
        `
        }
        <h4>${vehicleDTO.gnc ? 'Si' : 'No'}</h4>
        ${
          gncDTO
            ? `
        <h4>Numero de oblea: ${gncDTO.oblea}</h4>
        <h4>Fecha de expiracion: ${gncDTO.expireDate}</h4>
        `
            : ''
        }
        <div style="page-break-after: always;"></div>
        `;
      }

      if (electronicDTO) {
        pdfContent += `
        <h1>Electrodomestico</h1>
        <h4>Electrodomestico tipo: ${electronicDTO.type}</h4>
        ${
          smartPhoneDTO
            ? `
        <h4>Numero del movil: ${smartPhoneDTO.phoneNumber}</h4>
        <h4>Servicio del movil: ${smartPhoneDTO.phoneService}</h4>
        <h4>IMEI: ${smartPhoneDTO.imei}</h4>
        `
            : ''
        }
        <h4>Marca: : ${electronicDTO.brand}</h4>
        <h4>Modelo: ${electronicDTO.model}</h4>
        <div style="page-break-after: always;"></div>
        `;
      }

      if (theftDTO) {
        pdfContent += `
        <h1>Denuncia: Robo</h1>
        <h4>Horario del suceso: ${theftDTO.time}</h4>
        <h4>Fecha del suceso: ${theftDTO.date}</h4>
        <h4>Ubicacion del suceso: ${theftDTO.location}</h4>
        <div style="display: flex; flex-direction: column">
          <p>Fotos de la denuncia</p>
          <div style="display: flex; flex-wrap: wrap ; gap: 5px">
          ${(theftDTO.reportPhoto as unknown as string[]).map(
            (el: string) =>
              `<img src="${el}" style="max-width: 30%; height: auto; object-fit: cover;"/>`,
          )}
          </div>
        </div>
        ${
          theftTireDTO && theftDTO.isTire
            ? `
        <h4>Neumaticos robados: ${theftTireDTO.tireAmount}</h4>
        ${
          theftTireDTO.tireAmount > 0
            ? `<h4>Desgaste de los neumaticos: ${theftTireDTO.tireWear}%</h4>`
            : ''
        }
        `
            : ''
        }
        <div style="page-break-after: always;"></div>
        `;
      }

      if (fireDTO) {
        pdfContent += `
        <h1>Denuncia: Incendio</h1>
        <h4>Horario del suceso: ${fireDTO.time}</h4>
        <h4>Fecha del suceso: ${fireDTO.date}</h4>
        <h4>Ubicacion del suceso: ${fireDTO.location}</h4>
        <h4>Detalles del suceso: ${fireDTO.details}</h4>
        <h4>Lesiones: ${fireDTO.injured ? 'Si' : 'No'}</h4>
        ${
          fireDTO.injured
            ? `<h4>Tipo de lesiones: ${fireDTO.injuries}</h4>`
            : ''
        }
        <h4>Ambulancia: ${fireDTO.ambulance ? 'Si' : 'No'}</h4>
        ${
          fireDTO.ambulance
            ? `<h4>Destino de la ambulancia: ${fireDTO.ambulanceTo}</h4>`
            : ''
        }
        <h4>Terceros lesionados: ${fireDTO.thirdInjured ? 'Si' : 'No'}</h4>
        <div style="page-break-after: always;"></div>
        `;
      }

      if (crashDTO) {
        pdfContent += `
         <h1>Denuncia: Choque</h1>
        <h4>Horario del suceso: ${crashDTO.time}</h4>
        <h4>Fecha del suceso: ${crashDTO.date}</h4>
        <h4>Ubicacion del suceso: ${crashDTO.location}</h4>
        <h4>Detalles del suceso: ${crashDTO.details}</h4>
        <h4>Lesiones: ${crashDTO.injured ? 'Si' : 'No'}</h4>
        ${
          crashDTO.injured
            ? `<h4>Tipo de lesiones: ${crashDTO.injuries}</h4>`
            : ''
        }
        <h4>Ambulancia: ${crashDTO.ambulance ? 'Si' : 'No'}</h4>
        ${
          crashDTO.ambulance
            ? `<h4>Destino de la ambulancia: ${crashDTO.ambulanceTo}</h4>`
            : ''
        }
        <h4>Terceros lesionados: ${crashDTO.thirdInjured ? 'Si' : 'No'}</h4>
        <h4>Declaracion amistosa: ${
          crashDTO.friendlyStatement ? 'Si' : 'No'
        }</h4>
        <div style="page-break-after: always;"></div>
        `;
      }

      if (injuredDTO) {
        pdfContent += `
        <h1>Terceros lesionados</h1>
        ${injuredDTO.injuredInfo.map(
          (el: InjuredInfoDTO, i: number) =>
            `
          <h2>Lesionado N° ${i + 1}</h2>
          <h4>Nombre: ${el.name}</h4>
          <h4>Apellido: ${el.lastName}</h4>
          <h4>Fecha de nacimiento: ${el.birthDate}</h4>
          <h4>DNI: ${el.dni}</h4>
          <h4>Email: ${el.email}</h4>
          <h4>Genero: ${el.gender}</h4>
          <h4>Numero telefonico: ${el.phoneNumber}</h4>
          <h4>Tipo de lesiones: ${el.injuries}</h4>
         
          <p>-----------------------------</p>
          `,
        )}
        <div style="page-break-after: always;"></div>
        `;
      }

      if (thirdPartyVehicleDTO) {
        pdfContent += `
        <h1>Vehiculos de terceros</h1>
        ${thirdPartyVehicleDTO.thirdPartyVehicleInfo.map(
          (el: ThirdPartyVehicleDTO & ThirdPartyDriverDTO, i: number) =>
            `
          <h2>Vehiculo N° ${i + 1}</h2>
          <h4>Año: ${el.year}</h4>
          <h4>Patente: ${el.plate}</h4>
          <h4>Marca: ${el.brand}</h4>
          <h4>Modelo: ${el.model}</h4>
          <h4>Compañia de seguros: ${el.insuranceCompany}</h4>
          <h4>Poliza de seguros: ${el.insurancePolicy}</h4>
          <h4>Nombre del propietario: ${el.ownerName}</h4>
          <h4>Apellido del propietario: ${el.ownerLastName}</h4>
          <h4>DNI del propietario: ${el.ownerDni}</h4>
          <div style="display: flex; flex-direction: column">
            <p>Fotos del registro</p>
            <div style="display: flex; flex-wrap: wrap ; gap: 5px">
            ${(el.licensePhoto as unknown as string[]).map(
              (el: string) =>
                `
              <img src="${el}" style="max-width: 30%; height: auto; object-fit: cover;"/>
              `,
            )}
            </div>
          </div>
          <h4>Email del conductor: ${el.email}</h4>
          ${
            el.name || el.lastName || el.dni
              ? `
          <h4>Nombre del conductor: ${el.name}</h4>
          <h4>Apellido del conductor: ${el.lastName}</h4>
          <h4>DNI del conductor: ${el.dni}</h4>
          `
              : ''
          }
          <h4>Residencia del conductor: ${el.address}</h4>
          <h4>Telefono del conductor: ${el.phoneNumber}</h4>
          <p>-----------------------------</p>
          `,
        )}
        <div style="page-break-after: always;"></div>
        `;
      }

      await page.setContent(pdfContent);
      const pdfBuffer = await page.pdf({ format: 'A4' });

      await browser.close();

      return pdfBuffer;
    } catch (err) {
      console.log(err);
      throw new Error('Error generating PDF');
    }
  }

  public async sendPdfEmail(
    pdfBuffer: Buffer,
    recipients: string[],
  ): Promise<void> {
    try {
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: 'asesincreedaltairr@gmail.com',
          pass: 'ptbymyytsctdnlid',
        },
      });

      const mailOptions = {
        from: 'Aqui esta su denuncia <asesincreedaltairr@gmail.com>',
        to: recipients.join(', '),
        subject: 'PDF Report',
        text: 'Here is the PDF report you requested.',
        attachments: [
          {
            filename: 'report.pdf',
            content: pdfBuffer,
          },
        ],
      };

      await transporter.sendMail(mailOptions);

      delete process.env.NODE_TLS_REJECT_UNAUTHORIZED;
    } catch (err) {
      console.error('Error sending PDF by email:', err);
    }
  }

  public async createSinister(body: SinisterDTO): Promise<Sinister> {
    try {
      return await this.sinisterRepository.save(body);
    } catch (error) {
      throw new Error(error);
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
  ) {
    try {
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

      const currentDate = new Date('1998-03-03');
      const bodySinister: SinisterDTO = {
        date: currentDate,
        location: 'algun lugar del mas alla',
        time: '12:12',
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

      this.sendPdfEmail(generatePdf, ['asesincreedaltairr@hotmail.com']);

      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async createUserVehicleFire(
    userDTO: UserDTO,
    vehicleDTO: VehicleDTO,
    gncDTO: GncDTO,
    fireDTO: FireDTO,
    injuredDTO: InjuredData,
    assetDTO: AssetDTO,
  ) {
    try {
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

      const currentDate = new Date('1998-03-03');
      const bodySinister: SinisterDTO = {
        date: currentDate,
        location: 'algun lugar del mas alla',
        time: '12:12',
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

      let newInjured: InjuredDTO & Injured;

      if (newFire.thirdInjured) {
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

      //Generate PDF and send Email
      const generatePdf = await this.generarPDF({
        userDTO,
        vehicleDTO,
        gncDTO,
        fireDTO,
        injuredDTO,
      });

      this.sendPdfEmail(generatePdf, ['asesincreedaltairr@hotmail.com']);

      const response = {
        injured: newInjured,
      };

      return response;
    } catch (error) {
      throw new Error(error);
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
  ) {
    try {
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

      const currentDate = new Date('1998-03-03');
      const bodySinister: SinisterDTO = {
        date: currentDate,
        location: 'algun lugar del mas alla',
        time: '12:12',
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

      let newThirdPartyVehicle: ThirdPartyVehicle;

      if (crashDTO.friendlyStatement) {
        const allThirdParty: ThirdParty =
          thirdPartyVehicleDTO.thirdPartyVehicleInfo;

        for (let i = 0; i < allThirdParty.length; i++) {
          const el = allThirdParty[i];

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

      this.sendPdfEmail(generatePdf, ['asesincreedaltairr@hotmail.com']);

      const response = {
        thirdParty: newThirdPartyVehicle,
      };

      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async createUserElectronicTheft(
    userDTO: UserDTO,
    electronicDTO: ElectronicsDTO,
    smartPhoneDTO: SmartphoneDTO,
    theftDTO: TheftDTO,
    theftTireDTO: TheftTireDTO,
    assetDTO: AssetDTO,
  ) {
    try {
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

      const currentDate = new Date('1998-03-03');
      const bodySinister: SinisterDTO = {
        date: currentDate,
        location: 'algun lugar del mas alla',
        time: '12:12',
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

      this.sendPdfEmail(generatePdf, ['asesincreedaltairr@hotmail.com']);

      return response;
    } catch (error) {
      throw new Error(error);
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
  ) {
    try {
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

      const currentDate = new Date('1998-03-03');
      const bodySinister: SinisterDTO = {
        date: currentDate,
        location: 'algun lugar del mas alla',
        time: '12:12',
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

      this.sendPdfEmail(generatePdf, ['asesincreedaltairr@hotmail.com']);

      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async createLegalUserVehicleFire(
    legalUserDTO: LegalUsersDTO,
    vehicleDTO: VehicleDTO,
    gncDTO: GncDTO,
    fireDTO: FireDTO,
    injuredDTO: InjuredData,
    assetDTO: AssetDTO,
  ) {
    try {
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

      const currentDate = new Date('1998-03-03');
      const bodySinister: SinisterDTO = {
        date: currentDate,
        location: 'algun lugar del mas alla',
        time: '12:12',
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

      let newInjured: InjuredDTO & Injured;

      if (newFire.thirdInjured) {
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

      const response = {
        injured: newInjured,
      };

      //Generate PDF and send Email
      const generatePdf = await this.generarPDF({
        legalUserDTO,
        vehicleDTO,
        gncDTO,
        fireDTO,
        injuredDTO,
      });

      this.sendPdfEmail(generatePdf, ['asesincreedaltairr@hotmail.com']);

      return response;
    } catch (error) {
      throw new Error(error);
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
  ) {
    try {
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

      const currentDate = new Date('1998-03-03');
      const bodySinister: SinisterDTO = {
        date: currentDate,
        location: 'algun lugar del mas alla',
        time: '12:12',
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

      let newThirdPartyVehicle: ThirdPartyVehicle;

      if (crashDTO.friendlyStatement) {
        const allThirdParty: ThirdParty =
          thirdPartyVehicleDTO.thirdPartyVehicleInfo;

        for (let i = 0; i < allThirdParty.length; i++) {
          const el = allThirdParty[i];

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
        thirdParty: newThirdPartyVehicle,
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

      this.sendPdfEmail(generatePdf, ['asesincreedaltairr@hotmail.com']);

      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async createLegalUserElectronicTheft(
    legalUserDTO: LegalUsersDTO,
    electronicDTO: ElectronicsDTO,
    smartPhoneDTO: SmartphoneDTO,
    theftDTO: TheftDTO,
    theftTireDTO: TheftTireDTO,
    assetDTO: AssetDTO,
  ) {
    try {
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

      const currentDate = new Date('1998-03-03');
      const bodySinister: SinisterDTO = {
        date: currentDate,
        location: 'algun lugar del mas alla',
        time: '12:12',
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

      this.sendPdfEmail(generatePdf, ['asesincreedaltairr@hotmail.com']);

      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
}
