import { handleError } from "../utils";
import { Stations, StationImages, Reservations } from "../models";
import { Op, fn, col } from "sequelize/dist";

async function list(req, res) {
	try {
		const { userId } = req.params;

		let options = {
			include: [
				{
					model: Reservations,
					as: "reservations",
					required: true,
					attributes: ["day", "hourStart", "hourEnd"],
					where: {
						userId: userId,
					},
				},
				{
					model: StationImages,
					as: "images",
					attributes: ["link"],
				},
			],
			order: [["updatedAt", "DESC"]],
		};

		return res.send(await Stations.findAll(options));
	} catch (error) {
		handleError(res, error);
	}
}

async function add(req, res) {
	try {
		const { userId } = req.params;
		const { stationId, day } = req.body;
		const _reservation = await Reservations.findOne({
			where: { stationId: stationId, day: day, userId: userId },
		});
		if (_reservation) {
			return res.status(202).json({
				message:
					"Usuário já realizou reserva para este dia nesta estação.",
				reservation: _reservation,
			});
		}

		if (!(await Stations.findByPk(stationId))) {
			return res.status(404).json({
				message: "Estação não encontrada.",
			});
		}

		const { hourStart, hourEnd } = req.body;
		const _hourStart = parseInt(hourStart.split(":")[0]);
		const _hourEnd = parseInt(hourEnd.split(":")[0]);

		if (_hourStart >= _hourEnd) {
			return res.status(400).json({
				message: "Hora de início deve ser menor que a hora de término.",
			});
		}

		const reservation = await Reservations.create({
			...req.body,
			userId: userId,
		});

		return res.status(201).json({
			message: "Reserva feita com sucesso.",
			reservation: reservation,
		});
	} catch (error) {
		handleError(res, error);
	}
}

export default {
	list,
	add,
};
