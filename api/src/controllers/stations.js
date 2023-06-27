import { handleError } from "../utils";
import { Stations, StationImages } from "../models";
import { Op, fn, col } from "sequelize/dist";

async function list(req, res) {
	try {
		let options = {
			order: [["updatedAt", "DESC"]],
			include: [
				{
					model: StationImages,
					as: "images",
					attributes: ["link"]
				}
			],
		};

		const { id } = req.params;
		if (id) {
			const station = await Stations.findByPk(id, options);

			if (station) {
				return res.send(station);
			}

			return res.status(404).json({ message: "Estação não encontrada" });
		} else {
			const { limit, offset, search } = req.query;

			if (limit && parseInt(limit) !== NaN) {
				if (offset && parseInt(offset) !== NaN) {
					options = {
						...options,
						limit: [parseInt(offset), parseInt(limit)],
					};
				}
				options = { ...options, limit: parseInt(limit) };
			}
			if (offset && parseInt(offset) !== NaN) {
				options = { ...options, offset: parseInt(offset) };
			}

			// Search
			if (search && search.length != 0) {
				options = {
					...options,
					where: {
						...options.where,
						name: { [Op.like]: `%${search}%` }
					}
				};
			}

			return res.send(await Stations.findAll(options));
		}
	} catch (error) {
		handleError(res, error);
	}
}

async function add(req, res) {
	try {
		const { name, images } = req.body;
		const _station = await Stations.findOne({ where: { name: name } });
		if (_station) {
			return res.status(202).json({
				message: "Estação já registrada.",
				station: _station,
			});
		}

		const station = await Stations.create({ ...req.body });

		images.forEach(async (link) => {
			await StationImages.create({
				link: link,
				stationId: station.id
			});
		});

		return res.status(201).json({
			message: "Estação adicionada com sucesso.",
			station: station,
		});
	} catch (error) {
		handleError(res, error);
	}
}

async function batchAdd(req, res) {
	try {
		const { stations } = req.body;

		let count = 0;
		async function _add(station) {
			let { name, images } = station;

			if (!await Stations.findOne({ where: { name: name } })) {
				const _station = await Stations.create({ ...station });

				images.forEach(async (link) => {
					await StationImages.create({
						link: link,
						stationId: _station.id
					});
				});

				count++;
			}
		}

		for await (let station of stations) {
			await _add(station);
		}

		return res.status(201).json({
			message: `${count} de ${stations.length} estações adicionadas com sucesso`,
		});
	} catch (error) {
		handleError(res, error);
	}
}

export default {
	list,
	add,
	batchAdd
};
