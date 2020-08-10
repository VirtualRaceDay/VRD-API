export const error = (res, message) => res.status(500).send({ code: 500, data: `Internal Server Error: ${message}` });
export const notFound = (res, data) => res.status(404).send({ code: 404, data });
export const badRequest = (res, data) => res.status(400).send({ code: 400, data });

export const ok = (res, data) => res.send({ code: 200, data });
export const created = (res, data) => res.status(201).send({ code: 201, data });
export const deleted = (res, data) => res.status(200).send({ code: 200, data });
export const updated = (res, data) => res.status(200).send({ code: 200, data });
