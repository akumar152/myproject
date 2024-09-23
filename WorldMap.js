import React, { useState } from "react";
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "react-simple-maps";
import { Tooltip } from 'react-tooltip';
import countries from '../countries-110m.json';
import 'react-tooltip/dist/react-tooltip.css';

const MapNew = ({ options }) => {
    const [content, setContent] = useState("");

    const markers = [
        { markerOffset: -15, name: "Malaysia", coordinates: [101.9758, 4.2105] },
        { markerOffset: -15, name: "Philippines", coordinates: [122.5597, 13.4125] },
        { markerOffset: -15, name: "Indonesia", coordinates: [113.9213, -0.7893] },
        { markerOffset: -15, name: "Hong Kong", coordinates: [114.1095, 22.3964] },
        { markerOffset: -15, name: "Singapore", coordinates: [103.8198, 1.3521] },
        { markerOffset: -15, name: "Thailand", coordinates: [100.9925, 15.8700] }
    ];

    return (
        <div style={{
            display: 'grid',
            width: '100%',
            height: '65vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            {/* Tooltip to show country info */}
            <Tooltip id="my-tooltip" content={content} />
            <div style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <ComposableMap style={{ width: '100%', height: '100%' }}>
                    <ZoomableGroup zoom={2.7} center={[390, 20]} disablePanning>
                        <Geographies geography={countries}>
                            {({ geographies }) =>
                                geographies.map((geo) => (
                                    <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        data-tooltip-id="my-tooltip"
                                        data-tip={geo.properties.name}
                                        onMouseEnter={() => setContent(`${geo.properties.name}`)}
                                        onMouseLeave={() => setContent("")}
                                        style={{
                                            default: {
                                                fill: "#D6D6DA",
                                                outline: "none"
                                            },
                                            hover: {
                                                fill: "#F53",
                                                outline: "none"
                                            },
                                            pressed: {
                                                fill: "#E42",
                                                outline: "none"
                                            }
                                        }}
                                    />
                                ))
                            }
                        </Geographies>
                        {markers.map(({ name, coordinates, markerOffset }) => (
                            <Marker key={name} coordinates={coordinates}>
                                <circle
                                    r={4}
                                    fill={options.marketColors[options.countryData[name]]}
                                    stroke="#000"
                                    strokeWidth={1}
                                    onMouseEnter={() => setContent(`${name}: ${options.countryData[name]}`)} // Update tooltip content
                                    onMouseLeave={() => setContent("")} // Clear tooltip on mouse leave
                                />
                                <text
                                    textAnchor="middle"
                                    y={markerOffset}
                                    style={{
                                        fontFamily: "system-ui",
                                        fill: "black",
                                        fontSize: '7px',
                                    }}
                                >
                                    {name}
                                </text>
                            </Marker>
                        ))}
                    </ZoomableGroup>
                </ComposableMap>
            </div>
        </div>
    );
};

export default MapNew;
