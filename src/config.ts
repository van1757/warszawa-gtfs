export default {
  sqlitePath: './database.db',
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
