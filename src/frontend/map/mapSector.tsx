import BattlefieldPoint from "./battlefieldPoint";
import { Stage, Layer } from "react-konva";
import Supplyline from "./supplyline";
import { WarmapEventHandler } from "../warmapEventHandler";

const MapSector = ({
    posx,
    posy,
    offsetx,
    offsety,
    index,
    supsSectors,
    bfsSectors,
    warmapEventHandler,
}: {
    posx: number;
    posy: number;
    offsetx: number;
    offsety: number;
    index: number;
    supsSectors: string[];
    bfsSectors: string[];
    warmapEventHandler: WarmapEventHandler;
}): JSX.Element => {
    return <Stage style={{
        position: "absolute",
        top: `${offsety}px`,
        left: `${offsetx}px`,
        width: `${posx}px`,
        height: `${posy}px`
    }} key={`sector${index}`} width={posx} height={posy} offsetX={offsetx} offsetY={offsety}>
        <Layer>
            {supsSectors.map(element => <Supplyline
                key={element}
                id={element}
                warmapEventHandler={warmapEventHandler}
            />)}
            {bfsSectors.map(element => <BattlefieldPoint
                key={element}
                id={element}
                warmapEventHandler={warmapEventHandler}
            />)}
        </Layer>
    </Stage>;
};
export default MapSector;

