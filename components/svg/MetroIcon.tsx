import React from "react";
import SvgInterface from "./SvgInterface";

function MetroIcon({ width, height, color = '000000', ...other }: SvgInterface) {
    // console.log('svg color', color)
    return (
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width={width} height={height} viewBox="337.5 232.3 125 85.9" >
            <polygon
                fill={color}
                points="453.9,306.2 424.7,232.3 400,275.5 375.4,232.3 346.1,306.2 337.5,306.2 337.5,317.4 381.7,317.4   381.7,306.2 375.1,306.2 381.5,287.8 400,318.2 418.5,287.8 424.9,306.2 418.3,306.2 418.3,317.4 462.5,317.4 462.5,306.2 "/>
        </svg>
    );
}

export default React.memo(MetroIcon);
