'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Reservations", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			userId: {
				allowNull: false,
				type: Sequelize.INTEGER
			},
			stationId: {
				allowNull: false,
				type: Sequelize.INTEGER
			},
			day: {
				type: Sequelize.DATEONLY,
				allowNull: false
			},
			hourStart: {
				type: Sequelize.TIME,
				allowNull: false
			},
			hourEnd: {
				type: Sequelize.TIME,
				allowNull: false
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
			}
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Reservations");
	}
};