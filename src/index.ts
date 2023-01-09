import config from './config.js'
import { GTFSService } from './gtfsService.js'

await (async () => {
  const gtfsService = new GTFSService(config)

  await gtfsService.syncDb()
  await gtfsService.openDb()

  const vehiclePosition = await gtfsService.getVehiclePosition({
    date: 20230109,
    stop_id: '501001',
    route_id: '78',
    trip_headsign: 'Żerań FSO'
  })

  console.log(vehiclePosition)
})()
