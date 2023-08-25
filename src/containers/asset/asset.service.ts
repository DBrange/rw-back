import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Asset } from './entities/asset.entity';
import { Repository } from 'typeorm';
import { AssetDTO } from './dto/asset.dto';
import { GncService } from '../gnc/gnc.service';
import { VehicleService } from '../vehicle/vehicle.service';
import { SmartphonesService } from '../smartphones/smartphones.service';
import { ElectronicsService } from '../electronics/electronics.service';
import { UsersService } from '../users/users.service';
import { LegalUsersService } from '../legal-users/legal-users.service';
import { UserDTO } from '../users/dto/user.dto';
import { VehicleDTO } from '../vehicle/dto/vehicle.dto';
import { GncDTO } from '../gnc/dto/gnc.dto';
import { LegalUsersDTO } from '../legal-users/dto/legalUsers.dto';
import { ElectronicsDTO } from '../electronics/dto/electronics.dto';
import { SmartphoneDTO } from '../smartphones/dto/smartphone.dto';
import * as nodemailer from 'nodemailer';
import * as puppeteer from 'puppeteer';
import { ConfigService } from '@nestjs/config';

interface PDF {
  userDTO: UserDTO;
  legalUserDTO: LegalUsersDTO;
  vehicleDTO: VehicleDTO;
  electronicDTO: ElectronicsDTO;
  gncDTO: GncDTO;
  smartphoneDTO: SmartphoneDTO;
}
@Injectable()
export class AssetService {
  constructor(
    @InjectRepository(Asset)
    private readonly assetRepository: Repository<Asset>,
    private readonly vehicleService: VehicleService,
    private readonly gncService: GncService,
    private readonly smartphoneService: SmartphonesService,
    private readonly electronicService: ElectronicsService,
    private readonly userService: UsersService,
    private readonly legalUserService: LegalUsersService,
  ) {}

  public async generarPDF({
    userDTO,
    legalUserDTO,
    vehicleDTO,
    electronicDTO,
    gncDTO,
    smartphoneDTO,
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
       
        <h3>Neumaticos:</h3>
        <h4>Marca: ${vehicleDTO.tireBrand}</h4>
        <h4>Tamaño: ${vehicleDTO.tireSize}</h4>
        <h4>Desgaste: ${vehicleDTO.tireWear}%</h4>

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
          smartphoneDTO
            ? `
        <h4>Numero del movil: ${smartphoneDTO.phoneNumber}</h4>
        <h4>Servicio del movil: ${smartphoneDTO.phoneService}</h4>
        <h4>IMEI: ${smartphoneDTO.imei}</h4>
        `
            : ''
        }
        <h4>Marca: : ${electronicDTO.brand}</h4>
        <h4>Modelo: ${electronicDTO.model}</h4>
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
      const configService = new ConfigService();
      // process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
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
        from: `Aqui esta su inspeccion <${configService.get('EMAIL_USER')}>`,
        to: recipients.join(', '),
        subject: 'PDF Inspection',
        text: 'Here is the PDF inspection you requested.',
        attachments: [
          {
            filename: 'inspection.pdf',
            content: pdfBuffer,
          },
        ],
      };

      await transporter.sendMail(mailOptions);

      // delete process.env.NODE_TLS_REJECT_UNAUTHORIZED;
    } catch (err) {
      console.error('Error sending PDF by email:', err);
    }
  }

  public async createAsset(body: AssetDTO): Promise<Asset> {
    try {
      return await this.assetRepository.save(body);
    } catch (error) {
      throw new Error(error);
    }
  }

  //Ruta vehicle + user
  public async CreateUserVehicle(
    vehicleDTO: VehicleDTO,
    gncDTO: GncDTO,
    userDTO: UserDTO,
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
      const newAsset = await this.assetRepository.save(fullAsset);

      const response = {
        userAsset: newAsset,
      };

      const generatePdf = await this.generarPDF({
        vehicleDTO,
        gncDTO,
        userDTO,
      });

      await this.sendPdfEmail(generatePdf, ['asesincreedaltairr@hotmail.com']);

      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  //Ruta vehicle + legalUser
  public async CreateLegalUserVehicle(
    vehicleDTO: VehicleDTO,
    gncDTO: GncDTO,
    legalUserDTO: LegalUsersDTO,
    assetDTO: AssetDTO,
  ) {
    try {
      const newVehicle = await this.vehicleService.createVehicle(vehicleDTO);

      let newGnc;
      if (newVehicle.gnc) {
        const vehicleGnc = {
          ...gncDTO,
          vehicle: newVehicle.id,
        };
        newGnc = await this.gncService.createGnc(vehicleGnc);
      }

      const newLegalUser = await this.legalUserService.createLegalUsers(
        legalUserDTO,
      );

      let legalAsset;
      if (newLegalUser && newVehicle) {
        const asset = {
          ...assetDTO,
          vehicle: newVehicle,
          legalUsers: newLegalUser,
        };

        legalAsset = await this.assetRepository.save(asset);
      }

      const response = {
        vehicle: newVehicle,
        gnc: newGnc,
        legalUser: newLegalUser,
        legalUserAsset: legalAsset,
      };

      const generatePdf = await this.generarPDF({
        vehicleDTO,
        gncDTO,
        legalUserDTO,
      });

      await this.sendPdfEmail(generatePdf, ['asesincreedaltairr@hotmail.com']);

      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  //Ruta Electronics + user
  public async CreateUserElectronic(
    electronicDTO: ElectronicsDTO,
    smartphoneDTO: SmartphoneDTO,
    userDTO: UserDTO,
    assetDTO: AssetDTO,
  ) {
    try {
      const newElectronic = await this.electronicService.createElectronics(
        electronicDTO,
      );

      let newSmartphone;
      if (newElectronic.type === 'CELULAR') {
        const relatedSmartphone = {
          ...smartphoneDTO,
          electronics: newElectronic.id,
        };

        newSmartphone = await this.smartphoneService.createSmartphone(
          relatedSmartphone,
        );
      }

      const newUser = await this.userService.createUser(userDTO);

      let newAsset;
      if (newUser && newElectronic) {
        const fullAsset = {
          ...assetDTO,
          users: newUser,
          electronics: newElectronic,
        };
        newAsset = await this.assetRepository.save(fullAsset);
      }

      const generatePdf = await this.generarPDF({
        electronicDTO,
        smartphoneDTO,
        userDTO,
      });

      await this.sendPdfEmail(generatePdf, ['asesincreedaltairr@hotmail.com']);

      return { newElectronic, newSmartphone, newAsset };
    } catch (error) {
      throw new Error(error);
    }
  }

  //Ruta Electronic + legalUser
  public async CreateLegalUserElectronic(
    electronicDTO: ElectronicsDTO,
    smartphoneDTO: SmartphoneDTO,
    legalUserDTO: LegalUsersDTO,
    assetDTO: AssetDTO,
  ) {
    try {
      const newElectronic = await this.electronicService.createElectronics(
        electronicDTO,
      );

      let newSmartphone;
      if (newElectronic.type === 'CELULAR') {
        const relatedSmartphone = {
          ...smartphoneDTO,
          electronics: newElectronic.id,
        };

        newSmartphone = await this.smartphoneService.createSmartphone(
          relatedSmartphone,
        );
      }

      const newLegalUser = await this.legalUserService.createLegalUsers(
        legalUserDTO,
      );

      let newAsset;
      if (newLegalUser && newElectronic) {
        const fullAsset = {
          ...assetDTO,
          legalUsers: newLegalUser,
          electronics: newElectronic,
        };
        newAsset = await this.assetRepository.save(fullAsset);
      }

      const generatePdf = await this.generarPDF({
        electronicDTO,
        smartphoneDTO,
        legalUserDTO,
      });

      await this.sendPdfEmail(generatePdf, ['asesincreedaltairr@hotmail.com']);

      return { newElectronic, newSmartphone, newAsset };
    } catch (error) {
      throw new Error(error);
    }
  }
}
