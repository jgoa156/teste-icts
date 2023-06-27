"use strict";
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("StationImages", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			link: {
				type: Sequelize.TEXT("medium"),
				allowNull: false,
			},
			stationId: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.fn("NOW"),
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.fn("NOW"),
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("StationImages");
	},
};
