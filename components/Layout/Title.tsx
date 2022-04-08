const {Title: TitleT} = Typography;

import React from "react";
import {Typography} from "antd";

const Title = (props: React.PropsWithChildren<{title: string}>)=>{
    return <>
        <div style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between"
        }}>
            <TitleT>{props.title}</TitleT>

            {props.children}
        </div>
    </>
}

export default Title