import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize';

export interface ITrademark {
  serialNumber: string;
  filingDate: string;
  status: number;
  markElement: string;
  descOfMark: string;
  trademark: boolean;
  serviceMark: boolean;
  certificationMark: boolean;
  collectiveMembershipMark: boolean;
  ownerName: string;
  ownerAddress: string;
  ownerCity: string;
  ownerState: string;
  ownerZip: string;
  ownerCountry: string;
  gsDescription: string;
  gsClassCode: string;
}

class Trademark extends Model<ITrademark> implements ITrademark {
  public serialNumber!: string;
  public filingDate!: string;
  public status!: number;
  public markElement!: string;
  public descOfMark!: string;
  public trademark!: boolean;
  public serviceMark!: boolean;
  public certificationMark!: boolean;
  public collectiveMembershipMark!: boolean;
  public ownerName!: string;
  public ownerAddress!: string;
  public ownerCity!: string;
  public ownerState!: string;
  public ownerZip!: string;
  public ownerCountry!: string;
  public gsDescription!: string;
  public gsClassCode!: string;
}

Trademark.init({
  serialNumber: {
    type: DataTypes.STRING(8),
    allowNull: false,
    primaryKey: true,
  },
  filingDate: {
    type: DataTypes.STRING(10),
    allowNull: true,
  },
  status: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  markElement: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  descOfMark: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  trademark: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  serviceMark: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  certificationMark: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  collectiveMembershipMark: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  ownerName: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  ownerAddress: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  ownerCity: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  ownerState: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  ownerZip: {
    type: DataTypes.STRING(10),
    allowNull: true,
  },
  ownerCountry: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  gsDescription: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  gsClassCode: {
    type: DataTypes.STRING(10),
    allowNull: true,
  }
}, {
  sequelize,
  tableName: 'trademarks',
  timestamps: false,
});

export default Trademark;