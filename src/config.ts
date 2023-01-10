export default {
  sqlitePath: './database.db',
  verbose: true,
  agencies: [
    {
      url: 'https://mkuran.pl/gtfs/warsaw.zip',
      exclude: [
        'attributions',
        'fare_attributes',
        'fare_rules',
        'feed_info',
        'frequencies',
        'shapes',
      ],
      realtimeUrls: [
        'https://mkuran.pl/gtfs/warsaw/vehicles.pb',
      ],
    },
  ],
};
