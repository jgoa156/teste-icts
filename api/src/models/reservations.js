"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class Reservations extends Model {
		static associate(models) {
			this.belongsTo(models.Stations, {
				foreignKey: "stationId",
				as: "station",
			});
		}
	}
	Reservations.init(
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			userId: {
				type: DataTypes.DOUBLE,
				allowNull: false,
			},
			stationId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			day: {
				type: DataTypes.DATEONLY,
				allowNull: false,
			},
			hourStart: {
				type: DataTypes.TIME,
				allowNull: false,
				validate: {
					isValid(value) {
						if (!value.includes(":") || value.split(":")[1] != "00") {
							throw new Error("Valor da hora de início inválido");
						}
					},
				},
			},
			hourEnd: {
				type: DataTypes.TIME,
				allowNull: false,
				validate: {
					isValid(value) {
						if (!value.includes(":") || value.split(":")[1] != "00") {
							throw new Error("Valor da hora de término inválido");
						}
					},
				},
			},
		},
		{
			sequelize,
			modelName: "Reservations",
		}
	);
	return Reservations;
};
