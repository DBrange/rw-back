import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { ElectronicDTO } from 'src/containers/electronic/dto/electronic.dto';
import { ElectronicEntity } from 'src/containers/electronic/entities/electronic.entity';
import { ElectronicService } from 'src/containers/electronic/services/electronic.service';
import { GncDTO } from 'src/containers/gnc/dto/gnc.dto';
import { GncEntity } from 'src/containers/gnc/entities/gnc.entity';
import { GncService } from 'src/containers/gnc/services/gnc.service';
import { LegalUserService } from 'src/containers/legal-user/services/legal-user.service';
import { NotificationDTO } from 'src/containers/notification/dto/notification.dto';
import { NotificationEntity } from 'src/containers/notification/entities/notification.entity';
import { NotificationService } from 'src/containers/notification/services/notification.service';
import { SmartphoneDTO } from 'src/containers/smartphone/dto/smartphone.dto';
import { SmartphoneEntity } from 'src/containers/smartphone/entities/smartphone.entity';
import { SmartphoneService } from 'src/containers/smartphone/services/smartphone.service';
import { UserBrokerService } from 'src/containers/user-broker/services/user-broker.service';
import { UserEntity } from 'src/containers/user/entities/user.entity';
import { UserService } from 'src/containers/user/services/user.service';
import { VehicleDTO } from 'src/containers/vehicle/dto/vehicle.dto';
import { VehicleEntity } from 'src/containers/vehicle/entities/vehicle.entity';
import { VehicleService } from 'src/containers/vehicle/services/vehicle.service';
import { ErrorManager } from 'src/utils/error.manager';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { AssetDTO, UpdateAssetDTO } from '../dto/asset.dto';
import { AssetEntity } from '../entities/asset.entity';
import { PDFSaveInAsset } from '../interfaces/pdf-asset.interface';
import * as fileUpload from 'express-fileupload';
import * as fs from 'fs';
import * as nodemailer from 'nodemailer';
import * as puppeteer from 'puppeteer';
import { cloudinaryUpload } from 'src/lib/cloudinary';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AssetService {
  constructor(
    @InjectRepository(AssetEntity)
    private readonly assetRepository: Repository<AssetEntity>,
    private readonly vehicleService: VehicleService,
    private readonly gncService: GncService,
    private readonly smartphoneService: SmartphoneService,
    private readonly electronicService: ElectronicService,
    private readonly userService: UserService,
    private readonly legalUserService: LegalUserService,
    private readonly userBrokerService: UserBrokerService,
    private readonly notificationService: NotificationService,
  ) {}

  public async generatePDFForSave({
    userDTO,
    personalUserDTO,
    legalUserDTO,
    vehicleDTO,
    gncDTO,
    electronicDTO,
    smartphoneDTO,
  }: Partial<PDFSaveInAsset>): Promise<Buffer> {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      let pdfContent = '';

      if (userDTO) {
        pdfContent += `
      <section style='font-family: sans-serif; margin: 0 20px; height: 100vh;'>
        <header style='border-bottom: 1px solid #000; margin-bottom: 20px; width: 100%; color: #8B5CF6;'>
          <div style='width: 100%; display: flex; justify-content: flex-end;'>
            <h2 style='margin-left: auto; padding-right: 20px;' >ReclamoWeb</h2>
          </div>
        </header>
        <div>
          <h2 style='padding: 20px 0; color: #8B5CF6;'>Persona</h2>
          ${
            personalUserDTO
              ? `          
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Nombre: <span style='font-weight: 200;'>${personalUserDTO.name}</span></h4>
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Apellido: <span style='font-weight: 200;'>${personalUserDTO.lastName}</span></h4>
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>DNI: <span style='font-weight: 200;'>${personalUserDTO.dni}</span></h4>
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Fecha de nacimiento: <span style='font-weight: 200;'>${personalUserDTO.birthDate}</span></h4>
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Genero: <span style='font-weight: 200;'>${personalUserDTO.gender}</span></h4>`
              : ''
          }
          ${
            legalUserDTO
              ? `
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Nombre de la compañia: <span style='font-weight: 200;'>${legalUserDTO.companyName}</span></h4>
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>CUIT: <span style='font-weight: 200;'>${legalUserDTO.cuit}</span></h4>`
              : ''
          }
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Numero telefonico: <span style='font-weight: 200;'>${
            userDTO.phoneNumber
          }</span></h4>
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Email: <span style='font-weight: 200;'>${
            userDTO.email
          }</span></h4>
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Email alternativo: <span style='font-weight: 200;'>${
            userDTO.altEmail
          }</span></h4>
          <h4 style='margin-bottom: 5px; font-weight: 600; display:'>Direccion: <span style='font-weight: 200;'>${
            userDTO.address
          }</span></h4>
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

  public async savePdf(entity: AssetEntity, generatePdf: Buffer) {
    try {
      const middleware = fileUpload({});

      middleware(null, null, async () => {
        const archivoSubido = `archivo_generado_${entity.id}.pdf`;

        fs.writeFileSync(archivoSubido, generatePdf);

        const file = await cloudinaryUpload(archivoSubido);

        const pdf = file.secure_url;

        await this.updateAsset(entity.id, { ...entity, pdf });
      });
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }

  public async sendEmail(
    user: { name: string; lastName: string; companyName: string },
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
        from: `<${configService.get('EMAIL_USER')}>`,
        to: recipients.join(', '),
        subject: 'Nueva inspeccion',
        text: `Tiene una nueva de inspeccion creada por ${
          user.companyName ? user.companyName : user.name + ' ' + user.lastName
        }.`,
      };

      await transporter.sendMail(mailOptions);

      // delete process.env.NODE_TLS_REJECT_UNAUTHORIZED;
    } catch (err) {
      throw ErrorManager.createSignaturError(err.message);
    }
  }

  public async createAsset(body: AssetDTO) {
    try {
      return await this.assetRepository.save(body);
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }

  public async getAssets(): Promise<AssetEntity[]> {
    try {
      const assets: AssetEntity[] = await this.assetRepository.find();

      return assets;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async getAssetById(id: string) {
    try {
      const asset = await this.assetRepository
        .createQueryBuilder('assets')
        .where({ id })
        // .leftJoinAndSelect('assets.user', 'user')
        .leftJoinAndSelect('assets.user', 'user')
        .leftJoinAndSelect('user.personalUser', 'userPersonalUser')
        .leftJoinAndSelect('user.legalUser', 'userLegalUser')
        .leftJoinAndSelect('assets.client', 'client')
        .leftJoinAndSelect('client.personalUser', 'personalUser')
        .leftJoinAndSelect('client.legalUser', 'legalUser')
        .leftJoinAndSelect('assets.vehicle', 'vehicle')
        .leftJoinAndSelect('vehicle.gncId', 'gncId')
        .leftJoinAndSelect('assets.electronic', 'electronic')
        .leftJoinAndSelect('electronic.smartphone', 'smartphone')
        .leftJoinAndSelect('assets.sinisters', 'sinisters')
        .getOne();

      if (!asset) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No assets found',
        });
      }
      return asset;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async updateAsset(
    id: string,
    body: UpdateAssetDTO,
  ): Promise<UpdateResult> {
    try {
      const updatedAsset = await this.assetRepository.update(id, body);
      if (updatedAsset.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No assets were updated',
        });
      }

      return updatedAsset;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async deleteAsset(id: string): Promise<DeleteResult> {
    try {
      const asset: DeleteResult = await this.assetRepository.delete(id);

      if (!asset) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Failed to delete asset',
        });
      }

      return asset;
    } catch (err) {
      throw ErrorManager.createSignaturError(err.message);
    }
  }

  private async vehicleInspectionNotification(
    newVehicle: VehicleEntity,
    clientId: string,
    brokerId: string,
  ) {
    const bodyNotificationClient: NotificationDTO = {
      title: 'Inspeccion',
      message: `Se ha realizado una nueva inspeccion - ${newVehicle.plate}`,
      withOptions: false,
      additional: null,
      response: null,
      sender: null,
      receiver: clientId,
    };

    const bodyNotificationBroker: NotificationDTO = {
      title: 'Inspeccion',
      message: `Se ha realizado una nueva inspeccion - ${newVehicle.plate}`,
      withOptions: false,
      additional: null,
      response: null,
      sender: null,
      receiver: brokerId,
    };

    console.log(bodyNotificationClient);
    console.log(bodyNotificationBroker);
    await this.notificationService.createNotification(bodyNotificationClient);
    await this.notificationService.createNotification(bodyNotificationBroker);
  }

  private async electronicInspectionNotification(
    newElectronic: ElectronicEntity,
    clientId: string,
    brokerId: string,
  ) {
    const bodyNotificationClient: NotificationDTO = {
      title: 'Inspeccion',
      message: `Se ha realizado una nueva inspeccion - ${newElectronic.brand} ${newElectronic.model}`,
      withOptions: false,
      additional: null,
      response: null,
      sender: null,
      receiver: clientId,
    };

    const bodyNotificationBroker: NotificationDTO = {
      title: 'Inspeccion',
      message: `Se ha realizado una nueva inspeccion - ${newElectronic.brand} ${newElectronic.model}`,
      withOptions: false,
      additional: null,
      response: null,
      sender: null,
      receiver: brokerId,
    };

    const a = await this.notificationService.createNotification(
      bodyNotificationClient,
    );
    const b = await this.notificationService.createNotification(
      bodyNotificationBroker,
    );

    console.log(a);
    console.log(b);
  }

  public async createVehicleInAsset(
    vehicleDTO: VehicleDTO,
    gncDTO: GncDTO,
    assetDTO: AssetDTO,
    brokerId: string,
    clientId: string,
    pdf?: Buffer,
    inspection?: boolean,
  ) {
    try {
      let newGnc: GncEntity;
      if (vehicleDTO.gnc) {
        const vehicleGnc: GncDTO = {
          ...gncDTO,
        };
        newGnc = await this.gncService.createGnc(vehicleGnc);
      }

      const newVehicle: VehicleEntity = await this.vehicleService.createVehicle(
        {
          ...vehicleDTO,
          gncId: newGnc?.id,
        },
      );

      let asset: AssetDTO;
      if (inspection !== false) {
        asset = {
          ...assetDTO,
          vehicle: newVehicle?.id,
          user: brokerId,
          client: clientId,
          // inspection: inspection === false ? false : true,
        };
      } else {
        asset = {
          ...assetDTO,
          vehicle: newVehicle?.id,
          user: brokerId,
          client: clientId,
          inspection: false,
        };
      }

      if (inspection !== false) {
        await this.vehicleInspectionNotification(
          newVehicle,
          clientId,
          brokerId,
        );
      }

      const newAsset = await this.createAsset(asset);

      if (pdf) {
        await this.savePdf(newAsset, pdf);
      }

      return newAsset;
    } catch (err) {
      throw ErrorManager.createSignaturError(err.message);
    }
  }

  public async createElectronicInAsset(
    electronicDTO: ElectronicDTO,
    smartphoneDTO: SmartphoneDTO,
    assetDTO: AssetDTO,
    brokerId: string,
    clientId: string,
    pdf?: Buffer,
    inspection?: boolean,
  ) {
    try {
      let newSmartphone: SmartphoneEntity | null;
      if (electronicDTO.type === 'CELULAR') {
        const relatedSmartphone: SmartphoneDTO = {
          ...smartphoneDTO,
        };

        newSmartphone = await this.smartphoneService.createSmartphone(
          relatedSmartphone,
        );
      }

      const newElectronic = await this.electronicService.createElectronic({
        ...electronicDTO,
        smartphone: newSmartphone ? newSmartphone.id : null,
      });

      let asset: AssetDTO;
      if (inspection !== false) {
        asset = {
          ...assetDTO,
          electronic: newElectronic.id,
          user: brokerId,
          client: clientId,
          // inspection: inspection === false ? false : true,
        };
      } else {
        asset = {
          ...assetDTO,
          electronic: newElectronic.id,
          user: brokerId,
          client: clientId,
          inspection: false,
        };
      }

      if (inspection !== false) {
        await this.electronicInspectionNotification(
          newElectronic,
          clientId,
          brokerId,
        );
      }

      const newAsset = await this.createAsset(asset);

      if (pdf) {
        await this.savePdf(newAsset, pdf);
      }

      return newAsset;
    } catch (err) {
      throw ErrorManager.createSignaturError(err.message);
    }
  }

  public async createInspection(
    brokerId: string,
    clientId: string,
    vehicleDTO: VehicleDTO,
    gncDTO: GncDTO,
    electronicDTO: ElectronicDTO,
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

      const { legalUser, personalUser, ...rest } =
        await this.userService.userForSinisterPdf(clientId);

      const userDTO = { ...rest };

      const pdf = await this.generatePDFForSave({
        userDTO,
        legalUserDTO: legalUser,
        personalUserDTO: personalUser,
        vehicleDTO,
        gncDTO,
        electronicDTO,
        smartphoneDTO,
      });

      if (vehicleDTO) {
        await this.createVehicleInAsset(
          vehicleDTO,
          gncDTO,
          assetDTO,
          brokerId,
          clientId,
          pdf,
        );
      } else {
        await this.createElectronicInAsset(
          electronicDTO,
          smartphoneDTO,
          assetDTO,
          brokerId,
          clientId,
          pdf,
        );
      }

      const emailFor = personalUser
        ? {
            name: personalUser.name,
            lastName: personalUser.lastName,
            companyName: null,
          }
        : {
            name: null,
            lastName: null,
            companyName: legalUser.companyName,
          };

      const brokerEmail = (await this.userService.userForSinisterPdf(brokerId))
        .email;

      this.sendEmail(emailFor, [brokerEmail]);

      return { message: 'La inspeccion a sido realizada con exito' };
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }

  public async getInspectionsOfClients(
    brokerId: string,
    searchField: string,
    typeToFilter: string,
    page: number,
    limit: number,
  ) {
    try {
      const assets = (await this.userService.getInspectionsOfClients(
        brokerId,
      )) as unknown as AssetEntity[];

      const assetsInspection = assets.filter((el) => el.inspection);
      // Aplicar el filtro según el tipo
      const filteredAssets = assetsInspection.filter((asset) => {
        if (typeToFilter === 'vehicle') {
          return asset.vehicle;
        } else if (typeToFilter === 'electronic') {
          return asset.electronic;
        }
        return false;
      });

      // Aplicar el filtro según el campo de búsqueda
      const regex = new RegExp(`^${searchField}`, 'i');
      const filteredAndSearchedAssets = filteredAssets.filter((asset) => {
        if (typeToFilter === 'vehicle') {
          const vehicle = asset.vehicle as unknown as VehicleEntity;
          return regex.test(vehicle?.plate as string);
        } else if (typeToFilter === 'electronic') {
          const electronic = asset.electronic as unknown as ElectronicEntity;
          return (
            regex.test(electronic?.model) ||
            regex.test(
              (electronic?.smartphone as unknown as SmartphoneEntity)?.imei,
            )
          );
        }
        return false;
      });

      // Aplicar paginación
      const pageSize = limit;
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      const paginatedInspections = filteredAndSearchedAssets.slice(start, end);

      return paginatedInspections;
    } catch (err) {
      throw ErrorManager.createSignaturError(err.message);
    }
  }

  public async getInspectionsQuantity(brokerId: string) {
    try {
      const assets = (await this.userService.getInspectionsOfClients(
        brokerId,
      )) as unknown as AssetEntity[];

      const assetsInspectionLength = assets.filter(
        (el) => el.inspection,
      ).length;
      // Aplicar el filtro según el tipo

      return { quantity: assetsInspectionLength };
    } catch (err) {
      throw ErrorManager.createSignaturError(err.message);
    }
  }

  public async getAllClientsInBroker(
    userBrokerId: string,
    searchField: string,
    typeToFilter: string,
    page: number,
    limit: number,
  ) {
    try {
      const { clients } = await this.userBrokerService.getUserBrokerById(
        userBrokerId,
      );

      const regex = new RegExp(`^${searchField}`, 'i');
      const filteredClients = (clients as unknown as UserEntity[]).filter(
        (client) => {
          console.log(client);
          if (typeToFilter === 'user' && client.personalUser?.dni) {
            return client.personalUser?.dni
              .toLowerCase()
              .includes(searchField.toLowerCase());
          } else if (typeToFilter === 'legalUser' && client.legalUser?.cuit) {
            return client.legalUser.cuit
              .toLowerCase()
              .includes(searchField.toLowerCase());
          }

          return false;
        },
      );

      const pageSize = limit;
      const start = (page - 1) * pageSize;
      const end = start + pageSize;

      const paginatedClients = filteredClients.slice(start, end);

      return paginatedClients;
    } catch (err) {
      throw ErrorManager.createSignaturError(err.message);
    }
  }

  public async getAllClientsInBrokerr(userBrokerId: string) {
    try {
      const clients = (
        await this.userBrokerService.getUserBrokerById(userBrokerId)
      ).clients;

      // const inspections = assets.filter((asset) => asset.inspection);

      return clients;
    } catch (err) {
      throw ErrorManager.createSignaturError(err.message);
    }
  }

  public async findAssetsByBrokerClient(brokerId: string, clientId: string) {
    // const assets = await this.assetRepository
    //   .createQueryBuilder('assets')
    //   .leftJoinAndSelect('assets.vehicle', 'vehicle')
    //   .leftJoinAndSelect('assets.electronic', 'electronic')
    //   .leftJoinAndSelect('assets.sinisters', 'sinisters')
    //   .where({ user: brokerId })
    //   .andWhere({ client: clientId })
    //   .getMany();
    const assets = await this.assetRepository
      .createQueryBuilder('assets')
      .leftJoin('assets.vehicle', 'vehicle')
      .addSelect('vehicle.brand')
      .addSelect('vehicle.model')
      .addSelect('vehicle.plate')
      .addSelect('vehicle.type')
      .leftJoin('assets.electronic', 'electronic')
      .addSelect('electronic.brand')
      .addSelect('electronic.model')
      .addSelect('electronic.type')
      .leftJoin('assets.sinisters', 'sinisters')
      .addSelect('sinisters.id')
      // .leftJoin('sinisters.asset', 'asset')
      // .leftJoin('asset.vehicle', 'assetVehicle')
      // .addSelect('assetVehicle.brand')
      // .addSelect('assetVehicle.model')
      // .addSelect('assetVehicle.plate')
      // .addSelect('assetVehicle.type')
      // .leftJoin('asset.electronic', 'assetElectronic')
      // .addSelect('assetElectronic.brand')
      // .addSelect('assetElectronic.model')
      // .addSelect('assetElectronic.type')
      .where({ user: brokerId })
      .andWhere({ client: clientId })
      .getMany();

    return assets;
  }

  public async findAssetsByBroker(brokerId: string) {
    const assets = await this.assetRepository
      .createQueryBuilder('assets')
      .leftJoin('assets.vehicle', 'vehicle')
      .addSelect('vehicle.brand')
      .addSelect('vehicle.model')
      .addSelect('vehicle.plate')
      .addSelect('vehicle.type')
      .leftJoin('assets.electronic', 'electronic')
      .addSelect('electronic.brand')
      .addSelect('electronic.model')
      .addSelect('electronic.type')
      .leftJoin('assets.sinisters', 'sinisters')
      .addSelect('sinisters.id')
      .where({ user: brokerId })
      .getMany();

    return assets;
  }

  // Elements in client

  private async getAssetByIdForElements(assetId: string) {
    const asset = await this.assetRepository
      .createQueryBuilder('assets')
      .leftJoin('assets.vehicle', 'vehicle')
      .addSelect('vehicle.brand')
      .addSelect('vehicle.model')
      .addSelect('vehicle.plate')
      .addSelect('vehicle.type')
      .leftJoin('assets.electronic', 'electronic')
      .addSelect('electronic.brand')
      .addSelect('electronic.model')
      .addSelect('electronic.type')
      .where({ user: assetId })
      .getMany();
  }

  public async getAllElementsFromClient(clientId: string) {
    try {
      const clientAssets = (await this.userService.getUserById(clientId))
        .brokerAssets as unknown as AssetEntity[];

      const promiseElement = clientAssets.map(async (el) => {
        const vehicle = await (await this.getAssetById(el.id)).vehicle;
        const electronic = await (await this.getAssetById(el.id)).electronic;
        return [vehicle, electronic];
      });

      const elements = (await Promise.all(promiseElement))
        .flat()
        .flatMap((el) => (el === null ? [] : el));

      return elements;
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }

  public async allRead(userId: string) {
    const user = await this.userService.getUserById(userId);

    const notifications =
      user.receivedNotifications as unknown as NotificationEntity[];

    const promiseNotificationsRead = notifications.map(async (el) => {
      el.isRead = true;
      const notification = await this.notificationService.updateNotification(
        el.id,
        el,
      );
      return notification;
    });

    const notificationsArr = await Promise.all(promiseNotificationsRead);

    // const userr = (await this.userService.getUserById(userId))
    //   .receivedNotifications;

    return notificationsArr;
  }

  //-----------------------------
  // Admin

  private async getInspectionsOfUsers() {
    const client = await this.assetRepository
      .createQueryBuilder('assets')
      .leftJoin('assets.vehicle', 'vehicle')
      .addSelect('vehicle.id')
      .addSelect('vehicle.brand')
      .addSelect('vehicle.model')
      .addSelect('vehicle.plate')
      .addSelect('vehicle.type')
      .leftJoin('assets.electronic', 'electronic')
      .addSelect('electronic.id')
      .addSelect('electronic.brand')
      .addSelect('electronic.model')
      .addSelect('electronic.type')
      .leftJoin('electronic.smartphone', 'smartphone')
      .addSelect('smartphone.imei')
      .getMany();

    if (!client) {
      throw new ErrorManager({
        type: 'BAD_REQUEST',
        message: 'No users found',
      });
    }

    return client;
  }

  public async getAssetsForAdmin(
    searchField: string,
    typeToFilter: string,
    page: number,
    limit: number,
  ) {
    try {
      const assets: AssetEntity[] = await this.getInspectionsOfUsers();

      const assetsInspection = assets.filter((el) => el.inspection);
      // Aplicar el filtro según el tipo
      const filteredAssets = assetsInspection.filter((asset) => {
        if (typeToFilter === 'vehicle') {
          return asset.vehicle;
        } else if (typeToFilter === 'electronic') {
          return asset.electronic;
        }
        return false;
      });

      // Aplicar el filtro según el campo de búsqueda
      const regex = new RegExp(`^${searchField}`, 'i');
      const filteredAndSearchedAssets = filteredAssets.filter((asset) => {
        if (typeToFilter === 'vehicle') {
          const vehicle = asset.vehicle as unknown as VehicleEntity;
          return regex.test(vehicle?.plate as string);
        } else if (typeToFilter === 'electronic') {
          const electronic = asset.electronic as unknown as ElectronicEntity;
          return (
            regex.test(electronic?.model) ||
            regex.test(
              (electronic?.smartphone as unknown as SmartphoneEntity)?.imei,
            )
          );
        }
        return false;
      });

      // Aplicar paginación
      const pageSize = limit;
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      const paginatedInspections = filteredAndSearchedAssets.slice(start, end);

      return paginatedInspections;
    } catch (err) {
      throw ErrorManager.createSignaturError(err.message);
    }
  }
}
