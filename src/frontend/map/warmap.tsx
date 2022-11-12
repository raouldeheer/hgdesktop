// eslint-disable-next-line
// @ts-ignore
import image from "../imgs/background.png";
import MapInteractionCSS from "./MapInteraction";
import React from "react";
import { WarmapEventHandler } from "../warmapEventHandler";
import MapSector from "./mapSector";
import sectorsToDraw from "../data/sectors.json";

const totalWidth = 16384;
const totalHeight = 11520;

const numberOfChunks = 16;
const baseWidth = totalWidth / numberOfChunks;
const baseHeight = totalHeight / numberOfChunks;

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
    width: `${totalWidth}px`,
    height: `${totalHeight}px`
};

const Warmap = ({
    warmapEventHandler
}: {
    warmapEventHandler: WarmapEventHandler;
}): JSX.Element => {
    const sectors = [];
    for (let x = 0; x < numberOfChunks; x++) {
        for (let y = 0; y < numberOfChunks; y++) {
            const sectorInList = sectorsToDraw.findIndex(
                v => v.index === y * numberOfChunks + x,
            );
            if (sectorInList !== -1) {
                const sectorData = sectorsToDraw[sectorInList];
                sectors.push(<MapSector
                    bfsSectors={sectorData.bfsSector}
                    supsSectors={sectorData.supsSector}
                    posx={baseWidth}
                    posy={baseHeight}
                    offsetx={baseWidth * x}
                    offsety={baseHeight * y}
                    index={sectorData.index}
                    warmapEventHandler={warmapEventHandler}
                    key={sectorData.index}
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
