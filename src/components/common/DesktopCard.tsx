import React from 'react'

type propsType = {
    title: string,
    rows: Array<[string | number,  number | string]>
}

const DesktopCard: React.FC<propsType> = (props) => {
    return <div>
        <h4>{props.title}</h4>
        {props.rows.map((row)=>{
            return <div><strong>{row[0] + " "}</strong><span>{row[1]}</span></div>
        })}
    </div>
}

export default DesktopCard