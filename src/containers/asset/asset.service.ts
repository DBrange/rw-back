import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AssetEntity } from './entities/asset.entity';
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
import { ErrorManager } from 'src/utils/error.manager';

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
    @InjectRepository(AssetEntity)
    private readonly assetRepository: Repository<AssetEntity>,
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
            !vehicleDTO
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
            smartphoneDTO
              ? `
        <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Numero del movil: <span style='font-weight: 200;'>${smartphoneDTO.phoneNumber}</span></h4>
        <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Servicio del movil: <span style='font-weight: 200;'>${smartphoneDTO.phoneService}</span></h4>
        <h4 style='margin-bottom: 5px; font-weight: 600; display:'>IMEI: <span style='font-weight: 200;'>${smartphoneDTO.imei}</span></h4>
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

  public async getAllAssets(): Promise<AssetEntity[]> {
    try {
      // const assets: AssetEntity[] = await this.assetRepository.find({
      //   relations: ['users', 'legalUsers', 'vehicle', 'electronics'],
      // });

      const assets = await this.assetRepository
        .createQueryBuilder('assets')
        .select([
          'assets.id',
          'vehicle.brand',
          'vehicle.model',
          'vehicle.plate',
          'electronics.brand',
          'electronics.model',
          'electronics.type',
        ])
        // .leftJoinAndSelect('assets.users', 'users')
        // .leftJoinAndSelect('assets.legalUsers', 'legalUsers')
        .leftJoin('assets.vehicle', 'vehicle')
        .leftJoin('assets.electronics', 'electronics')
        .getMany();

      if (assets.length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No assets found',
        });
      }
      return assets;
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }

  public async getAssetsById(id: string): Promise<AssetEntity> {
    try {
      const result = await this.assetRepository
        .createQueryBuilder('assets')
        .where({ id })
        .leftJoinAndSelect('assets.users', 'users')
        .leftJoinAndSelect('assets.legalUsers', 'legalUsers')
        .leftJoinAndSelect('assets.vehicle', 'vehicle')
        .leftJoinAndSelect('assets.electronics', 'electronics')
        .getOne();

      if (!result) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No users found',
        });
      }
      return result;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async createAsset(body: AssetDTO): Promise<AssetEntity> {
    try {
      const asset = await this.assetRepository.save(body);

      if (!asset) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No asset found',
        });
      }
      return asset;
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }

  public async CreateUserVehicle(
    vehicleDTO: VehicleDTO,
    gncDTO: GncDTO,
    userDTO: UserDTO,
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

      if (!newVehicle) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'malll',
        });
      }
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

      await this.sendPdfEmail(generatePdf, [userDTO.email]);

      return response;
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }

  //Ruta vehicle + legalUser
  public async CreateLegalUserVehicle(
    vehicleDTO: VehicleDTO,
    gncDTO: GncDTO,
    legalUserDTO: LegalUsersDTO,
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

      await this.sendPdfEmail(generatePdf, [legalUserDTO.email]);

      return response;
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }

  //Ruta Electronics + user
  public async CreateUserElectronic(
    electronicDTO: ElectronicsDTO,
    smartphoneDTO: SmartphoneDTO,
    userDTO: UserDTO,
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

      await this.sendPdfEmail(generatePdf, [userDTO.email]);

      return { newElectronic, newSmartphone, newAsset };
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }

  //Ruta Electronic + legalUser
  public async CreateLegalUserElectronic(
    electronicDTO: ElectronicsDTO,
    smartphoneDTO: SmartphoneDTO,
    legalUserDTO: LegalUsersDTO,
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

      await this.sendPdfEmail(generatePdf, [legalUserDTO.email]);

      return { newElectronic, newSmartphone, newAsset };
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }

  public async createAssetInLegalUser(
    userId: string,
    vehicleDTO: VehicleDTO,
    gncDTO: GncDTO,
    electronicDTO: ElectronicsDTO,
    smartphoneDTO: SmartphoneDTO,
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

      if (vehicleDTO) {
        const newVehicle = await this.vehicleService.createVehicle(vehicleDTO);

        if (newVehicle.gnc) {
          const vehicleGnc = {
            ...gncDTO,
            vehicle: newVehicle.id,
          };
          await this.gncService.createGnc(vehicleGnc);
        }

        const asset = {
          ...assetDTO,
          vehicle: newVehicle,
          legalUsers: userId as unknown as LegalUsersDTO,
        };

        await this.assetRepository.save(asset);
      } else {
        const newElectronic = await this.electronicService.createElectronics(
          electronicDTO,
        );

        if (newElectronic.type === 'CELULAR') {
          const relatedSmartphone = {
            ...smartphoneDTO,
            electronics: newElectronic.id,
          };

          await this.smartphoneService.createSmartphone(relatedSmartphone);
        }

        const fullAsset = {
          ...assetDTO,
          legalUsers: userId as unknown as LegalUsersDTO,
          electronics: newElectronic,
        };
        await this.assetRepository.save(fullAsset);
      }

      return { message: 'La inspeccion a sido realizada con exito' };
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }

  public async createAssetInUser(
    userId: string,
    vehicleDTO: VehicleDTO,
    gncDTO: GncDTO,
    electronicDTO: ElectronicsDTO,
    smartphoneDTO: SmartphoneDTO,
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

      if (vehicleDTO) {
        const newVehicle = await this.vehicleService.createVehicle(vehicleDTO);

        if (newVehicle.gnc) {
          const vehicleGnc = {
            ...gncDTO,
            vehicle: newVehicle.id,
          };
          await this.gncService.createGnc(vehicleGnc);
        }

        const asset = {
          ...assetDTO,
          vehicle: newVehicle,
          users: userId as unknown as UserDTO,
        };

        await this.assetRepository.save(asset);
      } else {
        const newElectronic = await this.electronicService.createElectronics(
          electronicDTO,
        );

        if (newElectronic.type === 'CELULAR') {
          const relatedSmartphone = {
            ...smartphoneDTO,
            electronics: newElectronic.id,
          };

          await this.smartphoneService.createSmartphone(relatedSmartphone);
        }

        const fullAsset = {
          ...assetDTO,
          users: userId as unknown as UserDTO,
          electronics: newElectronic,
        };
        await this.assetRepository.save(fullAsset);
      }

      return { message: 'La inspeccion a sido realizada con exito' };
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }

  public async getUserAssetsForId(id: string) {
    try {
      const user = await this.userService.getAssetOfUser(id);

      return user;
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }

  public async getLegalUserAssetsForId(id: string) {
    try {
      const legalUser = await this.legalUserService.getAssetOfLegalUser(id);

      return legalUser;
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }

}
