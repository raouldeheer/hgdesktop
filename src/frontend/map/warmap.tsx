// eslint-disable-next-line
// @ts-ignore
import image from "../imgs/background.png";
import MapInteractionCSS from "./MapInteraction";
import React from "react";
import battlefield from "hagcp-assets/json/battlefield.json";
import supplyline from "hagcp-assets/json/supplyline.json";
import { WarmapEventHandler } from "../warmapEventHandler";
import MapSector from "./mapSector";

const baseWidth = 2048;
const baseHeight = 1440;
const width = baseWidth * 8;
const height = baseHeight * 8;

const posStyling: React.CSSProperties = {
    position: "absolute",
    top: "0",
    left: "0",
};

const componentStyling: React.CSSProperties = {
    ...posStyling,
    width: "100%",
    height: "100%",
    zIndex: "-1",
};

const mapStyles: React.CSSProperties = {
    ...posStyling,
    width: `${width}px`,
    height: `${height}px`
};

export const posToSector = (x: number, y: number) =>
    (Math.floor(y / baseHeight) * 8) + Math.floor(x / baseWidth);


const bfsSectors: any[][] = [];
const supsSectors: any[][] = [];

function addToSector(sectors: any[][], index: number, element: any) {
    if (index > 64) return;
    if (!sectors[index]) sectors[index] = [];
    sectors[index].push(element);
}

battlefield.forEach((element: any) => {
    const index = posToSector(element.posx, element.posy);
    addToSector(bfsSectors, index, element);
    const edgeY = element.posy % baseHeight;
    if (edgeY < 50) addToSector(bfsSectors, index - 8, element);
    else if (edgeY > (baseHeight - 50)) addToSector(bfsSectors, index + 8, element);
    const edgeX = element.posx % baseWidth;
    if (edgeX < 50) addToSector(bfsSectors, index - 1, element);
    else if (edgeX > (baseWidth - 50)) addToSector(bfsSectors, index + 1, element);
});

supplyline.forEach((element: any) => {
    const index = posToSector(element.posx1, element.posy1);
    addToSector(supsSectors, index, element);
    const index2 = posToSector(element.posx2, element.posy2);
    if (index !== index2) {
        addToSector(supsSectors, index2, element);
        const index3 = posToSector(element.posx1, element.posy2);
        if (index3 !== index && index3 !== index2) addToSector(supsSectors, index3, element);
        const index4 = posToSector(element.posx2, element.posy1);
        if (index4 !== index && index4 !== index2 && index4 !== index3) addToSector(supsSectors, index4, element);
    }
});

const Warmap = ({
    warmapEventHandler
}: {
    warmapEventHandler: WarmapEventHandler;
}): JSX.Element => {
    const sectors = [];
    for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {
            const index = (y * 8) + x;
            if (bfsSectors[index] || supsSectors[index]) {
                sectors.push(<MapSector
                    bfsSectors={bfsSectors}
                    supsSectors={supsSectors}
                    posx={baseWidth}
                    posy={baseHeight}
                    offsetx={baseWidth * x}
                    offsety={baseHeight * y}
                    index={index}
                    warmapEventHandler={warmapEventHandler}
                    key={index}
                />);
            }
        }
    }

    return <div style={componentStyling}>
        <MapInteractionCSS minScale={0.10}
            defaultValue={{
                scale: 0.10,
                translation: { x: 0, y: 0, },
            }}>
            <img src={image} style={mapStyles} />
            {sectors}
        </MapInteractionCSS>
    </div>;
};

export default Warmap;
