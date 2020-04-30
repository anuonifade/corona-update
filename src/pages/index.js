import React from 'react';
import Helmet from 'react-helmet';
import L from 'leaflet';

import { useTracker } from 'hooks';
import Layout from 'components/Layout';
// import Container from 'components/Container';
import Map from 'components/Map';
import { commafy, formattedDate } from 'lib/util';

const LOCATION = {
  lat: 0,
  lng: 0
};
const CENTER = [LOCATION.lat, LOCATION.lng];
const DEFAULT_ZOOM = 4;

const IndexPage = () => {

  const { data: countries = [] } = useTracker({
    api: 'countries'
  })

  const { data: stats = {} } = useTracker({
    api: 'all'
  })

  console.log('stats ', stats);

  const hasCountries = Array.isArray(countries) && countries.length > 0;

  const dashboardStats = [
    {
      primary: {
        label: 'Total Cases',
        value: stats? commafy(stats?.cases) : '-'
      },
      secondary: {
        label: 'Per 1 Million',
        value: stats? commafy(stats?.casesPerOneMillion) : '-'
      }
    }, {
      primary: {
        label: 'Total Deaths',
        value: stats? commafy(stats?.deaths) : '-'
      },
      secondary: {
        label: 'Per 1 Million',
        value: stats? commafy(stats?.deathsPerOneMillion) : '-'
      }
    }, {
      primary: {
        label: 'Total Tests',
        value: stats? commafy(stats?.tests) : '-'
      },
      secondary: {
        label: 'Per 1 Million',
        value: stats? commafy(stats?.testsPerOneMillion) : '-'
      }
    }, {
      primary: {
        label: 'Active Cases',
        value: stats? commafy(stats?.active) : '-'
      }
    }, {
      primary: {
        label: 'Critical Cases',
        value: stats ? commafy(stats?.critical) : '-'
      }
    }, {
      primary: {
        label: 'Recovered Cases',
        value: stats ? commafy(stats?.recovered) : '-'
      }
    }
  ];

  async function mapEffect({ leafletElement: map } = {}) {

    if ( !hasCountries ) return;

    const geoJson = {
      type: 'FeatureCollection',
      features: countries.map((country = {}) => {
        const { countryInfo  = {} } = country;
        const{ lat, long: lng }  = countryInfo;

        return {
          type: 'Feature',
          properties: {
            ...country,
          },
          geometry: {
            type: 'Point',
            coordinates: [ lng, lat ]
          }
        }
      })
    }

    const geoJsonLayers = new L.GeoJSON(geoJson, {
      pointToLayer: (feature= {}, latlng) => {
        const { properties = {} } = feature;
        let updatedFormatted;
        let casesString;

        const {
          country,
          updated,
          cases,
          deaths,
          recovered
        } = properties

        casesString = `${cases}`;

        if (cases > 1000 && cases < 1000000) {
          casesString = `${casesString.slice(0, -3)}k+`
        } else if (cases > 999999) {
          casesString = `${casesString.slice(0, -6)}M+`
        }

        if (updated) {
          updatedFormatted = new Date(updated).toLocaleString();
        }

        const html = `
          <span class="icon-marker">
            <span class="icon-marker-tooltip">
              <h2>${country}</h2>
              <ul>
                <li><strong>Confirmed:</strong> ${cases}</li>
                <li><strong>Deaths:</strong> ${deaths}</li>
                <li><strong>Recovered:</strong> ${recovered}</li>
                <li><strong>Last Update:</strong> ${updatedFormatted}</li>
              </ul>
            </span>
            <span class="icon-text">${ casesString }</span>
          </span>
        `

        return L.marker(latlng, {
          icon: L.divIcon({
            className: 'icon',
            html
          }),
          riseOnHover: true
        });
      }
    });

    geoJsonLayers.addTo(map);
  }

  const mapSettings = {
    center: CENTER,
    defaultBaseMap: 'OpenStreetMap',
    zoom: DEFAULT_ZOOM,
    mapEffect
  };

  return (
    <Layout pageName="home">
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div className="tracker">
        <Map {...mapSettings} />
        <div className="tracker-stats">
          <ul>
            { dashboardStats.map(({ primary = {}, secondary = {} }, i) => {
              return(
                <li key={ `Stat-${i}`} className="tracker-stat">
                  { primary.value && (
                      <p className="tracker-stat-primary">
                        { primary.value }
                        <strong>{ primary.label }</strong>
                      </p>
                  )}
                  { secondary.value && (
                    <p className="tracker-stat-secondary">
                      { secondary.value }
                      <strong>{ secondary.label }</strong>
                    </p>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="tracker-last-updated">
          <p>
            Last Updated: { stats ? formattedDate(stats?.updated) : '-'} 
          </p> 
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;
