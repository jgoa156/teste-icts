"use strict";
const { Model } = require("sequelize");
const { isLatitude, isLongitude } = require("../utils");

module.exports = (sequelize, DataTypes) => {
	class Stations extends Model {
		static associate(models) {
			this.hasMany(models.StationImages, {
				foreignKey: "stationId",
				as: "images",
			});
		}
	}
	Stations.init(
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [1, 255],
				},
			},
			address: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [4, 255],
				},
			},
			lat: {
				type: DataTypes.DOUBLE,
				allowNull: false,
				validate: {
					len: [4, 255],
					isValid(value) {
						if (!isLatitude(value)) {
							throw new Error("Valor da latitude inválido");
						}
					},
				},
			},
			lng: {
				type: DataTypes.DOUBLE,
				allowNull: false,
				validate: {
					len: [4, 255],
					isValid(value) {
						if (!isLongitude(value)) {
							throw new Error("Valor da longitude inválido");
						}
					},
				},
			},
		},
		{
			sequelize,
			modelName: "Stations",
		}
	);
	return Stations;
};
