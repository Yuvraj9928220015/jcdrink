import { useState } from 'react';
import './Map.css';

const locations = [
    {
        id: 'north-america',
        name: 'North America',
        position: { top: '35%', left: '20%' },
        zoom: { x: 80, y: 50, scale: 3 },
    },
    {
        id: 'brazil',
        name: 'Brazil',
        position: { top: '60%', left: '33%' },
        zoom: { x: 50, y: -20, scale: 4 },
    },
    {
        id: 'india',
        name: 'India',
        position: { top: '45%', left: '68%' },
        zoom: { x: -55, y: 30, scale: 4 },
    },
    {
        id: 'australia',
        name: 'Australia',
        position: { top: '20%', left: '83%' },
        zoom: { x: -90, y: -50, scale: 3.5 },
    },
    {
        id: 'north-america',
        name: 'North America',
        position: { top: '55%', left: '22%' },
        zoom: { x: 80, y: 50, scale: 3 },
    },
    {
        id: 'brazil',
        name: 'Brazil',
        position: { top: '69%', left: '73%' },
        zoom: { x: 50, y: -20, scale: 4 },
    },
    {
        id: 'india',
        name: 'India',
        position: { top: '42%', left: '18%' },
        zoom: { x: -55, y: 30, scale: 4 },
    },
    {
        id: 'australia',
        name: 'Australia',
        position: { top: '80%', left: '90%' },
        zoom: { x: -90, y: -50, scale: 3.5 },
    },
    {
        id: 'north-america',
        name: 'North America',
        position: { top: '93%', left: '36%' },
        zoom: { x: 80, y: 50, scale: 3 },
    },
    {
        id: 'brazil',
        name: 'Brazil',
        position: { top: '14%', left: '23%' },
        zoom: { x: 50, y: -20, scale: 4 },
    },
    {
        id: 'india',
        name: 'India',
        position: { top: '41%', left: '76%' },
        zoom: { x: -55, y: 30, scale: 4 },
    },
    {
        id: 'australia',
        name: 'Australia',
        position: { top: '76%', left: '56%' },
        zoom: { x: -90, y: -50, scale: 3.5 },
    },
    // 

    {
        id: 'north-america',
        name: 'North America',
        position: { top: '12%', left: '26%' },
        zoom: { x: 80, y: 50, scale: 3 },
    },
    {
        id: 'brazil',
        name: 'Brazil',
        position: { top: ' 80%', left: '93%' },
        zoom: { x: 50, y: -20, scale: 4 },
    },
    {
        id: 'india',
        name: 'India',
        position: { top: '41%', left: '28%' },
        zoom: { x: -55, y: 30, scale: 4 },
    },
    {
        id: 'australia',
        name: 'Australia',
        position: { top: '6%', left: '53%' },
        zoom: { x: -90, y: -50, scale: 3.5 },
    },
    {
        id: 'north-america',
        name: 'North America',
        position: { top: '45%', left: '9%' },
        zoom: { x: 80, y: 50, scale: 3 },
    },
    {
        id: 'brazil',
        name: 'Brazil',
        position: { top: '9%', left: '3%' },
        zoom: { x: 50, y: -20, scale: 4 },
    },
    {
        id: 'india',
        name: 'India',
        position: { top: '48%', left: '30%' },
        zoom: { x: -55, y: 30, scale: 4 },
    },
    {
        id: 'australia',
        name: 'Australia',
        position: { top: '60%', left: '20%' },
        zoom: { x: -90, y: -50, scale: 3.5 },
    },
    {
        id: 'north-america',
        name: 'North America',
        position: { top: '13%', left: '87%' },
        zoom: { x: 80, y: 50, scale: 3 },
    },
    {
        id: 'brazil',
        name: 'Brazil',
        position: { top: '44%', left: '12%' },
        zoom: { x: 50, y: -20, scale: 4 },
    },
    {
        id: 'india',
        name: 'India',
        position: { top: '21%', left: '49%' },
        zoom: { x: -55, y: 30, scale: 4 },
    },
    {
        id: 'australia',
        name: 'Australia',
        position: { top: '80%', left: '59%' },
        zoom: { x: -90, y: -50, scale: 3.5 },
    },

    // 

    {
        id: 'north-america',
        name: 'North America',
        position: { top: '46%', left: '20%' },
        zoom: { x: 80, y: 50, scale: 3 },
    },
    {
        id: 'brazil',
        name: 'Brazil',
        position: { top: '60%', left: '33%' },
        zoom: { x: 50, y: -20, scale: 4 },
    },
    {
        id: 'india',
        name: 'India',
        position: { top: '35%', left: '58%' },
        zoom: { x: -55, y: 30, scale: 4 },
    },
    {
        id: 'australia',
        name: 'Australia',
        position: { top: '40%', left: '40%' },
        zoom: { x: -90, y: -50, scale: 3.5 },
    },
    {
        id: 'north-america',
        name: 'North America',
        position: { top: '55%', left: '34%' },
        zoom: { x: 80, y: 50, scale: 3 },
    },
    {
        id: 'brazil',
        name: 'Brazil',
        position: { top: '69%', left: '30%' },
        zoom: { x: 50, y: -20, scale: 4 },
    },
    {
        id: 'india',
        name: 'India',
        position: { top: '47%', left: '48%' },
        zoom: { x: -55, y: 30, scale: 4 },
    },
    {
        id: 'australia',
        name: 'Australia',
        position: { top: '90%', left: '49%' },
        zoom: { x: -90, y: -50, scale: 3.5 },
    },
    {
        id: 'north-america',
        name: 'North America',
        position: { top: '53%', left: '26%' },
        zoom: { x: 80, y: 50, scale: 3 },
    },
    {
        id: 'brazil',
        name: 'Brazil',
        position: { top: '34%', left: '22%' },
        zoom: { x: 50, y: -20, scale: 4 },
    },
    {
        id: 'india',
        name: 'India',
        position: { top: '3%', left: '89%' },
        zoom: { x: -55, y: 30, scale: 4 },
    },
    {
        id: 'australia',
        name: 'Australia',
        position: { top: '76%', left: '51%' },
        zoom: { x: -90, y: -50, scale: 3.5 },
    },

    // 

    {
        id: 'north-america',
        name: 'North America',
        position: { top: '40%', left: '24%' },
        zoom: { x: 80, y: 50, scale: 3 },
    },
    {
        id: 'brazil',
        name: 'Brazil',
        position: { top: '60%', left: '76%' },
        zoom: { x: 50, y: -20, scale: 4 },
    },
    {
        id: 'india',
        name: 'India',
        position: { top: '43%', left: '89%' },
        zoom: { x: -55, y: 30, scale: 4 },
    },
    {
        id: 'australia',
        name: 'Australia',
        position: { top: '28%', left: '53%' },
        zoom: { x: -90, y: -50, scale: 3.5 },
    },
    {
        id: 'north-america',
        name: 'North America',
        position: { top: '65%', left: '72%' },
        zoom: { x: 80, y: 50, scale: 3 },
    },
    {
        id: 'brazil',
        name: 'Brazil',
        position: { top: '60%', left: '63%' },
        zoom: { x: 50, y: -20, scale: 4 },
    },
    {
        id: 'india',
        name: 'India',
        position: { top: '42%', left: '48%' },
        zoom: { x: -55, y: 30, scale: 4 },
    },
    {
        id: 'australia',
        name: 'Australia',
        position: { top: '50%', left: '90%' },
        zoom: { x: -90, y: -50, scale: 3.5 },
    },
    {
        id: 'north-america',
        name: 'North America',
        position: { top: '93%', left: '87%' },
        zoom: { x: 80, y: 50, scale: 3 },
    },
    {
        id: 'brazil',
        name: 'Brazil',
        position: { top: '50%', left: '50%' },
        zoom: { x: 50, y: -20, scale: 4 },
    },
    {
        id: 'india',
        name: 'India',
        position: { top: '47%', left: '76%' },
        zoom: { x: -55, y: 30, scale: 4 },
    },
    {
        id: 'australia',
        name: 'Australia',
        position: { top: '80%', left: '35%' },
        zoom: { x: -90, y: -50, scale: 3.5 },
    },

    // 

    {
        id: 'north-america',
        name: 'North America',
        position: { top: '40%', left: '60%' },
        zoom: { x: 80, y: 50, scale: 3 },
    },
    {
        id: 'brazil',
        name: 'Brazil',
        position: { top: '49%', left: '65%' },
        zoom: { x: 50, y: -20, scale: 4 },
    },
    {
        id: 'india',
        name: 'India',
        position: { top: '43%', left: '68%' },
        zoom: { x: -55, y: 30, scale: 4 },
    },
    {
        id: 'australia',
        name: 'Australia',
        position: { top: '32%', left: '70%' },
        zoom: { x: -90, y: -50, scale: 3.5 },
    },
    {
        id: 'north-america',
        name: 'North America',
        position: { top: '35%', left: '94%' },
        zoom: { x: 80, y: 50, scale: 3 },
    },
    {
        id: 'brazil',
        name: 'Brazil',
        position: { top: '59%', left: '100%' },
        zoom: { x: 50, y: -20, scale: 4 },
    },
    {
        id: 'india',
        name: 'India',
        position: { top: '49%', left: '68%' },
        zoom: { x: -55, y: 30, scale: 4 },
    },
    {
        id: 'australia',
        name: 'Australia',
        position: { top: '50%', left: '40%' },
        zoom: { x: -90, y: -50, scale: 3.5 },
    },
    {
        id: 'north-america',
        name: 'North America',
        position: { top: '60%', left: '56%' },
        zoom: { x: 80, y: 50, scale: 3 },
    },
    {
        id: 'brazil',
        name: 'Brazil',
        position: { top: '43%', left: '33%' },
        zoom: { x: 50, y: -20, scale: 4 },
    },
    {
        id: 'india',
        name: 'India',
        position: { top: '39%', left: '46%' },
        zoom: { x: -55, y: 30, scale: 4 },
    },
    {
        id: 'australia',
        name: 'Australia',
        position: { top: '60%', left: '35%' },
        zoom: { x: -90, y: -50, scale: 3.5 },
    },

    // 

    {
        id: 'north-america',
        name: 'North America',
        position: { top: '39%', left: '60%' },
        zoom: { x: 80, y: 50, scale: 3 },
    },
    {
        id: 'brazil',
        name: 'Brazil',
        position: { top: '48%', left: '84%' },
        zoom: { x: 50, y: -20, scale: 4 },
    },
    {
        id: 'india',
        name: 'India',
        position: { top: '45%', left: '68%' },
        zoom: { x: -55, y: 30, scale: 4 },
    },
    {
        id: 'australia',
        name: 'Australia',
        position: { top: '42%', left: '60%' },
        zoom: { x: -90, y: -50, scale: 3.5 },
    },
    {
        id: 'north-america',
        name: 'North America',
        position: { top: '50%', left: '30%' },
        zoom: { x: 80, y: 50, scale: 3 },
    },
    {
        id: 'brazil',
        name: 'Brazil',
        position: { top: '43%', left: '60%' },
        zoom: { x: 50, y: -20, scale: 4 },
    },
    {
        id: 'india',
        name: 'India',
        position: { top: '94%', left: '70%' },
        zoom: { x: -55, y: 30, scale: 4 },
    },
    {
        id: 'australia',
        name: 'Australia',
        position: { top: '70%', left: '97%' },
        zoom: { x: -90, y: -50, scale: 3.5 },
    },
    {
        id: 'north-america',
        name: 'North America',
        position: { top: '63%', left: '46%' },
        zoom: { x: 80, y: 50, scale: 3 },
    },
    {
        id: 'brazil',
        name: 'Brazil',
        position: { top: '44%', left: '53%' },
        zoom: { x: 50, y: -20, scale: 4 },
    },
    {
        id: 'india',
        name: 'India',
        position: { top: '45%', left: '26%' },
        zoom: { x: -55, y: 30, scale: 4 },
    },
    {
        id: 'australia',
        name: 'Australia',
        position: { top: '71%', left: '16%' },
        zoom: { x: -90, y: -50, scale: 3.5 },
    },
];

export default function Map() {
    const [activeLocationIndex, setActiveLocationIndex] = useState(null);

    const handleLocationClick = (index) => {
        setActiveLocationIndex(index);
    };

    const handleResetClick = () => {
        setActiveLocationIndex(null);
    };

    const activeLocation = activeLocationIndex !== null ? locations[activeLocationIndex] : null;

    const mapStyle = {
        transform: activeLocation
            ? `scale(${activeLocation.zoom.scale}) translate(${activeLocation.zoom.x}%, ${activeLocation.zoom.y}%)`
            : 'scale(1) translate(0, 0)',
    };

    return (
        <>
            <div className="Map">
                <div className="container">
                    <div className="Map-header">
                        <div className="Map-title">Our Clients Across The Globe</div>
                        <div className="Map-des">Click on a location to zoom in.</div>
                        {activeLocation && (
                            <button onClick={handleResetClick} className="reset-button">
                                Reset View
                            </button>
                        )}
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="Map-container">
                                <div className="Map-Image" style={mapStyle}>
                                    {locations.map((loc, index) => (
                                        <div
                                            key={index}
                                            className={`location-icon ${activeLocationIndex === index ? 'active' : ''}`}
                                            style={{ top: loc.position.top, left: loc.position.left }}
                                            onClick={() => handleLocationClick(index)}
                                        >
                                            <i className="fa fa-map-marker" aria-hidden="true"></i>
                                            <div className="tooltip">{loc.name}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}