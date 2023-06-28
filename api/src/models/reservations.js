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
			},
			hourEnd: {
				type: DataTypes.TIME,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: "Reservations",
		}
	);
	return Reservations;
};
