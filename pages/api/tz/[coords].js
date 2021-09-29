
const geoTz = require('geo-tz')

export default function handler(req, res) {
  const coords = req.query.coords
  const x = coords.split(',')
  res.status(200).json({ 'tz': geoTz(x[0], x[1])})
}
