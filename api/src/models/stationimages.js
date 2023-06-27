"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class StationImages extends Model {
		static associate(models) {
			this.belongsTo(models.Stations, {
				foreignKey: "stationId",
				as: "station",
			});
		}
	}

	StationImages.init(
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			link: {
				type: DataTypes.TEXT("medium"),
				allowNull: false,
			},
			stationId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: "StationImages",
		}
	);
	return StationImages;
};
