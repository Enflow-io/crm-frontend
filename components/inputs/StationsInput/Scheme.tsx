import React, {useEffect, useRef, useState} from 'react'
import SvgInterface from "../../../interfaces/SvgInterface";


interface MetroSchemeInterface extends SvgInterface {
    onStationsChange?: (stations: any[]) => void
    close?: () => void
    selectedStations?: string[]
    onError?: () => void
}


function MetroScheme({width = 1330, height = 1730, color, ...other}: MetroSchemeInterface) {

    const [selectedStations, setSelectedStations] = useState<string[]>(other.selectedStations || [])
    const [line, setLine] = useState<any[]>([])
    const reference = useRef(null);

    useEffect(()=>{
        for(let stationId of selectedStations){
            // @ts-ignore
            const item = reference.current.querySelector('#'+stationId)
            item.classList.add('selected')
            // console.log(item)
            // @ts-ignore
            const item2 = reference?.current.querySelector(`[data-id=${stationId}]`)
            item2.classList.add('selected')
            // console.log(item2)

        }
    })

    return (
        <>
            <button style={{
                position: "absolute",
                right: 32
            }}
                    onClick={()=>{
                        if(other.close){
                            other.close()
                        }
                    }}
                    >Применить</button>
            <button
                style={{
                    position: "absolute",
                    right: 130
                }}
                onClick={(event)=>{
                    setSelectedStations([])
                    console.log(reference.current);
                    const xxx = reference.current;
                    // @ts-ignore
                    xxx.querySelectorAll('.selected').forEach(item=>{
                        item.classList.toggle('selected')
                    })

                }}
            >Сбросить</button>
            <svg
                ref={reference}
                className={other.className}
                fill="#152333"
                xmlns="http://www.w3.org/2000/svg"
                width="1330" height="1730" viewBox="30 -70 1330 1730" xmlSpace="default"
                // onClick={event => SetMetroStationId}
                onClick={(e) => {


                    // @ts-ignore
                    const id = e.target.getAttribute("data-id");
                    if (id) {

                        // @ts-ignore
                        const label = e.target.textContent;
                        console.log(id)

                        setLine([
                            ...line,
                            {
                                id,
                                label
                            }
                        ])
                        console.log(line)

                        // @ts-ignore
                        e.target.classList.toggle('selected')

                        const element = document.getElementById(id)
                        if (!element) {
                            return
                        }

                        let isThereADataCloneId = element?.hasAttribute('data-clone-id')
                        if (isThereADataCloneId) {
                            // @ts-ignore
                            let cloneId = element.attributes.getNamedItem("data-clone-id").nodeValue
                            if(cloneId){
                                // @ts-ignore
                                let elementsClone = document.getElementById(cloneId);
                                if(elementsClone){
                                    // @ts-ignore
                                    elementsClone?.classList?.toggle('selected')
                                }
                            }



                        }

                        let isThereADataClone2Id = element?.hasAttribute('data-clone-2-id')
                        if (isThereADataClone2Id) {
                            if(element){
                                // @ts-ignore
                                let clone2Id = element.attributes.getNamedItem("data-clone-2-id").nodeValue
                                // @ts-ignore
                                let elementsClone2 = document.getElementById(clone2Id);
                                // @ts-ignore
                                elementsClone2.classList.toggle('selected')
                            }

                        }


                        const isSelected = selectedStations.includes(id);

                        if (isSelected) {
                            const newStations = [...selectedStations]
                            const index = newStations.indexOf(id);
                            newStations.splice(index, 1);
                            setSelectedStations(newStations)
                            if(other.onStationsChange){
                                other.onStationsChange(newStations)
                            }

                        } else {
                            const newStations = [...selectedStations]
                            if(newStations.length > 1){
                                if(other.onError){
                                    other.onError()
                                }
                                return
                            }
                            newStations.push(id)
                            setSelectedStations(newStations)
                            if(other.onStationsChange){
                                other.onStationsChange(newStations)
                            }
                        }

                        element.classList.toggle('selected')

                    }
                }}
            >


                <defs>
                    <g id="ele-int">
                        <circle cx="0" cy="0" r="9" style={{
                            fill: "#fff", stroke: "#000", strokeWidth: 1
                        }}/>
                    </g>
                    <g id="int2">
                        <path className="intb" d="M 0,0 L 28,0"/>
                        <use xlinkHref="#ele-int" x="0" y="0"/>
                        <use xlinkHref="#ele-int" x="28" y="0"/>
                        <path className="intf" d="M 0,0 L 28,0"/>
                    </g>
                    <g id="int2s">
                        <path className="intb" d="M 0,0 L 20,20"/>
                        <use xlinkHref="#ele-int" x="0" y="0"/>
                        <use xlinkHref="#ele-int" x="20" y="20"/>
                        <path className="intf" d="M 0,0 L 20,20"/>
                    </g>
                    <g id="int3-1">
                        <path className="intb" d="M 0,0 v -54.67"/>
                        <use xlinkHref="#ele-int" x="0" y="0"/>
                        <use xlinkHref="#ele-int" x="0" y="-27.33"/>
                        <use xlinkHref="#ele-int" x="0" y="-54.67"/>
                        <path className="intf" d="M 0,0 v -54.67"/>
                    </g>
                    <g id="int3-2">
                        <path className="intb" d="M 0,0 L 18,19 0,39 z"/>
                        <use xlinkHref="#ele-int" x="0" y="0"/>
                        <use xlinkHref="#ele-int" x="18" y="19"/>
                        <use xlinkHref="#ele-int" x="0" y="39"/>
                        <path className="intf" d="M 0,0 L 18,19 0,39 z"/>
                    </g>
                    <g id="int3-3">
                        <path className="intb" d="M 0,0 L 24,0 12,21 z"/>
                        <use xlinkHref="#ele-int" x="0" y="0"/>
                        <use xlinkHref="#ele-int" x="24" y="0"/>
                        <use xlinkHref="#ele-int" x="12" y="21"/>
                        <path className="intf" d="M 0,0 L 24,0 12,21 z"/>
                    </g>
                    <g id="int3-4">
                        <path className="intb" d="M 0,0 L 28,0 14,-14 z"/>
                        <use xlinkHref="#ele-int" x="0" y="0"/>
                        <use xlinkHref="#ele-int" x="28" y="0"/>
                        <use xlinkHref="#ele-int" x="14" y="-14"/>
                        <path className="intf" d="M 0,0 L 28,0 14,-14 z"/>
                    </g>
                    <g id="int3-5">
                        <path className="intb" d="M 0,0 L 0,36 z"/>
                        <use xlinkHref="#ele-int" x="0" y="0"/>
                        <use xlinkHref="#ele-int" x="0" y="18"/>
                        <use xlinkHref="#ele-int" x="0" y="36"/>
                        <path className="intf" d="M 0,0 L 0,36 z"/>
                    </g>
                    <g id="int4">
                        <path className="intb" d="M 20,20 L 0,0 -20,20 20,20 0,40 -20,20 z"/>
                        <use xlinkHref="#ele-int" x="0" y="0"/>
                        <use xlinkHref="#ele-int" x="20" y="20"/>
                        <use xlinkHref="#ele-int" x="0" y="40"/>
                        <use xlinkHref="#ele-int" x="-20" y="20"/>
                        <path className="intf" d="M 20,20 L 0,0 -20,20 20,20 0,40 -20,20 z"/>
                    </g>
                    <g id="intst" style={{
                        stroke: "none"
                    }}>
                        <circle style={{
                            stroke: "#000",
                            strokeWidth: 1.5
                        }} cx="0" cy="0" r="6"/>
                        <path fill="#000" d="M 0,0 V -2 H 5 L 9.5,0 5,2 H 0"/>
                        <circle cx="0" cy="0" r="6"/>
                    </g>
                    <g id="intst-h">
                        <path d="M 0,0 l 0,-6 a 6,6 0 1,0 0,12 z"/>
                    </g>
                    <g id="intst-hs">
                        <path d="M 0,0 l 0,-3 a 3,3 0 1,0 0,6 z"/>
                    </g>
                    <g id="term">
                        <path style={{
                            fill: "none",
                            strokeWidth: 5
                        }} d="M -8,0 L 8,0"/>
                    </g>
                    <g id="termx">
                        <path style={{
                            fill: "#fff",
                            strokeWidth: 1
                        }} d="M 1.5,-2 H 7.5 V 2 H -7.5 V -2 H -1.5"/>
                    </g>
                    <g id="terms" style={{fill: "none"}}>
                        <path d="M -8,0 L 8,0"/>
                        <path d="M 0,0 L 0,-2.5"/>
                    </g>
                    <g id="st" className={'station-metro'}>
                        <path style={{
                            // fill:"none",
                            strokeWidth: 5,
                            cursor: 'pointer'
                        }} d="M 8,0 L 0,0"/>
                    </g>
                    <g id="sti14">
                        <use xlinkHref="#st"/>
                        <circle r="1" fill="#fff"/>
                    </g>
                    <g id="stx">
                        <path style={{
                            fill: "none",
                            strokeWidth: 5
                        }} d="M 8,0 L 2,0"/>
                    </g>
                    <g id="stxm">
                        <path style={{
                            fill: "none",
                            stroke: "#fff",
                            strokeWidth: 3
                        }} d="M 7,0 L 0,0"/>
                    </g>
                    <g id="stx2">
                        <path style={{
                            fill: "#fff", strokeWidth: 1, strokeLinecap: "square"
                        }} d="M 2.5,-2 H 7.5 V 2 H 2.5"/>
                    </g>
                    <g id="stb">
                        <path style={{
                            fill: "#fff",
                            stroke: "#fff",
                            strokeWidth: 3,
                            strokeLinecap: "square"
                        }} d="M 4,-2 H 7.5 V 2 H 4"/>
                    </g>
                    <g id="termb">
                        <path style={{
                            fill: "#fff", stroke: "#fff", strokeWidth: 3,
                            strokeLinecap: "square"
                        }}
                              d="M 4,2 H 7.5 V -2 H -7.5 V 2 H -4"/>
                    </g>
                    <g id="sts" style={{
                        fill: "none",
                        strokeWidth: 2.5
                    }}>
                        <path d="M 8,0 L 0,0"/>
                        <path d="M 0,0 L 0,3 0,-3 z"/>
                    </g>
                    <g id="stmono">
                        <circle cx="0" cy="0" r="3" className="fm1 ns"/>
                    </g>
                    <g id="stmonoi">
                        <circle cx="0" cy="0" r="4" fill="#fff"/>
                        <use xlinkHref="#stmono"/>
                        <circle cx="0" cy="0" r="1" fill="#fff"/>
                    </g>
                    <g id="stvok">
                        <circle cx="0" cy="0" r="5" style={{fill: "#aaa", stroke: "none"}}/>
                    </g>
                    <g id="st14" stroke="none">
                        <circle cx="0" cy="0" r="5" className="f14" id="st14x"/>
                        <circle cx="0" cy="0" r="3" className="f14_2"/>
                    </g>
                    <g id="st14i" stroke="none">
                        <use xlinkHref="#st14"/>
                        <circle cx="0" cy="0" r="1.5" fill="#fff"/>
                    </g>
                    <g id="st14ih" stroke="none">
                        <circle cx="0" cy="0" r="5" fill="#000"/>
                        <circle cx="0" cy="0" r="3" className="f14_2"/>
                        <circle cx="0" cy="0" r="1.5" fill="#fff"/>
                    </g>
                    <g id="st14ix" stroke="none">
                        <use xlinkHref="#st14x"/>
                        <circle cx="0" cy="0" r="1.5" fill="#fff"/>
                    </g>
                    <g id="intst1">
                        <use xlinkHref="#intst" className="f1"/>
                    </g>
                    <g id="intst-h1">
                        <use xlinkHref="#intst-h" className="f1"/>
                    </g>
                    <g id="term1">
                        <use xlinkHref="#term" className="p1"/>
                    </g>
                    <g id="term1o">
                        <use xlinkHref="#termb"/>
                        <use xlinkHref="#term1"/>
                        <circle r="1" fill="#fff"/>
                    </g>
                    <g id="st1">
                        <use xlinkHref="#st" className="p1"/>
                    </g>
                    <g id="st1o">
                        <use xlinkHref="#stb"/>
                        <use xlinkHref="#st1"/>
                        <circle r="1" fill="#fff"/>
                    </g>
                    <g id="intst1x">
                        <use xlinkHref="#intst" className="f1x"/>
                    </g>
                    <g id="intst-h1x">
                        <use xlinkHref="#intst-h" className="f1x"/>
                    </g>
                    <g id="term1x">
                        <use xlinkHref="#termx" className="p1"/>
                    </g>
                    <g id="st1x">
                        <use xlinkHref="#stx" className="p1"/>
                        <use xlinkHref="#stxm"/>
                    </g>
                    <g id="intst2">
                        <use xlinkHref="#intst" className="f2"/>
                    </g>
                    <g id="intst-h2">
                        <use xlinkHref="#intst-h" className="f2"/>
                    </g>
                    <g id="term2">
                        <use xlinkHref="#term" className="p2"/>
                    </g>
                    <g id="st2">
                        <use xlinkHref="#st" className="p2"/>
                    </g>

                    <g id="stSelected">
                        <use xlinkHref="#st" className="stSelected"/>
                    </g>
                    <g id="st2o">
                        <use xlinkHref="#с"/>
                        <use xlinkHref="#st2"/>
                        <circle r="1" fill="#fff"/>
                    </g>
                    <g id="intst2x">
                        <use xlinkHref="#intst" className="f2x"/>
                    </g>
                    <g id="intst-h2x">
                        <use xlinkHref="#intst-h" className="f2x"/>
                    </g>
                    <g id="term2x">
                        <use xlinkHref="#termx" className="p2"/>
                    </g>
                    <g id="st2x">
                        <use xlinkHref="#stx" className="p2"/>
                        <use xlinkHref="#stxm"/>
                    </g>
                    <g id="st2x2">
                        <use xlinkHref="#stx2" className="p2"/>
                    </g>
                    <g id="intst3">
                        <use xlinkHref="#intst" className="f3"/>
                    </g>
                    <g id="intst-h3">
                        <use xlinkHref="#intst-h" className="f3"/>
                    </g>
                    <g id="term3">
                        <use xlinkHref="#term" className="p3"/>
                    </g>
                    <g id="st3">
                        <use xlinkHref="#st" className="p3"/>
                    </g>
                    <g id="st3o">
                        <use xlinkHref="#stb"/>
                        <use xlinkHref="#st3"/>
                        <circle r="1" fill="#fff"/>
                    </g>
                    <g id="intst3x">
                        <use xlinkHref="#intst" className="f3x"/>
                    </g>
                    <g id="intst-h3x">
                        <use xlinkHref="#intst-h" className="f3x"/>
                    </g>
                    <g id="term3x">
                        <use xlinkHref="#termx" className="p3"/>
                    </g>
                    <g id="st3x">
                        <use xlinkHref="#stx" className="p3"/>
                        <use xlinkHref="#stxm"/>
                    </g>
                    <g id="intst4">
                        <use xlinkHref="#intst" className="f4"/>
                    </g>
                    <g id="intst-h4">
                        <use xlinkHref="#intst-h" className="f4"/>
                    </g>
                    <g id="term4">
                        <use xlinkHref="#term" className="p4"/>
                    </g>
                    <g id="st4">
                        <use xlinkHref="#st" className="p4"/>
                    </g>
                    <g id="intst4x">
                        <use xlinkHref="#intst" className="f4x"/>
                    </g>
                    <g id="intst-h4x">
                        <use xlinkHref="#intst-h" className="f4x"/>
                    </g>
                    <g id="term4x">
                        <use xlinkHref="#termx" className="p4"/>
                    </g>
                    <g id="st4x">
                        <use xlinkHref="#stx" className="p4"/>
                        <use xlinkHref="#stxm"/>
                    </g>
                    <g id="intst5">
                        <use xlinkHref="#intst" className="f5"/>
                    </g>
                    <g id="intst-h5">
                        <use xlinkHref="#intst-h" className="f5"/>
                    </g>
                    <g id="term5">
                        <use xlinkHref="#term" className="p5"/>
                    </g>
                    <g id="st5">
                        <use xlinkHref="#st" className="p5"/>
                    </g>
                    <g id="intst5x">
                        <use xlinkHref="#intst" className="f5x"/>
                    </g>
                    <g id="intst6">
                        <use xlinkHref="#intst" className="f6"/>
                    </g>
                    <g id="intst-h6">
                        <use xlinkHref="#intst-h" className="f6"/>
                    </g>
                    <g id="term6">
                        <use xlinkHref="#term" className="p6"/>
                    </g>
                    <g id="st6">
                        <use xlinkHref="#st" className="p6"/>
                    </g>
                    <g id="st6o">
                        <use xlinkHref="#stb"/>
                        <use xlinkHref="#st6"/>
                        <circle r="1" fill="#fff"/>
                    </g>
                    <g id="intst6x">
                        <use xlinkHref="#intst" className="f6x"/>
                    </g>
                    <g id="intst-h6x">
                        <use xlinkHref="#intst-h" className="f6x"/>
                    </g>
                    <g id="term6x">
                        <use xlinkHref="#termx" className="p6"/>
                    </g>
                    <g id="st6x">
                        <use xlinkHref="#stx" className="p6"/>
                        <use xlinkHref="#stxm"/>
                    </g>
                    <g id="intst7">
                        <use xlinkHref="#intst" className="f7"/>
                    </g>
                    <g id="intst-h7">
                        <use xlinkHref="#intst-h" className="f7"/>
                    </g>
                    <g id="term7">
                        <use xlinkHref="#term" className="p7"/>
                    </g>
                    <g id="st7">
                        <use xlinkHref="#st" className="p7"/>
                    </g>
                    <g id="st7o">
                        <use xlinkHref="#stb"/>
                        <use xlinkHref="#st7"/>
                        <circle r="1" fill="#fff"/>
                    </g>
                    <g id="intst7x">
                        <use xlinkHref="#intst" className="f7x"/>
                    </g>
                    <g id="intst-h7x">
                        <use xlinkHref="#intst-h" className="f7x"/>
                    </g>
                    <g id="term7x">
                        <use xlinkHref="#termx" className="p7"/>
                    </g>
                    <g id="st7x">
                        <use xlinkHref="#stx" className="p7"/>
                        <use xlinkHref="#stxm"/>
                    </g>
                    <g id="intst8">
                        <use xlinkHref="#intst" className="f8"/>
                    </g>
                    <g id="intst-h8">
                        <use xlinkHref="#intst-h" className="f8"/>
                    </g>
                    <g id="term8">
                        <use xlinkHref="#term" className="p8"/>
                    </g>
                    <g id="st8">
                        <use xlinkHref="#st" className="p8"/>
                    </g>
                    <g id="st8o">
                        <use xlinkHref="#stb"/>
                        <use xlinkHref="#st8"/>
                        <circle r="1" fill="#fff"/>
                    </g>
                    <g id="intst8x">
                        <use xlinkHref="#intst" className="f8x"/>
                    </g>
                    <g id="intst-h8x">
                        <use xlinkHref="#intst-h" className="f8x"/>
                    </g>
                    <g id="term8x">
                        <use xlinkHref="#termx" className="p8"/>
                    </g>
                    <g id="st8x">
                        <use xlinkHref="#stx" className="p8"/>
                        <use xlinkHref="#stxm"/>
                    </g>
                    <g id="intst9">
                        <use xlinkHref="#intst" className="f9"/>
                    </g>
                    <g id="intst-h9">
                        <use xlinkHref="#intst-h" className="f9"/>
                    </g>
                    <g id="term9">
                        <use xlinkHref="#term" className="p9"/>
                    </g>
                    <g id="st9">
                        <use xlinkHref="#st" className="p9"/>
                    </g>
                    <g id="st9o">
                        <use xlinkHref="#stb"/>
                        <use xlinkHref="#st" className="p9"/>
                        <circle r="1" fill="#fff"/>
                    </g>
                    <g id="intst9x">
                        <use xlinkHref="#intst" className="f9x"/>
                    </g>
                    <g id="intst-h9x">
                        <use xlinkHref="#intst-h" className="f9x"/>
                    </g>
                    <g id="term9x">
                        <use xlinkHref="#termx" className="p9"/>
                    </g>
                    <g id="st9x">
                        <use xlinkHref="#st9"/>
                        <use xlinkHref="#stxm"/>
                    </g>
                    <g id="intst10">
                        <use xlinkHref="#intst" className="f10"/>
                    </g>
                    <g id="intst-h10">
                        <use xlinkHref="#intst-h" className="f10"/>
                    </g>
                    <g id="term10">
                        <use xlinkHref="#term" className="p10"/>
                    </g>
                    <g id="st10">
                        <use xlinkHref="#st" className="p10"/>
                    </g>
                    <g id="intst10x">
                        <use xlinkHref="#intst" className="f10x"/>
                    </g>
                    <g id="intst-h10x">
                        <use xlinkHref="#intst-h" className="f10x"/>
                    </g>
                    <g id="term10x">
                        <use xlinkHref="#termx" className="p10"/>
                    </g>
                    <g id="st10x">
                        <use xlinkHref="#stx" className="p10"/>
                        <use xlinkHref="#stxm"/>
                    </g>
                    <g id="st10o">
                        <use xlinkHref="#stb"/>
                        <use xlinkHref="#st10"/>
                        <circle r="1" fill="#fff"/>
                    </g>
                    <g id="st10ox">
                        <use xlinkHref="#stb"/>
                        <use xlinkHref="#st10x"/>
                    </g>
                    <g id="term11">
                        <use xlinkHref="#term" className="p11"/>
                    </g>
                    <g id="st11">
                        <use xlinkHref="#st" className="p11"/>
                    </g>
                    <g id="st11o">
                        <use xlinkHref="#stb"/>
                        <use xlinkHref="#st11"/>
                        <circle r="1" fill="#fff"/>
                    </g>
                    <g id="st8a11">
                        <use xlinkHref="#st" className="p11"/>
                        <path style={{
                            fill: "none",
                            strokeWidth: 2.5
                        }} className="p8" d="M 8,-1.25 H 0"/>
                    </g>
                    <g id="st8a11o">
                        <use xlinkHref="#st8a11"/>
                        <circle r="1" fill="#fff"/>
                    </g>

                    <g id="term11x">
                        <use xlinkHref="#termx" className="p11"/>
                    </g>
                    <g id="intst11">
                        <use xlinkHref="#intst" className="f11"/>
                    </g>
                    <g id="intst-h11">
                        <use xlinkHref="#intst-h" className="f11"/>
                    </g>
                    <g id="termtpk">
                        <use xlinkHref="#term" className="p11"/>
                    </g>
                    <g id="sttpk">
                        <use xlinkHref="#st" className="p11"/>
                    </g>
                    <g id="intst11x">
                        <use xlinkHref="#intst" className="f11x"/>
                    </g>
                    <g id="intst-h11x">
                        <use xlinkHref="#intst-h" className="f11x"/>
                    </g>
                    <g id="termtpkx">
                        <use xlinkHref="#termx" className="p11"/>
                    </g>
                    <g id="st11x">
                        <use xlinkHref="#stx" className="p11"/>
                        <use xlinkHref="#stxm"/>
                    </g>

                    <g id="intst12">
                        <use xlinkHref="#intst" className="f12"/>
                    </g>
                    <g id="intst-h12">
                        <use xlinkHref="#intst-h" className="f12"/>
                    </g>
                    <g id="term12">
                        <use xlinkHref="#term" className="p12"/>
                    </g>
                    <g id="st12">
                        <use xlinkHref="#st" className="p12"/>
                    </g>
                    <g id="intst12x">
                        <use xlinkHref="#intst" className="f12x"/>
                    </g>
                    <g id="intst-h12x">
                        <use xlinkHref="#intst-h" className="f12x"/>
                    </g>
                    <g id="term12x">
                        <use xlinkHref="#termx" className="p12"/>
                    </g>
                    <g id="st12x">
                        <use xlinkHref="#stx" className="p12"/>
                        <use xlinkHref="#stxm"/>
                    </g>
                    <g id="intst15">
                        <use xlinkHref="#intst" className="f15"/>
                    </g>
                    <g id="intst-hkozh">
                        <use xlinkHref="#intst-h" className="f15"/>
                    </g>
                    <g id="term15">
                        <use xlinkHref="#term" className="p15"/>
                    </g>
                    <g id="st15">
                        <use xlinkHref="#st" className="p15"/>
                    </g>
                    <g id="intst15x">
                        <use xlinkHref="#intst" className="f15x"/>
                    </g>
                    <g id="intst-hkozhx">
                        <use xlinkHref="#intst-h" className="f15x"/>
                    </g>
                    <g id="term15x">
                        <use xlinkHref="#termx" className="p15"/>
                    </g>
                    <g id="st15x">
                        <use xlinkHref="#stx" className="p15"/>
                        <use xlinkHref="#stxm"/>
                    </g>
                    <g id="intst16">
                        <use xlinkHref="#intst" className="f16"/>
                    </g>
                    <g id="intst-h16">
                        <use xlinkHref="#intst-h" className="f16"/>
                    </g>
                    <g id="term16">
                        <use xlinkHref="#term" className="p16"/>
                    </g>
                    <g id="st16">
                        <use xlinkHref="#st" className="p16"/>
                    </g>
                    <g id="intst16x">
                        <use xlinkHref="#intst" className="f16x"/>
                    </g>
                    <g id="intst-h16x">
                        <use xlinkHref="#intst-h" className="f16x"/>
                    </g>
                    <g id="term16x">
                        <use xlinkHref="#termx" className="p16"/>
                    </g>
                    <g id="st16x">
                        <use xlinkHref="#stx" className="p16"/>
                        <use xlinkHref="#stxm"/>
                    </g>
                    <g id="train" transform="matrix(0.07 0 0 0.08 -53,-13)">
                        <g style={{
                            fillRule: "evenodd", stroke: "none"
                        }}>
                            <path style={{
                                fill: "#000"
                            }}
                                  d="M 1009,214 L 778,214 C 767,214 754,197 754,186 C 754,167 755,148 755,130 C 758,109 766,90 774,71 C 776,67 779,63 784,63 L 867,63 C 875,66 883,69 886,78 C 910,137 958,165 1012,175 L 1012,211 C 1012,212 1010,214 1009,214 z"/>
                            <path style={{
                                fill: "#fff"
                            }}
                                  d="M 770,114 L 875,114 C 878,114 879,108 877,105 C 874,95 869,75 864,75 L 783,75 C 778,75 773,95 768,105 C 767,109 768,114 770,114 z"/>
                        </g>
                        <g style={{
                            fill: "#fff", fillRule: "nonzero", stroke: "none"
                        }}>
                            <path id="lamp"
                                  d="M 787,164 C 787,170 783,174 778,174 C 773,174 768,170 768,164 C 768,159 773,155 778,155 C 783,155 787,159 787,164 z"/>
                            <path transform="translate(80,0)"
                                  d="M 787,164 C 787,170 783,174 778,174 C 773,174 768,170 768,164 C 768,159 773,155 778,155 C 783,155 787,159 787,164 z"/>
                        </g>
                        <g style={{
                            fill: "#fff", fillRule: "evenodd", stroke: "none"
                        }}>
                            <path
                                d="M 913,136 L 913,171 L 897,163 C 896,149 895,134 895,119 C 901,124 908,132 913,136 z"/>
                            <path
                                d="M 937,155 L 938,182 L 922,175 C 922,161 922,159 922,144 C 929,150 932,151 937,155 z"/>
                            <path d="M 945,160 L 945,184 C 950,186 955,187 960,188 L 960,166 L 945,160 z"/>
                            <path d="M 966,169 L 966,190 C 970,191 974,192 978,192 L 978,172 L 966,169 z"/>
                            <path d="M 984,174 L 984,193 C 987,194 991,194 994,194 L 994,176 L 984,174 z"/>
                            <path d="M 999,177 L 999,195 L 1007,196 L 1007,178 L 999,177 z"/>
                        </g>
                        <path style={{
                            fill: "#000"
                        }}
                              d="M 754,229 L 774,229 L 774,219 L 804,219 L 804,229 L 848,229 L 848,219 L 1012,219 L 1012,229 C 966,230 919,232 894,243 L 754,243 L 754,229 z"/>
                    </g>
                    <g id="airport" transform="rotate(-90)scale(0.04)translate(-250,-250)" style={{
                        stroke: "none", fill: "#000"
                    }}>
                        <polygon
                            points="490,250 450,225 320,225 170,10 140,10 200,225 80,225 30,150 10,150 30,240 30,260 10,350 30,350 80,275 200,275 140,490 170,490 320,275 450,275"/>
                        <ellipse cx="441" cy="250" rx="50" ry="24" stroke="#000"/>
                    </g>
                    <linearGradient id="bshade1" gradientUnits="objectBoundingBox">
                        <stop offset="10%" stopOpacity="1" stopColor="#000"/>
                        <stop offset="100%" stopOpacity="1" stopColor="#777"/>
                    </linearGradient>
                    <linearGradient id="bshade2" gradientUnits="objectBoundingBox">
                        <stop offset="0%" stopOpacity="1" stopColor="#888"/>
                        <stop offset="100%" stopOpacity="1" stopColor="#111"/>
                    </linearGradient>
                </defs>
                <rect id="background_color" x="-200" y="-200" width="3000" height="3000" style={{
                    fill: "#fff"
                }}/>
                <g id="river_group" className="river plcr">
                    <g id="small_river" strokeWidth="5">
                        <path id="moskva_canal" d="
			M 266,479
			L 255,468 q -10,-10 -10,-24
			L 245,351 q 0,-14 10,-24
			L 306,276 q 10,-10 10,-24
			L 315,-70
			">
                            <title>Канал имени Москвы</title>
                        </path>
                        <path id="strogino_lake_exit" style={{
                            fill: "#eafaff"
                        }} d="
			M 153,334
			l 30,-30 q 10,-10 24,-10
			l 20,0 a 10,10 0 0,1 0,20
			l -50,0 -16 16 z
			"/>
                        <path id="vodootvodny_canal" cursor="help" d="
			M 570,740
			L 582,740 q 14,0 24,-10
			L 636,700 q 10,-10 24,-10
			L 759,690 q 21,0 36,15
			L 900,810
			">
                            <title>Водоотводный канал</title>
                        </path>
                        <path id="yauza_river" d="
			M 810,690
			L 960,690 a 60,60 0 0,0 60,-60
			V 326 q 0,-21 -15,-36
			L 878,163 q -15,-15 -36,-15
			H 825 a 30,30 0 0,1 -21,-51
			l 100,-100
			">
                            <title>река Яуза</title>
                        </path>
                        <path id="Nagatino_Kozhukhovo" d="M 912,932 L 940,904"/>
                    </g>
                    <path id="Nagatino_poyma" strokeWidth="6" d="
		M 953,891 a 28.28,28.28 0 0,1 40,0
		l 24.5,24.5 q 15,15 15,36 v 25
		"/>
                    <path id="grebnoy_canal" strokeWidth="3" d="
		M 160,388 l 40,-15
		20,0 -40,15 z
		"/>
                    <path id="moskva_river" strokeWidth="15" d="
		M -200,279
		L 230,279 a 25,25 0 0,1 0,50
		L 170,329 a 15,15 0 0,0 0,30
		L 218,359 a 22,22 0 0,1 0,44
		L 170,403 a 30,30 0 0,0 0,60
		L 233,463 a 30,30 0 0,1 30,30
		V 545 a 50,50 0 0,0 50,50
		H 330 q 21,0 36,-15
		L 370,575 q 15,-15 36,-15
		L 431,560 a 30,30 0 0,1 30,30
		L 461,705 q 0,21 -15,36
		L 386,801 a 30,30 0 0,0 60,60
		L 631,676 q 15,-15 36,-15
		L 761,661 q 21,0 36,15
		L 887,766 q 15,15 15,36
		L 902,912 a 20,20 0 0,0 20,20
		L 1002,932 a 26,26 0 0,1 26,26
		L 1028,983 c 0,45 -45,45 -45,90
		L 983,1085 a 39,39 0 0,0 39,39
		L 1080,1124 q 21,0 36,15
		l 500,500
		">
                        <title>Москва-река</title>
                    </path>
                </g>
                <g id="Aeroexpress" cursor="help">
                    <g>
                        <title>Аэроэкспресс от Белорусского вокзала до аэропорта «Шереметьево».</title>
                        <g className="aerob">
                            <path id="Sheremetyevo_express_line" d="
				M 492,371
				L 600,263 q 10,-10 10,-24
				L 610,-30 a 15,15 0 0,0 -15,-15
				H 575
				"/>
                        </g>
                        <use xlinkHref="#Sheremetyevo_express_line" className="aeroo"/>
                    </g>
                    <g>
                        <title>Аэроэкспресс от Киевского вокзала до аэропорта «Внуково».</title>
                        <g className="aerob">
                            <path id="Vnukovo_Aeroexpress_line" d="
				M 400,664
				H 310 a 100,100 0 0,0 -70.7,29.3
				l -153,153 a 100,100 0 0,0 -29.3,70.7
				V 1057
				"/>
                        </g>
                        <use xlinkHref="#Vnukovo_Aeroexpress_line" className="aeroo"/>
                    </g>
                    <g>
                        <title>Аэроэкспресс от Павелецкого вокзала до аэропорта «Домодедово».</title>
                        <g className="aerob">
                            <path id="Domodedovo_Aeroexpress_line" d="
				M 883,818 L 883,1270
				"/>
                        </g>
                        <use xlinkHref="#Domodedovo_Aeroexpress_line" className="aeroo"/>
                    </g>
                </g>
                <g id="out_of_station_interchange_under" className="osi">
                    <title>Out-of-station interchange with the same metro fare card counts as 1 consecutive
                        journey.</title>
                    <path d="M 575,197 H 585" id="Timiryazevskaya_osi"/>
                    <path d="M 633.5,185.5 V 197" id="Fonvizinskaya_osi"/>
                    <path d="M 837,197 L 848,208" id="VDNKh_osi"/>
                    <path d="M 640,118 H 648.4 q 5.6,0 9.6,-4 L 660,112" id="Vladykino_osi"/>
                    <path d="M 837,112 L 848,123" id="Botanichesky_Sad_osi"/>
                    <path d="M 1043,197 l -5,5 A 9.2,9.2 0 0,0 1038,215" id="Bulvar_Rokossovskogo_osi"/>
                    <path d="M 1077,247 L 1066.8,256" id="Lokomotiv-Cherkizovskaya_osi"/>
                    <path d="M 1105,414 L 1112,421" id="Izmaylovo-Partizanskaya_osi"/>
                    <path d="M 1105,646 L 1113,654" id="Shosse_Entuziastov_osi"/>
                    <path d="M 1027,867 H 1059" className="dash osif" id="Ugreshskaya_osi"/>
                    <path d="M 1012,860 L 997,875" id="Dubrovka_osi"/>
                    <path d="M 1042,904 h -9 q -7,0 -12,-5 l -24,-24 L 997,875" className="dash osif"
                          id="Dubrovka-Kozhukhovskaya_osi"/>
                    <path d="M 927,874 L 927,888" id="Avtozavodskaya_osi"/>
                    <path d="M 761,932 L 773,920" className="dash osif" id="Verkhnie_Kotly_osi"/>
                    <path d="M 700,920 V 936" id="Krymskaya_osi"/>
                    <path d="M 592,882 L 611,882" id="Ploshchad_Gagarina-Leninsky_Prospekt_osi"/>
                    <path d="M 410,835 H 427" id="Sportivnaya-Luzhniki_osi"/>
                    <path d="M 309,485 q 4,4 6,4 L 319,489" id="Shelepikha_osi"/>
                    <path d="M 367,400 H 379" id="Khoroshyovo-Polezhayevskaya-Khoroshyovskaya_osi"/>
                    <path d="M 367,329 L 344,352 H 367" className="dash"
                          id="Oktyabrskoye_Pole-Panfilovskaya-Zorge_osi"/>
                    <path d="M 390,230.74 L 390,245" id="Baltiyskaya-Voykovskaya_osi"/>
                    <path d="M 390,245 v 9 q 0,14 -10,24 l -12,12 L 368,290" className="dash"
                          id="Voykovskaya-Streshnevo_osi"/>
                    <path d="M 583,121 h 3 A 9,9 0 0,0 595,112" id="Okruzhnaya_osi"/>

                    <path d="M 1028,505 l 20,20" id="Elektrozavodskaya_temporary_osi"/>
                    <path d="M 1063.46,703.5 h 28" id="Aviamotornaya_temporary_osi"/>
                </g>

                <g id="metro_route_group" style={{
                    fill: "none", cursor: "help", opacity: 1
                }}>
                    <g>
                        <title>#16 Троицкая линия</title>
                        <use xlinkHref="#route16" className="mebg"/>
                        <g className="me p16 xb">
                            <path id="route16" d="
				M 700,936
				H 501 q -14,0 -24,10
				L 221,1202
				"/>
                        </g>
                        <use xlinkHref="#route16" className="mex"/>
                    </g>
                    <g>
                        <title>#11 Большая кольцевая линия</title>
                        <use xlinkHref="#route11x" className="mebg"/>
                        <g className="me p11 xb">
                            <path id="route11x" d="
				M 547,267
				H 848 a 200,200 0 0,1 200,200

				V 632 q 0,28 20,48
				L 1161.5,773.5 a 45,45 0 0,1 0,65
				L 982,1018 q -10,10 -24,10
				L 948,1028

				M 225,430
				H 165 a 100,100 0 0,0 -100,100
				V 578 a 100,100 0 0,0 30,70
				L 465,1018 q 10,10 24,10
				L 955,1028
				"/>
                        </g>
                        <use xlinkHref="#route11x" className="mex"/>
                    </g>
                    <g>
                        <title>#8А Солнцевская линия</title>
                        <use xlinkHref="#route8A" className="mebg"/>
                        <g className="me p8">
                            <g id="route8A">
                                <path d="
					M 227,620
					V 755 q 0,14 -10,24
					l -133,133 q -10,10 -10,24
					V 980

					M 330,558
					H 287 a 60,60 0 0,0 -60,60
					V 620
					"/>
                            </g>
                            <path id="route8A_ext" className="xb" d="M 74,980 V 1040"/>
                        </g>
                        <use xlinkHref="#route8A_ext" className="mex"/>

                    </g>

                    <g>
                        <title>#11 Большая кольцевая линия</title>
                        <g className="me p11">
                            <path d="
				M 330,576
				L 295.2,541.2 a 30,30 0 0,1 0,-42.4
				l 221.8,-221.8 q 10,-10 24,-10
				H 547

				M 379,415
				L 374,420 q -10,10 -24,10
				H 225
				"/>

                        </g>
                    </g>

                    <g>
                        <title>#15 Некрасовская линия</title>
                        <path id="route15" className="me p15" d="
			M 1278,994
			L 1300,1017 q 20,20 20,48
			L 1320,1134
			"/>
                        <g className="me p15 xb">
                            <path id="route15_uc" d="
				M 1166,764
				L 1215,813 q 10,10 10,24
				V 913 q 0,28 20,48
				L 1278,994
				"/>
                        </g>
                        <use xlinkHref="#route15_uc" className="mex"/>
                    </g>
                    <g>
                        <title>#15 Некрасовская линия (временный маршрут)</title>
                        <path id="route15_reroute" className="me p15" d="
			M 1048,525
			V 632 q 0,28 20,48
			l 102,102 c 8,8 16,2 24,10
			L 1215,813 q 10,10 10,24
			V 913 q 0,28 20,48
			L 1278,994
			"/>
                    </g>
                    <g>
                        <title>#10 Люблинско-Дмитровская линия</title>
                        <use xlinkHref="#route10" className="mebg"/>
                        <g className="me p10">
                            <g id="route10">
                                <path d="
					M 583,66
					V 121 q 0,14 10,24
					L 695,247 q 10,10 10,24
					L 705,411 q 0,14 10,24
					L 1002,722 q 10,10 10,24
					L 1012,860 q 0,14 10,24
					L 1092,954 q 10,10 10,24
					L 1102,990 q 0,14 -10,24
					L 1022,1084 q -10,10 -10,24
					L 1012,1215
					"/>
                                <g className="xb">
                                    <path id="route10_ext" d="
						M 583,66
						V -15
						"/>
                                </g>
                            </g>
                        </g>
                        <use xlinkHref="#route10_ext" className="mex"/>
                    </g>
                    <g>
                        <title>#6 Калужско-Рижская линия</title>
                        <use xlinkHref="#route6" className="mebg"/>
                        <g className="me p6">
                            <g id="route6">
                                <path d="
					M 848,33
					V 415 q 0,14 -10,24
					l -20,20 q -10,10 -10,24
					L 808,489

					M 808,648
					L 808,657 q 0,28 -20,48
					L 528,965 q -10,10 -10,24
					L 518,1175
					"/>

                            </g>
                        </g>

                    </g>
                    <g>
                        <title>#9 Серпуховско-Тимирязевская линия</title>
                        <use xlinkHref="#route9" className="mebg"/>
                        <g className="me p9">
                            <path id="route9" d="
				M 687,22
				L 687,57 q 0,14 -10,24
				L 585,173 q -10,10 -10,24
				L 575,290 q 0,14 10,24
				L 671,400 a 21.2,21.2 0 0,1 0,30
				L 671,430
				615,486
				615,657 q 0,14 10,24
				L 741,797 q 20,20 20,48
				L 761,1091 q 0,14 -10,24
				L 635,1231
				"/>
                        </g>
                    </g>
                    <g>
                        <title>#8 Калининско-Солнцевская линия (Будущий центральный участок)</title>
                        <use xlinkHref="#route8m" className="mebg"/>
                        <g className="me p8 xb">
                            <path id="route8m" d="
					M 752,735
					L 621,735 q -28,0 -48,-20
					L 431,578 q -20,-20 -48,-20
					H 330
					"/>
                        </g>
                        <use xlinkHref="#route8m" className="mex"/>
                    </g>
                    <g>
                        <title>#8 Калининская линия</title>
                        <use xlinkHref="#route8" className="mebg"/>
                        <g className="me p8">
                            <path id="route8" d="
				M 752,735
				L 1032,735 1202,565
				"/>
                        </g>
                    </g>
                    <g>
                        <title>#5 Кольцевая линия</title>
                        <g className="mebg">
                            <circle id="route5" cx="688" cy="583" r="260"/>
                        </g>
                        <use xlinkHref="#route5" className="me p5"/>
                    </g>
                    <g>
                        <title>#2 Замоскворецкая линия</title>
                        <use xlinkHref="#route2" className="mebg"/>
                        <g className="me p2">
                            <g id="route2">
                                <path d="
					M 333,104
					V 174 q 0,14 10,24
					L 510,365

					M 576,488
					L 768,680 q 10,10 10,24
					L 778,712 q 0,14 10,24
					L 938,885 q 10,10 10,24
					L 948,1131 q 0,14 10,24
					L 992,1189 q 10,10 24,10
					H 1052
					"/>
                            </g>
                        </g>
                        <use xlinkHref="#route2_ext" className="mex"/>
                    </g>
                    <g>
                        <title>#3 Арбатско-Покровская линия</title>
                        <use xlinkHref="#route3" className="mebg"/>
                        <g className="me p3">
                            <path id="route3" d="
				M 72,200
				L 72,493 q 0,14 10,24
				L 203,638 q 10,10 24,10
				L 547,648
				a 34.142,34.142 0 0,0 24.142,-10
				a 34.142,34.142 0 0,1 24.142,-10
				L 595,628
				L 877,628 q 28,0 48,-20
				L 1198,335
				"/>
                            <g className="xb">
                                <path id="route3x" d="
					M 1198,335 L 1228,305
					"/>
                            </g>
                        </g>
                        <use xlinkHref="#route3x" className="mex"/>
                    </g>
                    <g>
                        <title>#6 Калужско-Рижская линия</title>
                        <use xlinkHref="#route6over3" className="mebg"/>
                        <g className="me p6">
                            <path id="route6over3" d="M 808,489 V 648"/>
                        </g>
                    </g>
                    <g>
                        <title>#7 Таганско-Краснопресненская линия</title>
                        <use xlinkHref="#route7" className="mebg"/>
                        <g className="me p7">
                            <g id="route7">
                                <path d="
					M 284,188
					L 284,278 q 0,14 10,24
					L 452,460 q 10,10 24,10
					L 672,470 q 28,0 48,20
					L 778,548 q 20,20 20,48
					L 798,624 q 0,14 10,24
					L 1030,870 q 20,20 48,20
					L 1260,890 a 40,40 0 0,1 40,40
					L 1300,930 q 0,14 -10,24
					L 1185,1059
					"/>
                            </g>
                        </g>
                    </g>
                    <g>
                        <title>#2 Замоскворецкая линия</title>
                        <use xlinkHref="#route2over7" className="mebg"/>
                        <g className="me p2">
                            <path id="route2over7" d="
				M 510,365
				L 556,411 q 10,10 10,24
				L 566,464 q 0,14 10,24
				L 576,488
				"/>
                        </g>
                    </g>
                    <g>
                        <title>#1 Сокольническая линия</title>
                        <use xlinkHref="#route1" className="mebg"/>
                        <g className="me p1">
                            <g id="route1">
                                <path d="
					M 1038,215
					L 1058,235 a 30,30 0 0,1 0,42
					L 827,508
					768,508 q -14,0 -24,10
					L 211,1051 q -10,10 -10,24
					V 1182
					"/>
                                <g className="xb">
                                    <path id="route1_ext" d="
						M 201,1182 q 0,14 10,24
						l 45,45
						"/>
                                </g>
                            </g>
                        </g>
                        <use xlinkHref="#route1_ext" className="mex"/>
                    </g>
                    <g>
                        <title>#4 Филёвская линия</title>
                        <use xlinkHref="#route4" className="mebg"/>
                        <g className="me p4">
                            <path id="route4" d="
				M 82,430
				V 451 q 0,14 10,24
				L 255,638 q 20,20 48,20
				H 335 q 28,0 48,-20
				L 417,604 q 10,-10 24,-10
				L 585,594 q 14,0 24,10
				L 615,608
				M 413,608 a 10.6 10.6 0 0,1 -15,0
				L 398,608 307,517
				"/>
                        </g>
                    </g>
                    <g>
                        <title>#12 Бутовская линия</title>
                        <g id="route12_group" className="me p12">
                            <path id="route12" d="M 546,1175 L 608,1237 a 20,20 0 0,1 -14,34 H 354"/>
                        </g>
                    </g>
                </g>

                <g cursor="help">
                    <title>#14 Московское центральное кольцо</title>
                    <g className="p14" strokeWidth="5">
                        <path id="route14" style={{fill: 'none'}} d="
			M 367,400
			L 367,303 a 125,125 0 0,1 37,-88
			L 434,185 a 250,250 0 0,1 177,-73
			V 112
			H 855 a 250,250 0 0,1 250,250
			V 642 q 0,28 20,48
			L 1140,705 a 60.1,60.1 0 0,1 0,85
			L 1075,855 a 68,68 0 0,1 -48,20
			H 954 q -14,0 -24,10
			L 915,900 q -20,20 -48,20
			H 658 q -28,0 -48,-20
			L 592,882 q -20,-20 -48,-20
			H 465 q -28,0 -48,-20
			L 262,687 q -20,-20 -20,-48
			V 594 q 0,-28 20,-48
			L 357,451 q 10,-10 10,-24 z
			"/>
                    </g>
                    <use xlinkHref="#route14" className="p14_2" strokeWidth="1"/>
                </g>

                <g cursor="help">
                    <title>#13 Монорельс</title>
                    <path id="monorail" d="M 585,197 H 875"/>
                    <use xlinkHref="#monorail" style={{
                        fill: "none", strokeWidth: 4, stroke: "#fff"
                    }}/>
                    <use xlinkHref="#monorail" className="pm1"/>
                    <use xlinkHref="#stmonoi" x="585" y="197" id="Timiryazevskaya_mono"/>
                    <use xlinkHref="#stmonoi" x="633.5" y="197" id="Ulitsa_Milashenkova"/>
                    <use xlinkHref="#stmono" x="703" y="197" id="Teletsentr"/>
                    <use xlinkHref="#stmono" x="771" y="197" id="Ulitsa_Akademika_Koroleva"/>
                    <use xlinkHref="#stmonoi" x="837" y="197" id="Vystavochny_Tsentr"/>
                    <use xlinkHref="#stmono" x="875" y="197" id="Ulitsa_Sergeya_Eyzenshteyna"/>
                </g>
                <g id="interchange_group" style={{
                    opacity: 1
                }}>
                    <use xlinkHref="#ele-int" x="808" y="648" id="Kitay-Gorod"/>
                    <use xlinkHref="#ele-int" x="948" y="1028" id="Kashirskaya"/>
                    <use xlinkHref="#ele-int" x="227" y="648" id="Park_Pobedy"/>
                    <use xlinkHref="#ele-int" x="603" y="155" id="Petrovsko-Razumovskaya"/>
                    <use xlinkHref="#ele-int" x="1166" y="771" id="Nizhegorodskaya"/>
                    <use xlinkHref="#int2s" x="77" y="436" id="Kuntsevskaya-Mozhayskaya"/>
                    <use xlinkHref="#int2" x="677" y="415" id="Trubnaya-Tsvetnoy_Bulvar"/>
                    <use xlinkHref="#int2" x="761" y="1028" id="Sevastopolskaya-Kakhovskaya"/>
                    <use xlinkHref="#int2s" transform="translate(758,735)rotate(-90)"
                         id="Tretyakovskaya-Novokuznetskaya"/>
                    <use xlinkHref="#int2s" transform="translate(633,1233)rotate(90)"
                         id="Bulvar_Dmitriya_Donskogo-Ulitsa_Starokachalovskaya"/>
                    <use xlinkHref="#int2s" transform="translate(992,832)rotate(-90)"
                         id="Proletarskaya-Krestyanskaya_Zastava"/>
                    <use xlinkHref="#int2s" transform="translate(1012,755)rotate(-90)" id="Rimskaya-Ploshchad_Ilyicha"/>
                    <use xlinkHref="#int2" transform="translate(732,530)rotate(-90)" id="Kuznetsky_Most-Lubyanka"/>
                    <use xlinkHref="#int2" transform="translate(917,418)rotate(180)" id="Komsomolskaya"/>
                    <use xlinkHref="#int2" transform="translate(855,803)rotate(180)" id="Paveletskaya"/>
                    <use xlinkHref="#int2" transform="translate(761,832)rotate(90)" id="Dobryninskaya-Serpukhovskaya"/>
                    <use xlinkHref="#int2" transform="translate(688,583)rotate(103.1558)translate(260)rotate(-103.1558)"
                         id="Oktyabrskaya"/>

                    <use xlinkHref="#int2" transform="translate(486,748)rotate(90)" id="Park_Kultury"/>
                    <use xlinkHref="#int2s" transform="translate(465,470)rotate(90)"
                         id="Krasnopresnenskaya-Barrikadnaya"/>
                    <use xlinkHref="#int2" transform="translate(510,365)rotate(90)" id="Belorusskaya"/>
                    <use xlinkHref="#int2" transform="translate(587,316)rotate(90)"
                         id="Mendeleyevskaya-Novoslobodskaya"/>
                    <use xlinkHref="#int2s" transform="translate(828,363)rotate(-90)" id="Prospekt_Mira"/>
                    <use xlinkHref="#int2s" x="992" y="1189" id="Krasnogvardeyskaya-Zyablikovo"/>
                    <use xlinkHref="#int2" transform="translate(533,648)rotate(90)" id="Smolenskaya-Plyushchikha"/>
                    <use xlinkHref="#int2" x="518" y="1175" id="Novoyasenevskaya-Bittsevsky_Park"/>
                    <use xlinkHref="#int2" transform="translate(575,688)rotate(90)" id="Kropotkinskaya-Volkhonka"/>
                    <use xlinkHref="#int2" transform="translate(379,387)rotate(90)"
                         id="Polezhayevskaya-Khoroshyovskaya"/>
                    <use xlinkHref="#int2" transform="translate(483.5,338.5)rotate(-90)" id="Dinamo-Petrovsky_Park"/>
                    <use xlinkHref="#int2" transform="translate(575,267)rotate(180)" id="Savyolovskaya"/>
                    <use xlinkHref="#int2s" x="695" y="247" id="Maryina_Roshcha"/>
                    <use xlinkHref="#int2s" transform="translate(848,288)rotate(-90)" id="Rizhskaya"/>
                    <use xlinkHref="#int2" transform="translate(985,350)rotate(-90)" id="Sokolniki-Stromynka"/>

                    <use xlinkHref="#int2" transform="translate(1138,890)rotate(-90)" id="Tekstilshchiki"/>
                    <use xlinkHref="#int2" transform="translate(1083,945)rotate(180)" id="Pechatniki_Yuzhnoportovaya"/>
                    <use xlinkHref="#int2s" transform="translate(518,1008)rotate(90)" id="Kaluzhskaya-Vorontsovskaya"/>
                    <use xlinkHref="#int2" transform="translate(421,974)rotate(90)" id="Ulitsa_Novatorov"/>
                    <use xlinkHref="#int2" transform="translate(340,922)rotate(-90)" id="Prospekt_Vernadskogo"/>
                    <use xlinkHref="#int2" x="207.5" y="788.5" id="Michurinsky_Prospekt"/>

                    <use xlinkHref="#int2" x="1250" y="994" id="Lermontovsky_Prospekt-Kosino"/>

                    <use xlinkHref="#int2s" transform="translate(221,1202)rotate(-180)" id="Kommunarka"/>
                    <use xlinkHref="#int2s" x="577" y="916" id="Akademicheskaya"/>
                    <use xlinkHref="#int3-1" x="688.67" y="628" id="Okhotny_Ryad-Teatralnaya-Ploshchad_Revolyutsii"/>
                    <use xlinkHref="#int3-2" x="413" y="608" id="Kiyevskaya"/>
                    <use xlinkHref="#int3-2" x="926" y="607" id="Kurskaya-Chkalobskaya"/>
                    <use xlinkHref="#int3-2" transform="translate(576,488)rotate(-90)"
                         id="Tverskaya-Pushkinskaya-Chekhovskaya"/>
                    <use xlinkHref="#int3-2" x="808" y="489" id="Turgenevskaya-Chistye_Prudy-Sretensky_Bulvar"/>
                    <use xlinkHref="#int3-2" x="914" y="716" id="Taganskaya-Marksistskaya"/>
                    <use xlinkHref="#int3-5" x="330" y="540" id="Vystavochnaya-Delovoy_Tsentr"/>
                    <use xlinkHref="#int4" x="615" y="608"
                         id="Biblioteka_Imeni_Lenina-Arbatskaya_3-Aleksandrovsky_Sad-Borovitskaya"/>
                </g>
                <g id="station_nodes_group" style={{
                    opacity: 1
                }}>
                    <g id="station_nodes_route1">
                        <g transform="translate(1038,215)rotate(-45)" id="Bulvar_Rokossovskogo_1"
                           data-clone-id='Bulvar_Rokossovskogo_14'
                        >
                            <use xlinkHref="#termb"/>
                            <use xlinkHref="#term" className="p1"/>
                            <circle r="1" fill="#fff"/>
                        </g>
                        <g id="Cherkizovskaya">
                            <use x="1066.8" y="256" xlinkHref="#intst" className="f1"/>
                        </g>
                        <g transform="translate(1035,300)rotate(45)" id="Preobrazhenskaya_Ploshchad">
                            <use xlinkHref="#st" className="p1"/>
                        </g>
                        <g id="Sokolniki_1" data-clone-id='Sokolniki_11'
                        >
                            <use x="985" y="350" xlinkHref="#intst" className="f1"/>
                        </g>
                        <g transform="translate(950,385)rotate(45)" id="Krasnoselskaya">
                            <use xlinkHref="#st" className="p1"/>
                        </g>
                        <g id="Komsomolskaya_1" data-clone-id='Komsomolskaya_5'
                        >
                            <use x="917" y="418" xlinkHref="#intst" className="f1"/>
                        </g>
                        <g transform="translate(875,460)rotate(45)" id="Krasnye_Vorota">
                            <use xlinkHref="#st" className="p1"/>
                        </g>
                        <g id="Chistye_Prudy">
                            <use x="826" y="508" xlinkHref="#intst" className="f1"/>
                        </g>
                        <g transform="translate(732,530)rotate(180)" id="Lubyanka">
                            <use xlinkHref="#intst" className="f1"/>
                        </g>
                        <g id="Okhotny_Ryad">
                            <use x="688.67" y="573.33" xlinkHref="#intst" className="f1"/>
                        </g>
                        <g transform="translate(635,628)rotate(45)" id="Biblioteka_Imeni_Lenina">
                            <use xlinkHref="#intst" className="f1"/>
                        </g>
                        <g id="Kropotkinskaya">
                            <use x="575" y="688" xlinkHref="#intst" className="f1"/>
                        </g>
                        <g transform="translate(486,776)rotate(225)" id="Park_Kultury_1" data-clone-id='Park_Kultury_5'
                        >
                            <use xlinkHref="#intst" className="f1"/>
                        </g>
                        <g transform="translate(455,807)rotate(45)" id="Frunzenskaya">
                            <use xlinkHref="#st" className="p1"/>
                        </g>
                        <g transform="translate(427,835)rotate(45)" id="Sportivnaya_1">
                            <use xlinkHref="#stb"/>
                            <use xlinkHref="#st" className="p1"/>
                            <circle r="1" fill="#fff"/>
                        </g>
                        <g transform="translate(395,867)rotate(225)" id="Vorobyovy_Gory">
                            <use xlinkHref="#st" className="p1"/>
                        </g>
                        <g transform="translate(365,897)rotate(45)" id="Universitet">
                            <use xlinkHref="#st" className="p1"/>
                        </g>
                        <g transform="translate(340,922)rotate(225)" id="Prospekt_Vernadskogo_1">
                            <use xlinkHref="#intst" className="f1"/>
                        </g>
                        <g transform="translate(305,957)rotate(45)" id="Yugo-Zapadnaya">
                            <use xlinkHref="#st" className="p1"/>
                        </g>
                        <g transform="translate(275,987)rotate(45)" id="Troparyovo">
                            <use xlinkHref="#st" className="p1"/>
                        </g>
                        <g transform="translate(245,1017)rotate(45)" id="Rumyantsevo">
                            <use xlinkHref="#st" className="p1"/>
                        </g>
                        <g transform="translate(215,1047)rotate(45)" id="Salaryevo">
                            <use xlinkHref="#st" className="p1"/>
                        </g>
                        <g transform="translate(201,1086)rotate(180)" id="Filatov_Lug">
                            <use xlinkHref="#st" className="p1"/>
                        </g>
                        <g transform="translate(201,1115)rotate(180)" id="Prokshino">
                            <use xlinkHref="#st" className="p1"/>
                        </g>
                        <g transform="translate(201,1145)rotate(180)" id="Olkhovaya">
                            <use xlinkHref="#st" className="p1"/>
                        </g>
                        <g transform="translate(201,1182)rotate(180)" id="Kommunarka_1" data-clone-id='Kommunarka_16'
                        >
                            <use xlinkHref="#intst" className="f1"/>
                        </g>
                        <g transform="translate(256,1251)rotate(315)" id="Potapovo">
                            <use xlinkHref="#termx" className="p1"/>
                        </g>
                    </g>
                    <g id="station_nodes_route2">

                        <g transform="translate(333,104)rotate(180)" id="Khovrino">
                            <use xlinkHref="#term" className="p2"/>
                        </g>
                        <g id="Belomorskaya">
                            <use x="333" y="134" xlinkHref="#st" className="p2"/>
                        </g>
                        <g id="Rechnoy_Vokzal">
                            <use x="333" y="164" xlinkHref="#st" className="p2"/>
                        </g>
                        <g transform="translate(348,203)rotate(-45)" id="Vodny_Stadion">
                            <use xlinkHref="#st" className="p2"/>
                        </g>
                        <g transform="translate(390,245)rotate(-45)" id="Voykovskaya">
                            <use xlinkHref="#stb"/>
                            <use xlinkHref="#st" className="p2"/>
                            <circle r="1" fill="#fff"/>
                        </g>
                        <g transform="translate(413,268)rotate(-45)" id="Sokol">
                            <use xlinkHref="#st" className="p2"/>
                        </g>
                        <g transform="translate(441,296)rotate(-45)" id="Aeroport">
                            <use xlinkHref="#st" className="p2"/>
                        </g>
                        <g transform="translate(483.5,338.5)rotate(0)" id="Dinamo">
                            <use xlinkHref="#intst" className="f2"/>
                        </g>
                        <g transform="translate(510,365)rotate(45)" id="Belorusskaya_2" data-clone-id='Belorusskaya_5'
                        >
                            <use xlinkHref="#intst" className="f2"/>
                        </g>
                        <g id="Mayakovskaya">
                            <use x="566" y="438" xlinkHref="#st" className="p2"/>
                        </g>
                        <g transform="translate(576,488)rotate(180)" id="Tverskaya">
                            <use xlinkHref="#intst" className="f2"/>
                        </g>
                        <g transform="translate(688.67,600.67)rotate(-45)" id="Teatralnaya">
                            <use xlinkHref="#intst" className="f2"/>
                        </g>
                        <g transform="translate(778,715)rotate(225)" id="Novokuznetskaya">
                            <use xlinkHref="#intst" className="f2"/>
                        </g>
                        <g transform="translate(855,803)rotate(-45)" id="Paveletskaya_2" data-clone-id='Paveletskaya_5'
                        >
                            <use xlinkHref="#intst" className="f2"/>
                        </g>
                        <g transform="translate(927,874)rotate(135)" id="Avtozavodskaya_2"
                           data-clone-id='Avtozavodskaya_14'
                        >
                            <use xlinkHref="#stb"/>
                            <use xlinkHref="#st" className="p2"/>
                            <circle r="1" fill="#fff"/>
                        </g>
                        <g transform="translate(948,912)rotate(180)" id="Tekhnopark">
                            <use xlinkHref="#stb"/>
                            <use xlinkHref="#st" className="p2"/>
                            <circle r="1" fill="#fff"/>
                        </g>
                        <g transform="translate(948,950)rotate(180)" id="Kolomenskaya">
                            <use xlinkHref="#st" className="p2"/>
                        </g>
                        <g transform="translate(948,1065)rotate(180)" id="Kantemirovskaya">
                            <use xlinkHref="#st" className="p2"/>
                        </g>
                        <g transform="translate(948,1095)rotate(180)" id="Tsaritsyno">
                            <use xlinkHref="#st" className="p2"/>
                        </g>
                        <g transform="translate(948,1125)rotate(180)" id="Orekhovo">
                            <use xlinkHref="#st" className="p2"/>
                        </g>
                        <g transform="translate(962,1159)rotate(135)" id="Domodedovskaya">
                            <use xlinkHref="#st" className="p2"/>
                        </g>
                        <g transform="translate(992,1189)rotate(180)" id="Krasnogvardeyskaya">
                            <use xlinkHref="#intst" className="f2"/>
                        </g>
                        <g transform="translate(1052,1199)rotate(90)" id="Alma-Atinskaya">
                            <use xlinkHref="#term" className="p2"/>
                        </g>
                    </g>
                    <g id="station_nodes_route3">
                        <g id="Pyatnitskoye_Shosse">
                            <use x="72" y="200" xlinkHref="#term" className="p3"/>
                        </g>
                        <g id="Mitino">
                            <use x="72" y="230" xlinkHref="#st" className="p3"/>
                        </g>
                        <g id="Volokolamskaya">
                            <use x="72" y="260" xlinkHref="#st" className="p3"/>
                        </g>
                        <g id="Myakinino">
                            <use x="72" y="298" xlinkHref="#st" className="p3"/>
                        </g>
                        <g id="Strogino">
                            <use x="72" y="328" xlinkHref="#st" className="p3"/>
                        </g>
                        <g id="Krylatskoye">
                            <use x="72" y="358" xlinkHref="#st" className="p3"/>
                        </g>
                        <g id="Molodyozhnaya">
                            <use x="72" y="388" xlinkHref="#st" className="p3"/>
                        </g>
                        <g transform="translate(160,595)rotate(135)" id="Slavyansky_Bulvar">
                            <use xlinkHref="#st" className="p3"/>
                        </g>
                        <g transform="translate(227,648)rotate(135)" id="Park_Pobedy_3" data-clone-id="Park_Pobedy_8">
                            <use xlinkHref="#intst" className="f3"/>
                        </g>
                        <g transform="translate(227,648)rotate(-90)" id="Park_Pobedy_8">
                            <use xlinkHref="#intst-h" className="f8"/>
                        </g>
                        <path d="M 227,648 l -6,0 12,0 z" style={{
                            stroke: "#fff", strokeWidth: 1
                        }}/>
                        <g transform="translate(413,647)rotate(225)" id="Kiyevskaya_3" data-clone-id="Kiyevskaya_4"
                           data-clone-2-id="Kiyevskaya_5">
                            <use xlinkHref="#intst" className="f3"/>
                        </g>
                        <g transform="translate(533,648)rotate(225)" id="Smolenskaya_3">
                            <use xlinkHref="#intst" className="f3"/>
                        </g>
                        <g transform="translate(595,628)rotate(180)" id="Arbatskaya_3">
                            <use xlinkHref="#intst" className="f3"/>
                        </g>
                        <g transform="translate(688.67,628)rotate(-45)" id="Ploshchad_Revolyutsii">
                            <use xlinkHref="#intst" className="f3"/>
                        </g>
                        <g id="Khmelnitskaya">
                            <use x="826" y="4000" xlinkHref="#intst" className="f3"/>
                        </g>
                        <g id="Kurskaya_3" data-clone-id='Kurskaya_5' data-clone-2-id='Chkalovskaya'>
                            <use x="926" y="607" xlinkHref="#intst" className="f3"/>
                        </g>
                        <g transform="translate(966,567)rotate(45)" id="Baumanskaya">
                            <use xlinkHref="#st" className="p3"/>
                        </g>
                        <g id="Elektrozavodskaya_3" data-clone-id='Elektrozavodskaya_14'
                        >
                            <use x="1028" y="505" xlinkHref="#intst" className="f3"/>
                        </g>
                        <g transform="translate(1078,455)rotate(45)" id="Semyonovskaya">
                            <use xlinkHref="#st" className="p3"/>
                        </g>
                        <g transform="translate(1112,421)rotate(45)" id="Partizanskaya">
                            <use xlinkHref="#stb"/>
                            <use xlinkHref="#st" className="p3"/>
                            <circle r="1" fill="#fff"/>
                        </g>
                        <g transform="translate(1138,395)rotate(45)" id="Izmaylovskaya">
                            <use xlinkHref="#st" className="p3"/>
                        </g>
                        <g transform="translate(1168,365)rotate(45)" id="Pervomayskaya">
                            <use xlinkHref="#st" className="p3"/>
                        </g>
                        <g transform="translate(1198,335)rotate(45)" id="Shchyolkovskaya">
                            <use xlinkHref="#term" className="p3"/>
                        </g>
                        <g transform="translate(1228,305)rotate(225)" id="Golyanovo">
                            <use xlinkHref="#termx" className="p3"/>
                        </g>
                    </g>
                    <g id="station_nodes_route4">
                        <g transform="translate(307,517)rotate(-45)" id="Mezhdunarodnaya">
                            <use xlinkHref="#intst" className="f4"/>
                        </g>
                        <g transform="translate(330,540)rotate(-45)" id="Vystavochnaya">
                            <use xlinkHref="#intst" className="f4"/>
                        </g>
                        <g transform="translate(77,436)rotate(-45)" id="Kuntsevskaya_3" data-clone-id="Kuntsevskaya_4"
                           data-clone-2-id='Kuntsevskaya_11'
                        >
                            <use xlinkHref="#intst" className="f3"/>
                        </g>
                        <g transform="translate(77,436)rotate(180)" id="Kuntsevskaya_4">
                            <use xlinkHref="#intst-h" className="f4"/>
                        </g>
                        <path d="M 77,436 l 0,-6 0,12 z" style={{
                            stroke: "#fff", strokeWidth: 1
                        }}/>
                        <g transform="translate(107,490)rotate(-45)" id="Pionerskaya">
                            <use xlinkHref="#st" className="p4"/>
                        </g>
                        <g transform="translate(134,517)rotate(-45)" id="Filyovsky_Park">
                            <use xlinkHref="#st" className="p4"/>
                        </g>
                        <g transform="translate(161,544)rotate(-45)" id="Bagrationovskaya">
                            <use xlinkHref="#st" className="p4"/>
                        </g>
                        <g transform="translate(187,570)rotate(-45)" id="Fili">
                            <use xlinkHref="#st" className="p4"/>
                        </g>
                        <g transform="translate(242,625)rotate(-45)" id="Kutuzovskaya_4" data-clone-id='Kutuzovskaya_14'
                        >
                            <use xlinkHref="#intst" className="f4"/>
                        </g>
                        <g transform="translate(324,658)rotate(90)" id="Studencheskaya">
                            <use xlinkHref="#st" className="p4"/>
                        </g>
                        <g transform="translate(413,608)rotate(135)" id="Kiyevskaya_4">
                            <use xlinkHref="#intst" className="f4"/>
                        </g>
                        <g transform="translate(486,594)rotate(-90)" id="Smolenskaya_4">
                            <use xlinkHref="#st" className="p4"/>
                        </g>
                        <g transform="translate(563,594)rotate(-90)" id="Arbatskaya_4">
                            <use xlinkHref="#st" className="p4"/>
                        </g>
                        <g transform="translate(615,608)rotate(180)" id="Aleksandrovsky_Sad">
                            <use xlinkHref="#intst" className="f4"/>
                        </g>
                    </g>
                    <g id="station_nodes_route5">
                        {/* <use xlinkHref="#intst5" x="889" y="418" id="Komsomolskaya_5"/> */}
                        <g id="Komsomolskaya_5">
                            <use x="889" y="418" xlinkHref="#intst" className="f5"/>
                        </g>
                        {/* <use xlinkHref="#intst5" transform="translate(944,626)rotate(-45)" id="Kurskaya_5"/> */}
                        <g transform="translate(944,626)rotate(-45)" id="Kurskaya_5">
                            <use xlinkHref="#intst" className="f5"/>
                        </g>
                        {/* <use xlinkHref="#intst5" transform="translate(914,716)rotate(90)" id="Taganskaya_5"/> */}
                        <g transform="translate(914,716)rotate(90)" id="Taganskaya_5">
                            <use xlinkHref="#intst" className="f5"/>
                        </g>
                        {/* <use xlinkHref="#intst5" x="827" y="803" id="Paveletskaya_5"/> */}
                        <g id="Paveletskaya_5">
                            <use x="827" y="803" xlinkHref="#intst" className="f5"/>
                        </g>
                        {/* <use xlinkHref="#intst5" transform="translate(761,832)rotate(45)" id="Dobryninskaya"/> */}
                        <g transform="translate(761,832)rotate(45)" id="Dobryninskaya">
                            <use xlinkHref="#intst" className="f5"/>
                        </g>
                        {/* <use xlinkHref="#intst5" transform="translate(628.824,836.176)rotate(-90)" id="Oktyabrskaya_5"/> */}
                        <g transform="translate(628.824,836.176)rotate(-90)" id="Oktyabrskaya_5">
                            <use xlinkHref="#intst" className="f5"/>
                        </g>
                        {/* <use xlinkHref="#intst5" transform="translate(486,748)rotate(135)" id="Park_Kultury_5"/> */}
                        <g transform="translate(486,748)rotate(135)" id="Park_Kultury_5">
                            <use xlinkHref="#intst" className="f5"/>
                        </g>
                        {/* <use xlinkHref="#intst5" transform="translate(431,627)rotate(180)" id="Kiyevskaya_5"/> */}
                        <g transform="translate(431,627)rotate(180)" id="Kiyevskaya_5">
                            <use xlinkHref="#intst" className="f5"/>
                        </g>

                        {/* <use xlinkHref="#intst5" transform="translate(445,490)rotate(45)" id="Krasnopresnenskaya"/> */}
                        <g transform="translate(445,490)rotate(45)" id="Krasnopresnenskaya">
                            <use xlinkHref="#intst" className="f5"/>
                        </g>
                        {/* <use xlinkHref="#intst5" x="510" y="393" id="Belorusskaya_5"/> */}
                        <g id="Belorusskaya_5">
                            <use x="510" y="393" xlinkHref="#intst" className="f5"/>
                        </g>
                        {/* <use xlinkHref="#intst5" transform="translate(587,344)rotate(90)" id="Novoslobodskaya"/> */}
                        <g transform="translate(587,344)rotate(90)" id="Novoslobodskaya">
                            <use xlinkHref="#intst" className="f5"/>
                        </g>
                        {/* <use xlinkHref="#intst5" x="828" y="363" id="Prospekt_Mira_5"/> */}
                        <g id="Prospekt_Mira_5">
                            <use x="828" y="363" xlinkHref="#intst" className="f5"/>
                        </g>
                    </g>
                    <g id="station_nodes_route6">
                        <g id="Medvedkovo">
                            <use x="848" y="33" xlinkHref="#term" className="p6"/>
                        </g>
                        <g id="Babushkinskaya">
                            <use x="848" y="63" xlinkHref="#st" className="p6"/>
                        </g>
                        <g id="Sviblovo">
                            <use x="848" y="93" xlinkHref="#st" className="p6"/>
                        </g>
                        <g transform="translate(848,123)rotate(180)" id="Botanichesky_Sad_6"
                           data-clone-id='Botanichesky_Sad_14'
                        >
                            <use x="848" y="208" xlinkHref="#stb"/>
                            <use xlinkHref="#st" className="p6"/>
                            <circle r="1" fill="#fff"/>
                        </g>
                        <g id="VDNKh">
                            <use x="848" y="208" xlinkHref="#stb"/>
                            <use x="848" y="208" xlinkHref="#st" className="p6"/>

                            <circle r="1" fill="#fff"/>
                        </g>
                        <g id="Alekseyevskaya">
                            <use x="848" y="238" xlinkHref="#st" className="p6"/>
                        </g>
                        <g id="Rizhskaya_6" data-clone-id='Rizhskaya_11'
                        >
                            <use x="848" y="288" xlinkHref="#intst" className="f6"/>
                        </g>
                        <g id="Prospekt_Mira_6" data-clone-id='Prospekt_Mira_5'>
                            <use x="848" y="343" xlinkHref="#intst" className="f6"/>
                        </g>
                        <g transform="translate(848,395)rotate(180)" id="Sukharevskaya">
                            <use xlinkHref="#st" className="p6"/>
                        </g>
                        <g id="Turgenevskaya">
                            <use x="808" y="489" xlinkHref="#intst" className="f6"/>
                        </g>
                        <g id="Kitay-Gorod_6">
                            <use x="808" y="648" xlinkHref="#intst" className="f6"/>
                        </g>
                        <g transform="translate(656.824,836.176)rotate(-90)" id="Oktyabrskaya_6"
                           data-clone-id='Oktyabrskaya_5'
                        >
                            <use xlinkHref="#intst" className="f6"/>
                        </g>
                        <g transform="translate(637,856)rotate(45)" id="Shabolovskaya">
                            <use xlinkHref="#st" className="p6"/>
                        </g>
                        <g transform="translate(611,882)rotate(45)" id="Leninsky_Prospekt">
                            <use xlinkHref="#intst" className="f6"/>
                        </g>
                        <g transform="translate(577,916)rotate(225)" id="Akademicheskaya_6"
                           data-clone-id='Akademicheskaya_16'
                        >
                            <use xlinkHref="#intst" className="f6"/>
                        </g>
                        <g transform="translate(547,946)rotate(45)" id="Profsoyuznaya">
                            <use xlinkHref="#st" className="p6"/>
                        </g>
                        <g transform="translate(521,975)rotate(22)" id="Novye_Cheryomushki">
                            <use xlinkHref="#st" className="p6"/>
                        </g>
                        <g id="Kaluzhskaya">
                            <use x="518" y="1008" xlinkHref="#intst" className="f6"/>
                        </g>
                        <g id="Belyayevo">
                            <use x="518" y="1051" xlinkHref="#st" className="p6"/>
                        </g>
                        <g id="Konkovo">
                            <use x="518" y="1081" xlinkHref="#st" className="p6"/>
                        </g>
                        <g id="Tyoply_Stan">
                            <use x="518" y="1111" xlinkHref="#st" className="p6"/>
                        </g>
                        <g id="Yasenevo">
                            <use x="518" y="1141" xlinkHref="#st" className="p6"/>
                        </g>
                        <g transform="translate(518,1175)rotate(180)" id="Novoyasenevskaya">
                            <use xlinkHref="#intst" className="f6"/>
                        </g>
                    </g>
                    <g id="station_nodes_route7">
                        <g id="Planernaya">
                            <use x="284" y="188" xlinkHref="#term" className="p7"/>
                        </g>
                        <g transform="translate(284,218)rotate(180)" id="Skhodnenskaya">
                            <use xlinkHref="#st" className="p7"/>
                        </g>
                        <g transform="translate(284,248)rotate(180)" id="Tushinskaya">
                            <use xlinkHref="#st" className="p7"/>
                        </g>
                        <g transform="translate(284,278)rotate(180)" id="Spartak">
                            <use xlinkHref="#st" className="p7"/>
                        </g>
                        <g transform="translate(314,322)rotate(135)" id="Shchukinskaya">
                            <use xlinkHref="#st" className="p7"/>
                        </g>
                        <g transform="translate(344,352)rotate(135)" id="Oktyabrskoye_Pole">
                            <use xlinkHref="#stb"/>
                            <use xlinkHref="#st" className="p7"/>
                            <circle r="1" fill="#fff"/>
                        </g>
                        <g transform="translate(379,387)rotate(180)" id="Polezhayevskaya">
                            <use xlinkHref="#intst" className="f7"/>
                        </g>
                        <g transform="translate(409,417)rotate(-45)" id="Begovaya">
                            <use xlinkHref="#st" className="p7"/>
                        </g>
                        <g transform="translate(434,442)rotate(135)" id="Ulitsa_1905_Goda">
                            <use xlinkHref="#st" className="p7"/>
                        </g>
                        <g transform="translate(465,470)rotate(-45)" id="Barrikadnaya">
                            <use xlinkHref="#intst" className="f7"/>
                        </g>
                        <g transform="translate(595,470)rotate(-45)" id="Pushkinskaya">
                            <use xlinkHref="#intst" className="f7"/>
                        </g>
                        <g transform="translate(732,502)rotate(180)" id="Kuznetsky_Most">
                            <use xlinkHref="#intst" className="f7"/>
                        </g>
                        {/* <use xlinkHref="#intst7" x="808" y="648" id="Kitay-Gorod_7a"/> */}
                        <g id="Kitay-Gorod_7a">
                            <use x="808" y="648" xlinkHref="#intst" className="f7"/>
                        </g>
                        {/* <use xlinkHref="#intst-h6" transform="translate(808,648)rotate(180)" id="Kitay-Gorod_6a"/> */}
                        <g transform="translate(808,648)rotate(180)" id="Kitay-Gorod_6a" data-clone-id="Kitay-Gorod_7a">
                            <use xlinkHref="#intst-h" className="f6"/>
                        </g>
                        <path d="M 808,648 l 0,-6 0,12 z" style={{
                            stroke: "#fff", strokeWidth: 1
                        }}/>
                        <g id="Taganskaya_7" data-clone-id='Taganskaya_5'>
                            <use x="914" y="755" xlinkHref="#intst" className="f7"/>
                        </g>
                        <g transform="translate(992,832)rotate(180)" id="Proletarskaya">
                            <use xlinkHref="#intst" className="f7"/>
                        </g>
                        <g transform="translate(1027,867)rotate(-45)" id="Volgogradsky_Prospekt">
                            <use xlinkHref="#stb"/>
                            <use xlinkHref="#st" className="p7"/>
                            <circle r="1" fill="#fff"/>
                        </g>
                        <g transform="translate(1138,890)rotate(90)" id="Tekstilshchiki_7" data-clone-id='Pechatniki_11'
                        >
                            <use xlinkHref="#intst" className="f7"/>
                        </g>
                        <g transform="translate(1190,890)rotate(-90)" id="Kuzminki">
                            <use xlinkHref="#st" className="p7"/>
                        </g>
                        <g transform="translate(1241,890)rotate(-90)" id="Ryazansky_Prospekt">
                            <use xlinkHref="#st" className="p7"/>
                        </g>
                        <g transform="translate(1300,930)rotate(180)" id="Vykhino">
                            <use xlinkHref="#st" className="p7"/>
                        </g>
                        <g transform="translate(1250,994)rotate(180)" id="Lermontovsky_Prospekt">
                            <use xlinkHref="#intst" className="f7"/>
                        </g>
                        <g transform="translate(1215,1029)rotate(225)" id="Zhulebino">
                            <use xlinkHref="#st" className="p7"/>
                        </g>
                        <g transform="translate(1185,1059)rotate(225)" id="Kotelniki">
                            <use xlinkHref="#term" className="p7"/>
                        </g>
                    </g>
                    <g id="station_nodes_route8">
                        {/* <use xlinkHref="#term8x" x="74" y="1040" id="Vnukovo_8"/> */}
                        <g id="Vnukovo_8">
                            <use x="74" y="1040" xlinkHref="#termx" className="p8"/>
                        </g>
                        {/* <use xlinkHref="#st8x" x="74" y="1010" id="Pykhtino"/> */}
                        <g id="Pykhtino">
                            <use x="74" y="1010" xlinkHref="#stx" className="p8"/>
                            <use x="74" y="1010" xlinkHref="#stxm"/>
                        </g>
                        {/* <use xlinkHref="#term8" x="74" y="980" id="Rasskazovka"/> */}
                        <g id="Rasskazovka">
                            <use x="74" y="980" xlinkHref="#term" className="p8"/>
                        </g>
                        {/* <use xlinkHref="#st8" x="74" y="950" id="Novoperedelkino"/> */}
                        <g id="Novoperedelkino">
                            <use x="74" y="950" xlinkHref="#st" className="p8"/>
                        </g>
                        {/* <use xlinkHref="#st8" transform="translate(87,908)rotate(45)" id="Borovskoye_Shosse"/> */}
                        <g transform="translate(87,908)rotate(45)" id="Borovskoye_Shosse">
                            <use xlinkHref="#st" className="p8"/>
                        </g>
                        {/* <use xlinkHref="#st8" transform="translate(117,878)rotate(45)" id="Solntsevo"/> */}
                        <g transform="translate(117,878)rotate(45)" id="Solntsevo">
                            <use xlinkHref="#st" className="p8"/>
                        </g>
                        {/* <use xlinkHref="#st8" transform="translate(147,848)rotate(45)" id="Govorovo"/> */}
                        <g transform="translate(147,848)rotate(45)" id="Govorovo">
                            <use xlinkHref="#st" className="p8"/>
                        </g>
                        {/* <use xlinkHref="#st8" transform="translate(177,818)rotate(45)" id="Ozyornaya"/> */}
                        <g transform="translate(177,818)rotate(45)" id="Ozyornaya">
                            <use xlinkHref="#st" className="p8"/>
                        </g>
                        {/* <use xlinkHref="#intst8" x="207.5" y="788.5" id="Michurinsky_Prospekt_8"/> */}
                        <g id="Michurinsky_Prospekt_8">
                            <use x="207.5" y="788.5" xlinkHref="#intst" className="f8"/>
                        </g>
                        {/* <use xlinkHref="#st8" x="227" y="755" id="Ramenki"/> */}
                        <g id="Ramenki">
                            <use x="227" y="755" xlinkHref="#st" className="p8"/>
                        </g>
                        {/* <use xlinkHref="#st8" x="227" y="725" id="Lomonosovsky_Prospekt"/> */}
                        <g id="Lomonosovsky_Prospekt">
                            <use x="227" y="725" xlinkHref="#st" className="p8"/>
                        </g>
                        {/* <use xlinkHref="#st8" x="227" y="695" id="Minskaya"/> */}
                        <g id="Minskaya">
                            <use x="227" y="695" xlinkHref="#st" className="p8"/>
                        </g>
                        {/* <use xlinkHref="#intst8x" transform="translate(330,558)rotate(135)" id="Delovoy_Tsentr_8"/> */}
                        <g transform="translate(330,558)rotate(135)" id="Delovoy_Tsentr_8"
                           data-clone-id='Delovoy_Tsentr_11'
                        >
                            <use xlinkHref="#intst" className="f8x"/>
                        </g>
                        {/* <use xlinkHref="#st8x" transform="translate(432,579)rotate(-45)" id="Dorogomilovskaya"/> */}
                        <g transform="translate(432,579)rotate(-45)" id="Dorogomilovskaya">
                            <use xlinkHref="#stx" className="p8"/>
                            <use xlinkHref="#stxm"/>
                        </g>
                        {/* <use xlinkHref="#intst8x" transform="translate(533,676)rotate(135)" id="Plyushchikha"/> */}
                        <g transform="translate(533,676)rotate(135)" id="Plyushchikha">
                            <use xlinkHref="#intst" className="f8x"/>
                        </g>
                        {/* <use xlinkHref="#intst8x" x="575" y="716" id="Volkhonka"/> */}
                        <g id="Volkhonka">
                            <use x="575" y="716" xlinkHref="#intst" className="f8x"/>
                        </g>
                        {/* <use xlinkHref="#intst6" transform="translate(758,735)rotate(45)" id="Tretyakovskaya_8a"/> */}
                        <g transform="translate(758,735)rotate(45)" id="Tretyakovskaya_8a">
                            <use xlinkHref="#intst" className="f6"/>
                        </g>
                        {/* <use xlinkHref="#intst-h8" transform="translate(758,735)rotate(90)" id="Tretyakovskaya_6a"/> */}
                        <g transform="translate(758,735)rotate(90)" id="Tretyakovskaya_6a"
                           data-clone-id='Tretyakovskaya_8a'
                        >
                            <use xlinkHref="#intst-h" className="f8"/>
                        </g>
                        <path d="M 758,735 l -6,0 12,0 z" style={{
                            stroke: "#fff", strokeWidth: 1
                        }}/>
                        {/* <use xlinkHref="#intst8" transform="translate(932,735)rotate(-45)" id="Marksistskaya"/> */}
                        <g transform="translate(932,735)rotate(-45)" id="Marksistskaya">
                            <use xlinkHref="#intst" className="f8"/>
                        </g>
                        {/* <use xlinkHref="#intst8" x="1032" y="735" id="Ploshchad_Ilyicha"/> */}
                        <g id="Ploshchad_Ilyicha">
                            <use x="1032" y="735" xlinkHref="#intst" className="f8"/>
                        </g>
                        {/* <use xlinkHref="#intst8" x="1063.46" y="703.5" id="Aviamotornaya_8"/> */}
                        <g id="Aviamotornaya_8">
                            <use x="1063.46" y="703.5" xlinkHref="#intst" className="f8"/>
                        </g>

                        {/* <use xlinkHref="#st8o" transform="translate(1113,654)rotate(45)" id="Shosse_Entuziastov_8"/> */}
                        <g transform="translate(1113,654)rotate(45)" id="Shosse_Entuziastov_8"
                           data-clone-id='Shosse_Entuziastov_14'
                        >
                            <use xlinkHref="#stb"/>
                            <use xlinkHref="#st" className="p8"/>
                            <circle r="1" fill="#fff"/>
                        </g>
                        {/* <use xlinkHref="#st8" transform="translate(1142,625)rotate(45)" id="Perovo"/> */}
                        <g transform="translate(1142,625)rotate(45)" id="Perovo">
                            <use xlinkHref="#st" className="p8"/>
                        </g>
                        {/* <use xlinkHref="#st8" transform="translate(1172,595)rotate(45)" id="Novogireevo"/> */}
                        <g transform="translate(1172,595)rotate(45)" id="Novogireevo">
                            <use xlinkHref="#st" className="p8"/>
                        </g>
                        {/* <use xlinkHref="#term8" transform="translate(1202,565)rotate(45)" id="Novokosino"/> */}
                        <g transform="translate(1202,565)rotate(45)" id="Novokosino">
                            <use xlinkHref="#term" className="p8"/>
                        </g>
                    </g>
                    <g id="station_nodes_route9">
                        <g id="Altufyevo">
                            <use x="687" y="22" xlinkHref="#term" className="p9"/>
                        </g>
                        <g id="Bibirevo">
                            <use x="687" y="57" xlinkHref="#st" className="p9"/>
                        </g>
                        <g transform="translate(674,84)rotate(45)" id="Otradnoye">
                            <use xlinkHref="#st" className="p9"/>
                        </g>
                        <g transform="translate(640,118)rotate(45)" id="Vladykino_9" data-clone-id='Vladykino_14'
                        >
                            <use xlinkHref="#intst" className="f9"/>
                        </g>
                        <g transform="translate(575,197)rotate(180)" id="Timiryazevskaya">
                            <use xlinkHref="#stb"/>
                            <use xlinkHref="#st" className="p9"/>
                            <circle r="1" fill="#fff"/>
                        </g>
                        <g id="Dmitrovskaya">
                            <use x="575" y="227" xlinkHref="#st" className="p9"/>
                        </g>
                        <g transform="translate(575,267)rotate(225)" id="Savyolovskaya_9"
                           data-clone-id='Savyolovskaya_11'
                        >
                            <use xlinkHref="#intst" className="f9"/>
                        </g>
                        <g transform="translate(587,316)rotate(-90)" id="Mendeleyevskaya">
                            <use xlinkHref="#intst" className="f9"/>
                        </g>
                        <g transform="translate(677,415)rotate(180)" id="Tsvetnoy_Bulvar">
                            <use xlinkHref="#intst" className="f9"/>
                        </g>
                        <g id="Chekhovskaya">
                            <use x="615" y="488" xlinkHref="#intst" className="f9"/>
                        </g>
                        <g transform="translate(615,648)rotate(45)" id="Borovitskaya">
                            <use xlinkHref="#intst" className="f9"/>
                        </g>
                        <g transform="translate(708,764)rotate(135)" id="Polyanka">
                            <use xlinkHref="#st" className="p9"/>
                        </g>
                        <g id="Serpukhovskaya">
                            <use x="761" y="860" xlinkHref="#intst" className="f9"/>
                        </g>
                        <g id="Tulskaya">
                            <use x="761" y="895" xlinkHref="#st" className="p9"/>
                        </g>
                        <g id="Nagatinskaya">
                            <use x="761" y="932" xlinkHref="#stb"/>
                            <use x="761" y="932" xlinkHref="#st" className="p9"/>
                            <circle r="1" fill="#fff"/>
                        </g>
                        <g id="Nagornaya">
                            <use x="761" y="962" xlinkHref="#st" className="p9"/>
                        </g>
                        <g id="Nakhimovsky_Prospekt">
                            <use x="761" y="992" xlinkHref="#st" className="p9"/>
                        </g>
                        <g transform="translate(761,1028)rotate(225)" id="Sevastopolskaya">
                            <use xlinkHref="#intst" className="f9"/>
                        </g>
                        <g id="Chertanovskaya">
                            <use x="761" y="1082" xlinkHref="#st" className="p9"/>
                        </g>
                        <g transform="translate(751,1115)rotate(45)" id="Yuzhnaya">
                            <use xlinkHref="#st" className="p9"/>
                        </g>
                        <g transform="translate(725,1141)rotate(45)" id="Prazhskaya">
                            <use xlinkHref="#st" className="p9"/>
                        </g>
                        <g transform="translate(695,1171)rotate(45)" id="Ulitsa_Akademika_Yangelya">
                            <use xlinkHref="#st" className="p9"/>
                        </g>
                        <g transform="translate(665,1201)rotate(45)" id="Annino">
                            <use xlinkHref="#st" className="p9"/>
                        </g>
                        <g transform="translate(633,1233)rotate(45)" id="Bulvar_Dmitriya_Donskogo">
                            <use xlinkHref="#intst" className="f9"/>
                        </g>
                    </g>
                    <g id="station_nodes_route10">
                        <g transform="translate(583,-15)rotate(180)" id="Fiztekh">
                            <use xlinkHref="#termx" className="p10"/>
                        </g>
                        <g transform="translate(583,12)rotate(180)" id="Lianozovo">
                            <use xlinkHref="#stx" className="p10"/>
                            <use xlinkHref="#stxm"/>
                        </g>
                        <g transform="translate(583,39)rotate(180)" id="Ulitsa_800_Letiya_Moskvy">
                            <use xlinkHref="#stx" className="p10"/>
                            <use xlinkHref="#stxm"/>
                        </g>
                        <g transform="translate(583,66)rotate(180)" id="Seligerskaya">
                            <use xlinkHref="#term" className="p10"/>
                        </g>
                        <g transform="translate(583,93)rotate(180)" id="Verkhniye_Likhobory">
                            <use xlinkHref="#st" className="p10"/>
                        </g>
                        <g transform="translate(583,121)rotate(180)" id="Okruzhnaya_10" data-clone-id='Okruzhnaya_14'
                        >
                            <use xlinkHref="#stb"/>
                            <use xlinkHref="#st" className="p10"/>
                            <circle r="1" fill="#fff"/>
                        </g>
                        <g id="Petrovsko-Razumovskaya_9" data-clone-id='Petrovsko-Razumovskaya_10'
                        >
                            <use x="603" y="155" xlinkHref="#intst" className="f9"/>
                        </g>
                        <g transform="translate(603,155)rotate(180)" id="Petrovsko-Razumovskaya_10">
                            <use xlinkHref="#intst-h" className="f10"/>
                        </g>
                        <path d="M 603,155 l 0,-6 0,12 z" style={{
                            stroke: "#fff", strokeWidth: 1
                        }}/>
                        <g transform="translate(633.5,185.5)rotate(-45)" id="Fonvizinskaya">
                            <use xlinkHref="#stb"/>
                            <use xlinkHref="#st" className="p10"/>
                            <circle r="1" fill="#fff"/>
                        </g>
                        <g transform="translate(665,217)rotate(-45)" id="Butyrskaya">
                            <use xlinkHref="#st" className="p10"/>
                        </g>
                        <g transform="translate(695,247)" id="Maryina_Roshcha_10" data-clone-id='Maryina_Roshcha_11'
                        >
                            <use xlinkHref="#intst" className="f10"/>
                        </g>
                        <g id="Dostoyevskaya">
                            <use x="705" y="296" xlinkHref="#st" className="p10"/>
                        </g>
                        <g id="Trubnaya">
                            <use x="705" y="415" xlinkHref="#intst" className="f10"/>
                        </g>
                        <g id="Sretensky_Bulvar">
                            <use x="808" y="528" xlinkHref="#intst" className="f10"/>
                        </g>
                        <g id="Chkalovskaya">
                            <use xlinkHref="#intst" x="926" y="646" className="f10"/>
                        </g>
                        <g transform="translate(1012,755)rotate(45)" id="Rimskaya">
                            <use xlinkHref="#intst" className="f10"/>
                        </g>
                        <g transform="translate(1012,812)rotate(-45)" id="Krestyanskaya_Zastava">
                            <use xlinkHref="#intst" className="f10"/>
                        </g>
                        <g transform="translate(1012,860)rotate(180)" id="Dubrovka_10" data-clone-id='Dubrovka_14'
                        >
                            <use xlinkHref="#stb"/>
                            <use xlinkHref="#st" className="p10"/>
                            <circle r="1" fill="#fff"/>
                        </g>
                        <g transform="translate(1042,904)rotate(135)" id="Kozhukhovskaya">
                            <use xlinkHref="#stb"/>
                            <use xlinkHref="#st" className="p10"/>
                            <circle r="1" fill="#fff"/>
                        </g>
                        <g id="Pechatniki_10">
                            <use x="1083" y="945" xlinkHref="#intst" className="f10"/>
                        </g>
                        <g transform="translate(1102,990)rotate(180)" id="Volzhskaya">
                            <use xlinkHref="#st" className="p10"/>
                        </g>
                        <g transform="translate(1067,1040)rotate(225)" id="Lyublino">
                            <use xlinkHref="#st" className="p10"/>
                        </g>
                        <g transform="translate(1037,1070)rotate(45)" id="Bratislavskaya">
                            <use xlinkHref="#st" className="p10"/>
                        </g>
                        <g id="Marino">
                            <use x="1012" y="1109" xlinkHref="#st" className="p10"/>
                        </g>
                        <g id="Borisovo">
                            <use x="1012" y="1139" xlinkHref="#st" className="p10"/>
                        </g>
                        <g id="Shipilovskaya">
                            <use x="1012" y="1169" xlinkHref="#st" className="p10"/>
                        </g>
                        <g transform="translate(1012,1209)rotate(180)" id="Zyablikovo">
                            <use xlinkHref="#intst" className="f10x"/>
                        </g>
                    </g>
                    <g id="station_nodes_route11">
                        {/* <use xlinkHref="#intst11x" transform="translate(97,456)rotate(270)" id="Kuntsevskaya_11"/> */}
                        <g transform="translate(97,456)rotate(270)" id="Kuntsevskaya_11">
                            <use xlinkHref="#intst" className="f10x"/>
                        </g>
                        {/* <use xlinkHref="#st11x" transform="translate(165,430)rotate(90)" id="Terekhovo"/> */}
                        <g transform="translate(165,430)rotate(90)" id="Terekhovo">
                            <use xlinkHref="#stx" className="p11"/>
                            <use xlinkHref="#stxm"/>
                        </g>
                        {/* <use xlinkHref="#term11" transform="translate(225,430)rotate(-90)" id="Mnyovniki"/> */}
                        <g transform="translate(225,430)rotate(-90)" id="Mnyovniki">
                            <use xlinkHref="#term" className="p11"/>
                        </g>
                        {/* <use xlinkHref="#st11" transform="translate(285,430)rotate(90)" id="Narodnoe_Opolcheniye"/> */}
                        <g transform="translate(285,430)rotate(90)" id="Narodnoe_Opolcheniye">
                            <use xlinkHref="#st" className="p11"/>
                        </g>
                        {/* <use xlinkHref="#intst11" transform="translate(330,576)rotate(180)" id="Delovoy_Tsentr_11"/> */}
                        <g transform="translate(330,576)rotate(180)" id="Delovoy_Tsentr_11">
                            <use xlinkHref="#intst" className="f11"/>
                        </g>
                        {/* <use xlinkHref="#st11o" transform="translate(309,485)rotate(225)" id="Shelepikha_11"/> */}
                        <g transform="translate(309,485)rotate(225)" id="Shelepikha_11" data-clone-id='Shelepikha_14'
                        >
                            <use xlinkHref="#stb"/>
                            <use xlinkHref="#st" className="p11"/>
                            <circle r="1" fill="#fff"/>
                        </g>
                        {/* <use xlinkHref="#intst11" transform="translate(379,415)rotate(180)" id="Khoroshyovskaya"/> */}
                        <g transform="translate(379,415)rotate(180)" id="Khoroshyovskaya">
                            <use xlinkHref="#intst" className="f11"/>
                        </g>
                        {/* <use xlinkHref="#st11" transform="translate(432,362)rotate(45)" id="CSKA"/> */}
                        <g transform="translate(432,362)rotate(45)" id="CSKA">
                            <use xlinkHref="#st" className="p11"/>
                        </g>
                        {/* <use xlinkHref="#intst11" transform="translate(483.5,310.5)rotate(0)" id="Petrovsky_Park"/> */}
                        <g transform="translate(483.5,310.5)rotate(0)" id="Petrovsky_Park">
                            <use xlinkHref="#intst" className="f11"/>
                        </g>
                        {/* <use xlinkHref="#intst11" transform="translate(547,267)rotate(225)" id="Savyolovskaya_11"/> */}
                        <g transform="translate(547,267)rotate(225)" id="Savyolovskaya_11">
                            <use xlinkHref="#intst" className="f11"/>
                        </g>
                        {/* <use xlinkHref="#intst11x" transform="translate(715,267)rotate(-90)" id="Maryina_Roshcha_11"/> */}
                        <g transform="translate(715,267)rotate(-90)" id="Maryina_Roshcha_11">
                            <use xlinkHref="#intst" className="f11x"/>
                        </g>
                        {/* <use xlinkHref="#intst11x" transform="translate(868,268)rotate(90)" id="Rizhskaya_11"/> */}
                        <g transform="translate(868,268)rotate(90)" id="Rizhskaya_11">
                            <use xlinkHref="#intst" className="f11x"/>
                        </g>
                        {/* <use xlinkHref="#intst11x" transform="translate(985,322)rotate(45)" id="Sokolniki_11"/> */}
                        <g transform="translate(985,322)rotate(45)" id="Sokolniki_11">
                            <use xlinkHref="#intst" className="f11x"/>
                        </g>
                        {/* <use xlinkHref="#intst15" transform="translate(1048,525)rotate(315)" id="Elektrozavodskaya_14"/> */}
                        <g transform="translate(1048,525)rotate(315)" id="Elektrozavodskaya_14">
                            <use xlinkHref="#intst" className="f15"/>
                        </g>
                        {/* <use xlinkHref="#st15" x="1048" y="592" id="Lefortovo_15"/> */}
                        <g id="Lefortovo_15">
                            <use x="1048" y="592" xlinkHref="#st" className="p15"/>
                        </g>
                        {/* <use xlinkHref="#intst15" x="1091.46" y="703.5" id="Aviamotornaya_15"/> */}
                        <g id="Aviamotornaya_15" data-clone-id='Aviamotornaya_8'
                        >
                            <use x="1091.46" y="703.5" xlinkHref="#intst" className="f15"/>
                        </g>
                        {/* <use xlinkHref="#intst11x" transform="translate(1138,862)rotate(90)" id="Tekstilshchiki_11"/> */}
                        <g transform="translate(1138,862)rotate(90)" id="Tekstilshchiki_11">
                            <use xlinkHref="#intst" className="f11x"/>
                        </g>
                        {/* <use xlinkHref="#intst11x" x="1055" y="945" id="Pechatniki_11"/> */}
                        <g transform="translate(1138,862)rotate(90)" id="Pechatniki_11">
                            <use xlinkHref="#intst" className="f11x"/>
                        </g>

                        {/* <use xlinkHref="#st11x" transform="translate(1017,983)rotate(225)" id="Nagatinsky_Zaton"/> */}
                        <g transform="translate(1017,983)rotate(225)" id="Nagatinsky_Zaton">
                            <use xlinkHref="#stx" className="p11"/>
                            <use xlinkHref="#stxm"/>
                        </g>
                        {/* <use xlinkHref="#st11x" transform="translate(990,1010)rotate(225)" id="Klenovy_Bulvar"/> */}
                        <g transform="translate(990,1010)rotate(225)" id="Klenovy_Bulvar">
                            <use xlinkHref="#stx" className="p11"/>
                            <use xlinkHref="#stxm"/>
                        </g>
                        {/* <use xlinkHref="#st11x" transform="translate(642,1028)rotate(90)" id="Zyuzino"/> */}
                        <g transform="translate(642,1028)rotate(90)" id="Zyuzino">
                            <use xlinkHref="#stx" className="p11"/>
                            <use xlinkHref="#stxm"/>
                        </g>
                        {/* <use xlinkHref="#intst11x" transform="translate(498,1028)rotate(135)" id="Vorontsovskaya"/> */}
                        <g transform="translate(498,1028)rotate(135)" id="Vorontsovskaya">
                            <use xlinkHref="#intst" className="f11x"/>
                        </g>
                        {/* <use xlinkHref="#intst11x" transform="translate(421,974)rotate(45)" id="Ulitsa_Novatorov_11"/> */}
                        <g transform="translate(421,974)rotate(45)" id="Ulitsa_Novatorov_11">
                            <use xlinkHref="#intst" className="f11x"/>
                        </g>
                        {/* <use xlinkHref="#intst11x" transform="translate(340,894)rotate(135)" id="Prospekt_Vernadskogo_11"/> */}
                        <g transform="translate(421,974)rotate(45)" id="Prospekt_Vernadskogo_11">
                            <use xlinkHref="#intst" className="f11x"/>
                        </g>
                        {/* <use xlinkHref="#intst11x" x="235.5" y="788.5" id="Michurinsky_Prospekt_11"/> */}
                        <g transform="translate(421,974)rotate(45)" id="Michurinsky_Prospekt_11">
                            <use x="235.5" y="788.5" xlinkHref="#intst" className="f11x"/>
                        </g>
                        {/* <use xlinkHref="#st11x" transform="translate(171,724)rotate(135)" id="Aminyevskaya"/> */}
                        <g transform="translate(171,724)rotate(135)" id="Aminyevskaya">
                            <use xlinkHref="#stx" className="p11"/>
                            <use xlinkHref="#stxm"/>
                        </g>

                        {/* <use xlinkHref="#st11x" transform="translate(131,684)rotate(135)" id="Davydkovo"/> */}
                        <g transform="translate(131,684)rotate(135)" id="Davydkovo">
                            <use xlinkHref="#stx" className="p11"/>
                            <use xlinkHref="#stxm"/>
                        </g>
                        {/* <use xlinkHref="#intst2" transform="translate(948,1028)rotate(135)" id="Kashirskaya_2"/> */}
                        <g transform="translate(948,1028)rotate(135)" id="Kashirskaya_2" data-clone-id="Kashirskaya_11">
                            <use xlinkHref="#intst" className="f2"/>
                        </g>

                        {/* <use xlinkHref="#intst-h11" x="948" y="1028" id="Kashirskaya_11"/> */}
                        <g id="Kashirskaya_11">
                            <use x="948" y="1028" xlinkHref="#intst-h" className="f11"/>
                        </g>

                        <path d="M 948,1028 l 0,-6 0,12 z" style={{
                            stroke: "#fff", strokeWidth: 1
                        }}/>
                        {/* <use xlinkHref="#intst11x" transform="translate(789,1028)rotate(90)" id="Kakhovskaya_11"/> */}
                        <g transform="translate(789,1028)rotate(90)" id="Kakhovskaya_11">
                            <use xlinkHref="#intst" className="f11x"/>
                        </g>
                        {/* <use xlinkHref="#st11x" transform="translate(865,1028)rotate(-90)" id="Varshavskaya"/> */}
                        <g transform="translate(865,1028)rotate(-90)" id="Varshavskaya">
                            <use xlinkHref="#stx" className="p11"/>
                            <use xlinkHref="#stxm"/>
                        </g>
                    </g>
                    <g id="station_nodes_route12">
                        <g id="Bittsevsky_Park">
                            <use x="546" y="1175" xlinkHref="#intst" className="f12"/>
                        </g>
                        <g transform="translate(584,1213) rotate(135)" id="Lesoparkovaya">
                            <use xlinkHref="#st" className="p12"/>
                        </g>
                        <g transform="translate(613,1253)rotate(45)" id="Ulitsa_Starokachalovskaya">
                            <use xlinkHref="#intst" className="f12"/>
                        </g>
                        <g transform="translate(589,1271)rotate(90)" id="Ulitsa_Skobelevskaya">
                            <use xlinkHref="#st" className="p12"/>
                        </g>
                        <g transform="translate(514,1271)rotate(90)" id="Bulvar_Admirala_Ushakova">
                            <use xlinkHref="#st" className="p12"/>
                        </g>
                        <g transform="translate(434,1271)rotate(-90)" id="Ulitsa_Gorchakova">
                            <use xlinkHref="#st" className="p12"/>
                        </g>
                        <g transform="translate(354,1271)rotate(90)" id="Buninskaya_Alleya">
                            <use xlinkHref="#term" className="p12"/>
                        </g>

                    </g>
                    <g id="station_nodes_route15">
                        <g transform="translate(1166,771)rotate(315)" id="Nizhegorodskaya_15"
                           data-clone-id='Nizhegorodskaya_14'
                        >
                            <use xlinkHref="#intst" className="f15"/>
                        </g>
                        <g transform="translate(1209,807)rotate(-45)" id="Stakhanovskaya">
                            <use xlinkHref="#st" className="p15"/>
                        </g>
                        <g transform="translate(1225,844)rotate(180)" id="Okskaya">
                            <use xlinkHref="#st" className="p15"/>
                        </g>
                        <g transform="translate(1245,961)rotate(135)" id="Yugo-Vostochnaya">
                            <use xlinkHref="#st" className="p15"/>
                        </g>
                        <g id="Kosino">
                            <use x="1278" y="994" xlinkHref="#intst" className="f15"/>
                        </g>
                        <g transform="translate(1320,1076)rotate(180)" id="Ulitsa_Dmitriyevskogo">
                            <use xlinkHref="#st" className="p15"/>
                        </g>
                        <g transform="translate(1320,1106)rotate(180)" id="Lukhmanovskaya">
                            <use xlinkHref="#st" className="p15"/>
                        </g>
                        <g id="Nekrasova">
                            <use x="1320" y="1136" xlinkHref="#term" className="p15"/>
                        </g>
                    </g>
                    <g id="station_nodes_route16">
                        {/* <use xlinkHref="#term16x" transform="translate(700,936)rotate(270)" id="Sevastopolskaya"/> */}
                        <g transform="translate(700,936)rotate(270)" id="Sevastopolski">
                            <use xlinkHref="#termx" className="p16"/>
                        </g>
                        {/* <use xlinkHref="#intst16x" transform="translate(597,936)rotate(225)" id="Akademicheskaya_16"/> */}
                        <g transform="translate(597,936)rotate(225)" id="Akademicheskaya_16">
                            <use xlinkHref="#intst" className="f16x"/>
                        </g>
                        {/* <use xlinkHref="#st16x" transform="translate(471,952)rotate(225)" id="Ulitsa_Stroiteley"/> */}
                        <g transform="translate(471,952)rotate(225)" id="Ulitsa_Stroiteley">
                            <use xlinkHref="#stx" className="p16"/>
                            <use xlinkHref="#stxm"/>
                        </g>
                        {/* <use xlinkHref="#intst16x" transform="translate(421,1002)rotate(-45)" id="Ulitsa_Novatorov_16"/> */}
                        <g transform="translate(421,1002)rotate(-45)" id="Ulitsa_Novatorov_16"
                           data-clone-id='Prospekt_Vernadskogo_11'
                        >
                            <use xlinkHref="#intst" className="f16x"/>
                        </g>
                        {/* <use xlinkHref="#st16x" transform="translate(371,1052)rotate(45)" id="Universitet_Druzhby_Narodov"/> */}
                        <g transform="translate(371,1052)rotate(45)" id="Universitet_Druzhby_Narodov">
                            <use xlinkHref="#stx" className="p16"/>
                            <use xlinkHref="#stxm"/>
                        </g>
                        {/* <use xlinkHref="#st16x" transform="translate(341,1082)rotate(45)" id="Ulitsa_Generala_Tyuleneva"/> */}
                        <g transform="translate(341,1082)rotate(45)" id="Ulitsa_Generala_Tyuleneva">
                            <use xlinkHref="#stx" className="p16"/>
                            <use xlinkHref="#stxm"/>
                        </g>
                        {/* <use xlinkHref="#st16x" transform="translate(311,1112)rotate(45)" id="Tyutchevskaya"/> */}
                        <g transform="translate(311,1112)rotate(45)" id="Tyutchevskaya">
                            <use xlinkHref="#stx" className="p16"/>
                            <use xlinkHref="#stxm"/>
                        </g>

                        {/* <use xlinkHref="#st16x" transform="translate(281,1142)rotate(45)" id="Mamyri"/> */}
                        <g transform="translate(281,1142)rotate(45)" id="Mamyri">
                            <use xlinkHref="#stx" className="p16"/>
                            <use xlinkHref="#stxm"/>
                        </g>
                        {/* <use xlinkHref="#st16x" transform="translate(251,1172)rotate(45)" id="Bachurinskaya"/> */}
                        <g transform="translate(251,1172)rotate(45)" id="Bachurinskaya">
                            <use xlinkHref="#stx" className="p16"/>
                            <use xlinkHref="#stxm"/>
                        </g>
                        {/* <use xlinkHref="#intst16x" transform="translate(221,1202)rotate(225)" id="Kommunarka_16"/> */}
                        <g transform="translate(221,1202)rotate(225)" id="Kommunarka_16">
                            <use xlinkHref="#intst" className="f16x"/>
                        </g>

                    </g>
                    <g id="stations_nodes_route14">
                        {/* <use xlinkHref="#st14ih" x="299" y="509" id="Delovoy_Tsentr_14"/> */}
                        <g transform="translate(299,509)" id="Delovoy_Tsentr_14">
                            <circle cx="0" cy="0" r="5" fill="#000"/>
                            <circle cx="0" cy="0" r="3" className="f14_2"/>
                            <circle cx="0" cy="0" r="1.5" fill="#fff"/>
                        </g>
                        {/* <use xlinkHref="#st14i" x="319" y="489" id="Shelepikha_14"/> */}
                        <g transform="translate(319,489)" id="Shelepikha_14">
                            <circle cx="0" cy="0" r="5" className="f14" id="st14x"/>
                            <circle cx="0" cy="0" r="3" className="f14_2"/>
                            <circle cx="0" cy="0" r="1.5" fill="#fff"/>
                        </g>
                        {/* <use xlinkHref="#st14i" x="367" y="400" id="Khoroshyovo_14"/> */}
                        <g transform="translate(367,400)" id="Khoroshyovo_14">
                            <circle cx="0" cy="0" r="5" className="f14" id="st14x"/>
                            <circle cx="0" cy="0" r="3" className="f14_2"/>
                            <circle cx="0" cy="0" r="1.5" fill="#fff"/>
                        </g>
                        {/* <use xlinkHref="#st14i" x="367" y="352" id="Zorge"/> */}
                        <g transform="translate(367,352)" id="Zorge">
                            <circle cx="0" cy="0" r="5" className="f14" id="st14x"/>
                            <circle cx="0" cy="0" r="3" className="f14_2"/>
                            <circle cx="0" cy="0" r="1.5" fill="#fff"/>
                        </g>
                        {/* <use xlinkHref="#st14i" x="367" y="329" id="Panfilovskaya"/> */}
                        <g transform="translate(367,329)" id="Panfilovskaya">
                            <circle cx="0" cy="0" r="5" className="f14" id="st14x"/>
                            <circle cx="0" cy="0" r="3" className="f14_2"/>
                            <circle cx="0" cy="0" r="1.5" fill="#fff"/>
                        </g>
                        {/* <use xlinkHref="#st14i" x="368" y="290" id="Streshnevo"/> */}
                        <g transform="translate(368,290)" id="Streshnevo">
                            <circle cx="0" cy="0" r="5" className="f14" id="st14x"/>
                            <circle cx="0" cy="0" r="3" className="f14_2"/>
                            <circle cx="0" cy="0" r="1.5" fill="#fff"/>
                        </g>
                        {/* <use xlinkHref="#st14i" transform="translate(492,303)rotate(215.31)translate(125)" id="Baltiyskaya"/> */}
                        <g transform="translate(492,303)rotate(215.31)translate(125)" id="Baltiyskaya">
                            <circle cx="0" cy="0" r="5" className="f14" id="st14x"/>
                            <circle cx="0" cy="0" r="3" className="f14_2"/>
                            <circle cx="0" cy="0" r="1.5" fill="#fff"/>
                        </g>
                        {/* <use xlinkHref="#st14" x="419" y="200" id="Koptevo_14"/> */}
                        <g transform="translate(419,200)" id="Koptevo_14">
                            <circle cx="0" cy="0" r="5" className="f14" id="st14x"/>
                            <circle cx="0" cy="0" r="3" className="f14_2"/>
                        </g>
                        {/* <use xlinkHref="#st14" x="479" y="150" id="Likhobory"/> */}
                        <g transform="translate(479,150)" id="Likhobory">
                            <circle cx="0" cy="0" r="5" className="f14" id="st14x"/>
                            <circle cx="0" cy="0" r="3" className="f14_2"/>
                        </g>
                        {/* <use xlinkHref="#st14i" x="595" y="112" id="Okruzhnaya_14"/> */}
                        <g transform="translate(595,112)" id="Okruzhnaya_14">
                            <circle cx="0" cy="0" r="5" className="f14" id="st14x"/>
                            <circle cx="0" cy="0" r="3" className="f14_2"/>
                            <circle cx="0" cy="0" r="1.5" fill="#fff"/>
                        </g>
                        {/* <use xlinkHref="#st14ih" x="660" y="112" id="Vladykino_14"/> */}
                        <g transform="translate(660,112)" id="Vladykino_14">
                            <circle cx="0" cy="0" r="5" fill="#000"/>
                            <circle cx="0" cy="0" r="3" className="f14_2"/>
                            <circle cx="0" cy="0" r="1.5" fill="#fff"/>
                        </g>
                        {/* <use xlinkHref="#st14i" x="837" y="112" id="Botanichesky_Sad_14"/> */}
                        <g transform="translate(837,112)" id="Botanichesky_Sad_14">
                            <circle cx="0" cy="0" r="5" className="f14" id="st14x"/>
                            <circle cx="0" cy="0" r="3" className="f14_2"/>
                            <circle cx="0" cy="0" r="1.5" fill="#fff"/>
                        </g>
                        {/* <use xlinkHref="#st14" x="920" y="120.5" id="Rostokino"/> */}
                        <g transform="translate(920,120.5)" id="Rostokino">
                            <circle cx="0" cy="0" r="5" className="f14" id="st14x"/>
                            <circle cx="0" cy="0" r="3" className="f14_2"/>
                        </g>
                        {/* <use xlinkHref="#st14" x="990" y="151.5" id="Belokamennaya_14"/> */}
                        <g transform="translate(990,151.5)" id="Belokamennaya_14">
                            <circle cx="0" cy="0" r="5" className="f14" id="st14x"/>
                            <circle cx="0" cy="0" r="3" className="f14_2"/>
                        </g>
                        {/* <use xlinkHref="#st14i" x="1043" y="197" id="Bulvar_Rokossovskogo_14"/> */}
                        <g transform="translate(1043,197)" id="Bulvar_Rokossovskogo_14">
                            <circle cx="0" cy="0" r="5" className="f14" id="st14x"/>
                            <circle cx="0" cy="0" r="3" className="f14_2"/>
                            <circle cx="0" cy="0" r="1.5" fill="#fff"/>
                        </g>
                        {/* <use xlinkHref="#st14ih" x="1077" y="247" id="Lokomotiv"/> */}
                        <g transform="translate(1077,247)" id="Lokomotiv">
                            <circle cx="0" cy="0" r="5" fill="#000"/>
                            <circle cx="0" cy="0" r="3" className="f14_2"/>
                            <circle cx="0" cy="0" r="1.5" fill="#fff"/>
                        </g>
                        {/* <use xlinkHref="#st14i" x="1105" y="414" id="Izmaylovo_14"/> */}
                        <g transform="translate(1105,414)" id="Izmaylovo_14">
                            <circle cx="0" cy="0" r="5" className="f14" id="st14x"/>
                            <circle cx="0" cy="0" r="3" className="f14_2"/>
                            <circle cx="0" cy="0" r="1.5" fill="#fff"/>
                        </g>
                        {/* <use xlinkHref="#st14" x="1105" y="543" id="Sokolinaya_Gora_14"/> */}
                        <g transform="translate(1105,543)" id="Sokolinaya_Gora_14">
                            <circle cx="0" cy="0" r="5" className="f14" id="st14x"/>
                            <circle cx="0" cy="0" r="3" className="f14_2"/>
                        </g>
                        {/* <use xlinkHref="#st14i" x="1105" y="646" id="Shosse_Entuziastov_14"/> */}
                        <g transform="translate(1105,646)" id="Shosse_Entuziastov_14">
                            <circle cx="0" cy="0" r="5" className="f14" id="st14x"/>
                            <circle cx="0" cy="0" r="3" className="f14_2"/>
                            <circle cx="0" cy="0" r="1.5" fill="#fff"/>
                        </g>
                        <use xlinkHref="#st14" x="1122" y="687" id="Andronovka_14"/>
                        <g transform="translate(1122,687)" id="Andronovka_14">
                            <circle cx="0" cy="0" r="5" className="f14" id="st14x"/>
                            <circle cx="0" cy="0" r="3" className="f14_2"/>
                        </g>
                        {/* <use xlinkHref="#st14ih" x="1156" y="761" id="Nizhegorodskaya_14"/> */}
                        <g transform="translate(1156,761)" id="Nizhegorodskaya_14">
                            <circle cx="0" cy="0" r="5" fill="#000"/>
                            <circle cx="0" cy="0" r="3" className="f14_2"/>
                            <circle cx="0" cy="0" r="1.5" fill="#fff"/>
                        </g>
                        {/* <use xlinkHref="#st14" x="1115" y="815" id="Novokhokhlovskaya_14"/> */}
                        <g transform="translate(1115,815)" id="Novokhokhlovskaya_14">
                            <circle cx="0" cy="0" r="5" className="f14" id="st14x"/>
                            <circle cx="0" cy="0" r="3" className="f14_2"/>
                        </g>
                        {/* <use xlinkHref="#st14i" transform="translate(1027,807)rotate(61.9275)translate(68)" id="Ugreshskaya"/> */}
                        <g transform="translate(1027,807)rotate(61.9275)translate(68)" id="Ugreshskaya">
                            <circle cx="0" cy="0" r="5" className="f14" id="st14x"/>
                            <circle cx="0" cy="0" r="3" className="f14_2"/>
                        </g>
                        {/* <use xlinkHref="#st14i" x="997" y="875" id="Dubrovka_14"/> */}
                        <g transform="translate(997,875)" id="Dubrovka_14">
                            <circle cx="0" cy="0" r="5" className="f14" id="st14x"/>
                            <circle cx="0" cy="0" r="3" className="f14_2"/>
                            <circle cx="0" cy="0" r="1.5" fill="#fff"/>
                        </g>
                        {/* <use xlinkHref="#st14i" x="927" y="888" id="Avtozavodskaya_14"/> */}
                        <g transform="translate(927,888)" id="Avtozavodskaya_14">
                            <circle cx="0" cy="0" r="5" className="f14" id="st14x"/>
                            <circle cx="0" cy="0" r="3" className="f14_2"/>
                            <circle cx="0" cy="0" r="1.5" fill="#fff"/>
                        </g>
                        {/* <use xlinkHref="#st14" x="915" y="900" id="ZIL_14"/> */}
                        <g transform="translate(915,900)" id="ZIL_14">
                            <circle cx="0" cy="0" r="5" className="f14" id="st14x"/>
                            <circle cx="0" cy="0" r="3" className="f14_2"/>
                        </g>
                        {/* <use xlinkHref="#st14i" x="773" y="920" id="Verkhnie_Kotly"/> */}
                        <g transform="translate(773,920)" id="Verkhnie_Kotly">
                            <circle cx="0" cy="0" r="5" className="f14" id="st14x"/>
                            <circle cx="0" cy="0" r="3" className="f14_2"/>
                            <circle cx="0" cy="0" r="1.5" fill="#fff"/>
                        </g>
                        {/* <use xlinkHref="#st14" x="700" y="920" id="Krymskaya"/> */}
                        <g transform="translate(700,920)" id="Krymskaya">
                            <circle cx="0" cy="0" r="5" className="f14" id="st14x"/>
                            <circle cx="0" cy="0" r="3" className="f14_2"/>
                        </g>
                        {/* <use xlinkHref="#st14ih" x="592" y="882" id="Ploshchad_Gagarina_14"/> */}
                        <g transform="translate(592,882)" id="Ploshchad_Gagarina_14">
                            <circle cx="0" cy="0" r="5" fill="#000"/>
                            <circle cx="0" cy="0" r="3" className="f14_2"/>
                            <circle cx="0" cy="0" r="1.5" fill="#fff"/>
                        </g>
                        {/* <use xlinkHref="#st14i" x="410" y="835" id="Luzhniki_14"/> */}
                        <g transform="translate(410,835)" id="Luzhniki_14">
                            <circle cx="0" cy="0" r="5" className="f14" id="st14x"/>
                            <circle cx="0" cy="0" r="3" className="f14_2"/>
                            <circle cx="0" cy="0" r="1.5" fill="#fff"/>
                        </g>
                        {/* <use xlinkHref="#st14ih" x="242" y="613.5" id="Kutuzovskaya_14"/> */}
                        <g transform="translate(242,613.5)" id="Kutuzovskaya_14">
                            <circle cx="0" cy="0" r="5" className="f14" id="st14x"/>
                            <circle cx="0" cy="0" r="3" className="f14_2"/>
                            <circle cx="0" cy="0" r="1.5" fill="#fff"/>
                        </g>
                    </g>
                    <g id="train_icon_group">
                        <use xlinkHref="#train" x="887" y="400" id="Leningradsky"/>
                        <use xlinkHref="#train" x="907" y="400" id="Yaroslavsky"/>
                        <use xlinkHref="#train" x="917" y="438" id="Kazansky"/>
                        <use xlinkHref="#train" x="957" y="627" id="Kursky"/>
                        <use xlinkHref="#train" x="870" y="805" id="Paveletsky"/>
                        <use xlinkHref="#train" x="410" y="667" id="Kiyevsky"/>
                        <use xlinkHref="#train" x="481" y="387" id="Belorusky"/>
                        <use xlinkHref="#train" x="587" y="253" id="Savyolovsky"/>
                        <use xlinkHref="#train" x="818" y="281" id="Rizhsky"/>
                        <use xlinkHref="#train" x="1080" y="230" id="Vostochny"/>
                    </g>
                    <g id="aeroexpress_node_group">
                        {/* <use xlinkHref="#stvok" x="492" y="371" id="Belorusky_Aeroexpress"/> */}
                        <g transform="translate(492,371)" id="Belorusky_Aeroexpress">
                            <circle cx="0" cy="0" r="5" style={{fill: "#aaa", stroke: "none"}}/>
                        </g>
                        {/* <use xlinkHref="#stvok" x="575" y="-45" id="Sheremetyevo_Station"/> */}
                        <g transform="translate(575,-45)" id="Sheremetyevo_Station">
                            <circle cx="0" cy="0" r="5" style={{fill: "#aaa", stroke: "none"}}/>
                        </g>
                        <use xlinkHref="#airport" x="558" y="-45" id="Sheremetyevo_Airport"/>
                        {/* <use xlinkHref="#stvok" x="400" y="664" id="Kiyevsky_Aeroexpress"/> */}
                        <g transform="translate(400,664)" id="Kiyevsky_Aeroexpress">
                            <circle cx="0" cy="0" r="5" style={{fill: "#aaa", stroke: "none"}}/>
                        </g>
                        {/* <use xlinkHref="#stvok" x="57" y="1057" id="Vnukovo_Platform"/> */}
                        <g transform="translate(57,1057)" id="Vnukovo_Platform">
                            <circle cx="0" cy="0" r="5" style={{fill: "#aaa", stroke: "none"}}/>
                        </g>
                        {/* <use xlinkHref="#airport" x="74" y="1057" id="Vnukovo_Airport"/> */}
                        <g transform="translate(74,1057)" id="Vnukovo_Airport" data-clone-id='Vnukovo_Platform'>
                            <circle cx="0" cy="0" r="5" style={{fill: "#aaa", stroke: "none"}}/>
                        </g>
                        {/* <use xlinkHref="#stvok" x="883" y="818" id="Paveletsky_Aeroexpress"/> */}
                        <g transform="translate(883,818)" id="Paveletsky_Aeroexpress">
                            <circle cx="0" cy="0" r="5" style={{fill: "#aaa", stroke: "none"}}/>
                        </g>
                        {/* <use xlinkHref="#stvok" x="883" y="1270" id="Domodedovo_Platform"/> */}
                        <g transform="translate(883,1270)" id="Domodedovo_Platform">
                            <circle cx="0" cy="0" r="5" style={{fill: "#aaa", stroke: "none"}}/>
                        </g>
                        <use xlinkHref="#airport" x="900" y="1268" id="Domodedovo_Airport"/>
                    </g>
                </g>
                <g id="route_terminus_num" className="ic mid" style={{
                    fontSize: "12px"
                }}>
                    <text x="1028" y="205" className="r1">1</text>
                    <text x="185" y="1200" className="r1">1</text>

                    <text x="333" y="94" className="r2">2</text>
                    <text x="1065" y="1202.5" className="r2">2</text>
                    <text x="72" y="190" className="r3">3</text>
                    <text x="1193" y="323" className="r3">3</text>

                    <text x="95" y="438" className="r4" id="Kuntsevskaya_term4">4</text>
                    <text x="637" y="605" className="r4" id="Aleksandrovsky_Sad_term4">4/4А</text>
                    <text x="300" y="535" className="r4" id="Mezhdunarodnaya_term4a">4А</text>

                    <text x="547" y="790" className="r5">5</text>
                    <text x="770" y="355" className="r5">5</text>
                    <text x="848" y="23" className="r6">6</text>

                    <text x="518" y="1198" className="r6">6</text>
                    <text x="284" y="178" className="r7">7</text>
                    <text x="1172" y="1072" className="r7">7</text>
                    <text x="742" y="727" className="r8" id="Tretyakovskaya_term8">8</text>
                    <text x="1212" y="557" className="r8" id="Novokosino_term8">8</text>

                    <text x="356" y="553" className="r8" id="Delovoy_Tsentr_term8">8А</text>
                    <text x="89" y="997" className="r8" id="Ramenki_term8">8А</text>
                    <text x="687" y="12" className="r9">9</text>
                    <text x="623" y="1223" className="r9">9</text>
                    <text x="596" y="56" className="r10">10</text>
                    <text x="1012" y="1232" className="r10">10</text>
                    <text x="546" y="1198" className="r12">12</text>
                    <text x="337" y="1274.5" className="r12">12</text>

                    <text x="590" y="190" className="rm1">13</text>
                    <text x="875" y="190" className="rm1">13</text>
                    <text x="1065" y="528" className="r15">15</text>
                    <text x="1320" y="1155" className="r15">15</text>
                    <text x="204" y="1225" className="f16 i">16</text>

                </g>
                <g className="ic r11 mid" style={{
                    fontSize: "12px"
                }}>
                    <text x="547" y="288" id="Savyolovskaya_term11">11/11А</text>

                    <text x="350" y="583" id="Delovoy_Tsentr_term11">11А</text>
                    <text x="225" y="453">11</text>
                    <g className="i">
                        <text x="70" y="650">11</text>
                        <text x="1057" y="435">11</text>
                    </g>
                </g>
                <g className="ic r14_2" style={{
                    fontSize: "12px"
                }}>
                    <text x="457" y="180">14</text>
                    <text x="1100" y="620" className="end">14</text>
                    <text x="537" y="857" className="mid">14</text>
                </g>
                <g id="ic_num_group_big" transform="translate(0,3)">
                    <g id="ic_num_white" className="ic mid" style={{
                        fontSize: "10px", fill: "#FFF"
                    }}>
                        <g id="route1_ic_num_white">
                            <text x="1066.8" y="256" id="Cherkizovskaya_ic1">1</text>
                            <text x="985" y="350" id="Sokolniki_ic1">1</text>
                            <text x="917" y="418" id="Komsomolskaya_ic1">1</text>
                            <text x="826" y="508" id="Chistye_Prudy_ic1">1</text>
                            <text x="732" y="530" id="Lubyanka_ic1">1</text>
                            <text x="688.67" y="573.33" id="Okhotny_Ryad_ic1">1</text>
                            <text x="635" y="628" id="Biblioteka_Imeni_Lenina_ic1">1</text>
                            <text x="575" y="688" id="Kropotkinskaya_ic1">1</text>
                            <text x="486" y="776" id="Park_Kultury_ic1">1</text>

                            <text x="340" y="922" id="Prospekt_Vernadskogo_ic1">1</text>
                            <text x="201" y="1182" id="Kommunarka_ic1">1</text>
                        </g>
                        <g id="route2_ic_num_white">
                            <text x="483.5" y="338.5" id="Dinamo_ic2">2</text>
                            <text x="510" y="365" id="Belorusskaya_ic2">2</text>
                            <text x="576" y="488" id="Tverskaya_ic2">2</text>
                            <text x="688.67" y="600.67" id="Teatralnaya_ic2">2</text>
                            <text x="778" y="715" id="Novokuznetskaya_ic2">2</text>
                            <text x="855" y="803" id="Paveletskaya_ic2">2</text>
                            <text x="992" y="1189" id="Krasnogvardeyskaya_ic2">2</text>
                        </g>
                        <g id="route3_ic_num_white">
                            <text x="413" y="647" id="Kiyevskaya_ic3">3</text>
                            <text x="533" y="648" id="Smolenskaya_ic3">3</text>
                            <text x="595" y="628" id="Arbatskaya_ic3">3</text>
                            <text x="688.67" y="628" id="Ploshchad_Revolyutsii_ic3">3</text>
                            <text x="926" y="607" id="Kurskaya_ic3">3</text>
                            <text x="1028" y="505" id="Elektrozavodskaya_ic3">3</text>
                        </g>
                        <g id="route4_ic_num_white">
                            <g style={{
                                fontSize: "8px"
                            }}>
                                <text x="307" y="517" id="Mezhdunarodnaya_ic4">4А</text>
                                <text x="330" y="540" id="Vystavochnaya_ic4">4А</text>
                            </g>
                            <text x="242" y="625" id="Kutuzovskaya_ic4">4</text>
                            <text x="413" y="608" id="Kiyevskaya_ic4">4</text>
                            <text x="615" y="608" id="Aleksandrovsky_Sad_ic4">4</text>
                        </g>
                        <g id="route5_ic_num_white">
                            <text x="889" y="418" id="Komsomolskaya_ic5">5</text>
                            <text x="944" y="626" id="Kurskaya_ic5">5</text>
                            <text x="914" y="716" id="Taganskaya_ic5">5</text>
                            <text x="827" y="803" id="Paveletskaya_ic5">5</text>
                            <text x="761" y="832" id="Dobryninskaya_ic5">5</text>
                            <text x="628.824" y="836.176" id="Oktyabrskaya_ic5">5</text>
                            <text x="486" y="748" id="Park_Kultury_ic5">5</text>
                            <text x="431" y="627" id="Kiyevskaya_ic5">5</text>

                            <text x="445" y="490" id="Krasnopresnenskaya_ic5">5</text>
                            <text x="510" y="393" id="Belorusskaya_ic5">5</text>
                            <text x="587" y="344" id="Novoslobodskaya_ic5">5</text>

                            <text x="828" y="363" id="Prospekt_Mira_ic5">5</text>
                        </g>
                        <g id="route6_ic_num_white">
                            <text x="848" y="288" id="Rizhskaya_ic6">6</text>
                            <text x="848" y="343" id="Prospekt_Mira_ic6">6</text>
                            <text x="808" y="489" id="Turgenevskaya_ic6">6</text>
                            <text x="656.824" y="836.176" id="Oktyabrskaya_ic6">6</text>
                            <text x="611" y="882" id="Leninsky_Prospekt_ic6">6</text>
                            <text x="577" y="916" id="Akademicheskaya_ic6">6</text>
                            <text x="518" y="1008" id="Kaluzhskaya_ic6">6</text>
                            <text x="518" y="1175" id="Novoyasenevskaya_ic6">6</text>
                        </g>
                        <g id="route7_ic_num_white">
                            <text x="379" y="387" id="Polezhayevskaya_ic7">7</text>
                            <text x="465" y="470" id="Barrikadnaya_ic7">7</text>
                            <text x="595" y="470" id="Pushkinskaya_ic7">7</text>
                            <text x="732" y="502" id="Kuznetsky_Most_ic7">7</text>
                            <text x="914" y="755" id="Taganskaya_ic7">7</text>
                            <text x="992" y="832" id="Proletarskaya_ic7">7</text>
                            <text x="1138" y="890" id="Tekstilshchiki_ic7">7</text>
                            <text x="1250" y="994" id="Lermontovsky_Prospekt_ic7">7</text>
                        </g>
                    </g>
                    <g id="ic_num_black_big" className="ic mid" style={{
                        fontSize: "10px", fill: "#000"
                    }}>
                        <g id="route8_ic_num_black_big">
                            <text x="207.5" y="788.5" id="Michurinsky_Prospekt_ic8" style={{
                                fontSize: "8px"
                            }}>8А
                            </text>
                            <g style={{
                                fontSize: "8px"
                            }}>
                                <text x="330" y="558" id="Delovoy_Tsentr_ic8">8А</text>
                            </g>

                            <text x="533" y="676" className="i" id="Plyushchikha_ic8">8</text>
                            <text x="575" y="716" className="i" id="Volkhonka_ic8">8</text>
                            <text x="932" y="735" id="Marksistskaya_ic8">8</text>
                            <text x="1032" y="735" id="Ploshchad_Ilyicha_ic8">8</text>
                            <text x="1063.46" y="703.5" id="Aviamotornaya_ic8">8</text>
                        </g>
                        <g id="route9_ic_num_black_big">
                            <text x="640" y="118" id="Vladykino_ic9">9</text>
                            <text x="575" y="267" id="Savyolovskaya_ic9">9</text>
                            <text x="587" y="316" id="Mendeleyevskaya_ic9">9</text>
                            <text x="677" y="415" id="Tsvetnoy_Bulvar_ic9">9</text>
                            <text x="615" y="488" id="Chekhovskaya_ic9">9</text>
                            <text x="615" y="648" id="Borovitskaya_ic9">9</text>
                            <text x="761" y="860" id="Serpukhovskaya_ic9">9</text>
                            <text x="761" y="1028" id="Sevastopolskaya_ic9">9</text>
                            <text x="633" y="1233" id="Bulvar_Dmitriya_Donskogo_ic9">9</text>
                        </g>
                    </g>
                </g>
                <g id="ic_num_group_small" transform="translate(0,2.5)">
                    <g id="ic_num_black_small" className="ic mid" style={{
                        fontSize: "9px", fill: "#000"
                    }}>
                        <g id="route10_ic_num_black_small">
                            <text x="695" y="247" id="Maryina_Roshcha_ic10">10</text>

                            <text x="705" y="415" id="Trubnaya_ic10">10</text>
                            <text x="808" y="528" id="Sretensky_Bulvar_ic10">10</text>
                            <text x="926" y="646" id="Chkalovskaya_ic10">10</text>
                            <text x="1012" y="755" id="Rimskaya_ic10">10</text>
                            <text x="1012" y="812" id="Krestyanskaya_Zastava_ic10">10</text>
                            <text x="1083" y="945" id="Pechatniki_ic10">10</text>
                            <text x="1012" y="1209" id="Zyablikovo_ic10">10</text>
                        </g>
                        <text x="789" y="1028" className="i" id="Kakhovskaya_ic11">11</text>
                        <text transform="translate(330,573)" style={{
                            fontSize: "7px"
                        }} id="Delovoy_Tsentr_11_ic11">11
                            <tspan x="0" dy="6">А</tspan>
                        </text>
                        <text x="379" y="415" id="Khoroshyovskaya_ic11">11</text>
                        <text x="483.5" y="310.5" id="Petrovsky_Park_ic11">11</text>
                        <text x="547" y="267" id="Savyolovskaya_ic11">11</text>
                        <g className="i">
                            <text x="97" y="456" id="Mozhayskaya_ic11">11</text>
                            <text x="715" y="267" id="Maryina_Roshcha_ic11">11</text>
                            <text x="868" y="268" id="Rizhskaya_11_ic11">11</text>
                            <text x="985" y="322" id="Sokolniki_ic11">11</text>

                            <text x="1138" y="862" id="Tekstilshchiki_11_ic11">11</text>
                            <text x="1055" y="945" id="Pechatniki_11_ic11">11</text>
                            <text x="498" y="1028" id="Vorontsovskaya_ic11">11</text>
                            <text x="421" y="974" id="Ulitsa_Novatorov_11_ic11">11</text>
                            <text x="340" y="894" id="Prospekt_Vernadskogo_11_ic11">11</text>
                            <text x="235.5" y="788.5" id="Michurinsky_Prospekt_11_ic11">11</text>
                        </g>
                        <g style={{
                            fill: "#fff"
                        }}>
                            <text x="1091.46" y="703.5" id="Aviamotornaya_ic11">15</text>
                            <text x="1166" y="771" id="Nizhegorodskaya_ic11">15</text>
                            <text x="1048" y="525" id="Elektrozavodskaya_ic15">15</text>
                        </g>
                        <g id="route12_ic_num_black_small" fontSize="8px">
                            <text x="546" y="1175" id="Bittsevsky_Park_ic12">12</text>
                            <text x="613" y="1253" id="Ulitsa_Starokachalovskaya_ic12">12</text>
                            <g className="i">
                                <text x="221" y="1202" id="Kommunarka_ic16">16</text>
                                <text x="421" y="1002" id="Ulitsa_Novatorov_ic16">16</text>
                                <text x="597" y="936" id="Akademicheskaya_ic16">16</text>
                            </g>
                        </g>
                    </g>
                    <g id="route12_ic_num_white_small" style={{
                        fill: "#fff", fontSize: "9px"
                    }} className="ic mid">
                        <text x="1278" y="994" id="Kosino_ic12">15</text>
                    </g>
                </g>
                <g transform="translate(0,4)">
                    <use xlinkHref="#stname_over" className="st" style={{
                        stroke: "#fff", strokeWidth: 3, strokeLinejoin: "round"
                    }}/>
                    <g id="stname_group" style={{
                        stroke: "none"
                    }}>
                        <g className="st" id="stname">
                            <g id="stname_over">
                                <g id="route1_stname_over">
                                    <text data-id={"Preobrazhenskaya_Ploshchad"} x="1045" y="310">Преображенская <tspan
                                        data-id={"Preobrazhenskaya_Ploshchad"} x="1045" dy="13">площадь</tspan></text>
                                    <text data-id={"Sokolniki_1"} x="1000" y="350" className="ic">Сокольники</text>
                                    <text data-id={"Krasnoselskaya"} x="960" y="395">Красносельская</text>
                                    <text data-id={"Komsomolskaya_1"} x="932" y="418" className="ic">Комсомольская
                                    </text>
                                    <text data-id={"Krasnye_Vorota"} x="885" y="470">Красные Ворота</text>
                                    <g className="ic">
                                        <text data-id={"Biblioteka_Imeni_Lenina"} x="642" y="643"
                                              className="r1">Библиотека <tspan data-id={"Biblioteka_Imeni_Lenina"}
                                                                               x="642"
                                                                               dy="12">имени
                                            Ленина</tspan></text>
                                        <text data-id={"Kropotkinskaya"} x="588" y="688" className="r1">Кропоткинская
                                        </text>
                                        <text data-id={"Park_Kultury_1"} x="475" y="756" className="end">Парк
                                            <tspan data-id={"Park_Kultury_12"} x="475" dy="13"> культуры</tspan>
                                        </text>
                                        <text data-id={"Sportivnaya_1"} x="437" y="845" className="r1">Спортивная</text>
                                    </g>
                                    <text data-id={"Frunzenskaya"} x="465" y="817">Фрунзенская</text>
                                    <text data-id={"Vorobyovy_Gory"} x="385" y="851" className="end">Воробьёвы
                                        <tspan data-id={"Vorobyovy_Gory"} x="385" dy="13"> горы</tspan>
                                    </text>
                                </g>
                                <g id="route2_stname_over">
                                    <text data-id={'Dinamo'} x="497.5" y="338.5" className="ic r2">Динамо</text>
                                    <text data-id={'Belorusskaya_2'} x="525" y="392" className="ic">Белорусская</text>
                                    <text data-id={'Paveletskaya_2'} x="863" y="789" className="ic">Павелецкая</text>
                                    <g className="end">
                                        <text data-id={'Avtozavodskaya_2'} x="917" y="884" className="ic">Автозаводская
                                        </text>
                                        <text data-id={'Tekhnopark'} x="936" y="912">Технопарк</text>
                                        <text data-id={'Kolomenskaya'} x="936" y="950">Коломенская</text>
                                        <text data-id={'Kashirskaya_2'} x="941" y="1040" className="ic">Каширская</text>
                                        <text data-id={'Kantemirovskaya'} x="936" y="1065">Кантемировская</text>
                                        <text data-id={'Tsaritsyno'} x="936" y="1095">Царицыно</text>
                                        <text data-id={'Orekhovo'} x="936" y="1125">Орехово</text>
                                        <text data-id={'Domodedovskaya'} x="950" y="1165">Домодедовская</text>
                                        <text data-id={'Krasnogvardeyskaya'} x="978" y="1190"
                                              className="ic r2">Красногвардейская
                                        </text>
                                    </g>
                                </g>
                                <g id="route3_stname_over">
                                    <text data-id={'Kuntsevskaya_3'} x="80" y="418" className="ic">Кунцевская</text>
                                    <g className="ic">
                                        <text data-id={'Kiyevskaya_3'} x="404" y="627" className="end">Киевская</text>
                                        <text data-id={'Smolenskaya_3'} x="524" y="637" className="r3 end">Смоленская
                                        </text>
                                        <text data-id={'Ploshchad_Revolyutsii'} x="701" y="616" className="r3">Площадь
                                            Революции
                                        </text>
                                        <text data-id={'Elektrozavodskaya_3'} x="1053" y="505">Электрозаводская</text>
                                    </g>
                                    <text data-id={'Baumanskaya'} x="965" y="582">Бауманская</text>
                                    <text data-id={'Semyonovskaya'} x="1088" y="465">Семёновская</text>
                                </g>
                                <g id="route4_stname_over">
                                    <text data-id={'Bagrationovskaya'} x="165" y="529">Багратионовская</text>
                                    <text data-id={'Studencheskaya'} x="324" y="675" className="mid">Студенческая</text>
                                    <text data-id={'Smolenskaya_4'} x="465" y="577">Смоленская</text>
                                    <text data-id={'Arbatskaya_4'} x="559" y="577">Арбатская</text>
                                </g>
                                <g id="route5_stname_over">
                                    <text data-id={'Novoslobodskaya'} x="580" y="362" className="ic r5">Новослободская
                                    </text>
                                </g>
                                <g id="route6_stname_over">
                                    <text data-id={'Medvedkovo'} x="860" y="33">Медведково</text>
                                    <text data-id={'Botanichesky_Sad_6'} x="836" y="124" className="end ic">Ботанический
                                        <tspan data-id={'Botanichesky_Sad_6'} x="836" dy="13"> сад</tspan>
                                    </text>
                                    <text data-id={'Turgenevskaya'} x="823" y="489" className="ic r6">Тургеневская
                                    </text>
                                    <text data-id={'Tretyakovskaya_6a'} x="754" y="753" className="ic">Третьяковская
                                    </text>
                                </g>
                                <g id="route7_stname_over">
                                    <g className="end">
                                        <text data-id={'Spartak'} x="272" y="278">Спартак</text>
                                        <text data-id={'Shchukinskaya'} x="304" y="332">Щукинская</text>
                                        <text data-id={'Oktyabrskoye_Pole'} x="334" y="362"
                                              className="ic r7">Октябрьское
                                            Поле
                                        </text>
                                    </g>
                                    <g className="ic r7">
                                        <text data-id={'Barrikadnaya'} x="474" y="458">Баррикадная</text>
                                        <text data-id={'Pushkinskaya'} x="605" y="458">Пушкинская</text>
                                        <text data-id={'Proletarskaya'} transform="translate(980,832)scale(0.91,1)"
                                              className="end">Пролетарская
                                        </text>
                                    </g>
                                    <text data-id={"Volgogradsky_Prospekt"} x="1037" y="842"
                                          className="ic r7">Волгоградский <tspan data-id={"Volgogradsky_Prospekt"}
                                                                                 x="1037"
                                                                                 dy="13">проспект</tspan>
                                    </text>
                                </g>
                                <g id="route8_stname_over">
                                    <text data-id={"Lomonosovsky_Prospekt"} x="239" y="719">Ломоносовский <tspan
                                        data-id={"Lomonosovsky_Prospekt"} x="239" dy="13">проспект</tspan></text>
                                    <text data-id={"Minskaya"} x="239" y="695">Минская</text>
                                    <text data-id={"Dorogomilovskaya"} x="439" y="560" className="x">Дорогомиловская
                                    </text>
                                    <g className="ic">
                                        <text data-id={"Delovoy_Tsentr_8"} x="315" y="574" className="end">Деловой
                                            <tspan data-id={"Delovoy_Tsentr_8"} x="315" dy="13"> центр</tspan>
                                        </text>
                                        <g className="r8">
                                            <text data-id={"Volkhonka"} x="588" y="716" className="x">Волхонка</text>
                                            <text data-id={"Marksistskaya"} x="930" y="719">Марксистская</text>
                                        </g>
                                        <text data-id={"Aviamotornaya_15"} x="1109.46" y="703.5">Авиамоторная</text>

                                    </g>
                                </g>
                                <g id="route9_stname_over">
                                    <text data-id={"Dmitrovskaya"} x="587" y="227">Дмитровская</text>

                                    <text data-id={"Borovitskaya"} x="625" y="670" className="ic r9">Боровицкая</text>
                                    <text data-id={"Nakhimovsky_Prospekt"} x="773" y="992">Нахимовский проспект</text>
                                </g>
                                <g id="route10_stname_over">
                                    <text data-id={"Okruzhnaya_10"} x="571" y="122" className="end ic">Окружная</text>
                                    <text data-id={"Kozhukhovskaya"} x="1045" y="919" className="end ic r10">Кожуховская
                                    </text>
                                    <text data-id={"Volzhskaya"} x="1090" y="990" className="end">Волжская</text>
                                    <text data-id={"Lyublino"} x="1057" y="1030" className="end">Люблино</text>
                                </g>

                                <g id="route11_stname_over">
                                    <text data-id={"Varshavskaya"} x="865" y="1011" className="mid x">Варшавская</text>
                                    <text data-id={"Shelepikha_11"} x="299" y="477" className="end ic">Шелепиха</text>
                                    <text data-id={"Petrovsky_Park"} transform="translate(497,307)scale(0.95,1)"
                                          className="ic r11">Петровский <tspan
                                        data-id={"Petrovsky_Park"} x="0" dy="13">парк</tspan></text>
                                    <text data-id={"Mnyovniki"} x="225" y="413" className="mid">Мнёвники</text>
                                    <text data-id={"Narodnoe_Opolcheniye"} x="285" y="446" className="mid">Народное
                                        <tspan data-id={"Narodnoe_Opolcheniye"} x="285" dy="13">Ополчение</tspan>
                                    </text>
                                    <g className="x">
                                        <g className="mid">
                                            <text data-id={"Terekhovo"} x="165" y="446">Терехово</text>

                                        </g>
                                        data-id={""}

                                        <text data-id={"Nagatinsky_Zaton"} x="1034" y="958" className="end">Нагатинский
                                            <tspan data-id={"Nagatinsky_Zaton"} x="1010" dy="13"> Затон</tspan>
                                        </text>
                                        <text data-id={"Klenovy_Bulvar"} x="982" y="985" className="end">Кленовый
                                            <tspan data-id={"Klenovy_Bulvar"} x="982" dy="12"> бульвар</tspan>
                                        </text>
                                        <text data-id={"Ulitsa_Novatorov_16"} x="433" y="982" dy="6"
                                              className="ic">Новаторская
                                        </text>
                                    </g>
                                    <text data-id={"Lefortovo_15"} x="1060" y="592">Лефортово</text>
                                </g>
                                <g id="route15_stname_over">
                                    <text data-id={"Okskaya"} x="1213" y="844"
                                          className="end">Окская
                                    </text>
                                </g>
                                <g id="route16_stname_over" className="x">
                                    <text data-id={"Ulitsa_Stroiteley"} x="461" y="929" className="end">Улица
                                        <tspan data-id={"Ulitsa_Stroiteley"} x="461" dy="13"> Строителей</tspan>
                                    </text>
                                </g>
                                <g id="route14_stname_over" className="small r14_2">
                                    <text data-id={"Delovoy_Tsentr_14"} x="290" y="501" className="ic end">Деловой
                                        <tspan data-id={"Delovoy_Tsentr_14"} x="290" dy="10"> центр</tspan>
                                    </text>

                                    <text data-id={"Baltiyskaya"} x="400" y="227" className="ic">Балтийская</text>

                                    <text data-id={"Novokhokhlovskaya_14"} x="1116" y="824">Новохохловская</text>
                                    <text data-id={"Ugreshskaya"} x="1060" y="876" className="ic">Угрешская</text>

                                    <text data-id={"ZIL_14"} x="907" y="899" className="end">ЗИЛ</text>
                                    <text data-id={"Luzhniki_14"} x="402" y="835" className="end ic">Лужники</text>
                                </g>
                                <g id="terminalname_over" className="small">
                                    <text data-id={"Paveletsky_Aeroexpress"} x="891" y="805">Павелецкий</text>
                                    <text data-id={"Savyolovskaya_9"} x="608" y="255">Савёловский</text>
                                </g>
                            </g>
                            <g id="route1_stname">
                                <text data-id={"Bulvar_Rokossovskogo_1"} x="1055" y="202" className="ic">Бульвар
                                    Рокоссовского
                                </text>
                                <text data-id={"Cherkizovskaya"} x="1084" y="256" className="ic r1">Черкизовская</text>
                                <g className="ic r1">
                                    <text data-id={"Chistye_Prudy"} x="837" y="508">Чистые пруды</text>
                                    <text data-id={"Lubyanka"} x="718" y="530" className="end">Лубянка</text>
                                    <text data-id={"Okhotny_Ryad"} x="701" y="573.33">Охотный Ряд</text>
                                </g>
                                <text data-id={"Universitet"} x="375" y="907">Университет</text>
                                <text data-id={"Prospekt_Vernadskogo_1"} x="328" y="901" className="ic end">Проспект
                                    <tspan data-id={"Prospekt_Vernadskogo_1"} x="328" dy="13"> Вернадского</tspan>
                                </text>
                                <text data-id={"Zapadnaya"} x="315" y="967">Юго-Западная</text>
                                <text data-id={"Troparyovo"} x="285" y="997">Тропарёво</text>
                                <text data-id={"Rumyantsevo"} x="255" y="1027">Румянцево</text>
                                <text data-id={"Salaryevo"} x="225" y="1057">Саларьево</text>
                                <g className="end">
                                    <text data-id={"Filatov_Lug"} x="189" y="1085">Филатов луг</text>
                                    <text data-id={"Prokshino"} x="189" y="1115">Прокшино</text>
                                    <text data-id={"Olkhovaya"} x="189" y="1145">Ольховая</text>
                                    <text data-id={"Kommunarka_1"} x="187" y="1182" className="ic">Коммунарка</text>
                                </g>
                                <text data-id={"Potapovo"} x="266" y="1241" className="x">Потапово</text>
                            </g>
                            <g id="route2_stname">
                                <text data-id={'Khovrino'} x="345" y="104">Ховрино</text>
                                <text data-id={'Belomorskaya'} x="345" y="134">Беломорская</text>
                                <text data-id={'Rechnoy_Vokzal'} x="345" y="164">Речной вокзал</text>
                                <text data-id={'Vodny_Stadion'} x="358" y="187">Водный <tspan data-id={'Vodny_Stadion'}
                                                                                              x="358"
                                                                                              dy="13">стадион</tspan>
                                </text>
                                <text data-id={'Voykovskaya'} x="400" y="240" className="ic r2">Войковская</text>
                                <text data-id={'Sokol'} x="423" y="258">Сокол</text>
                                <text data-id={'Aeroport'} x="446" y="281">Аэропорт</text>
                                <text data-id={'Mayakovskaya'} x="578" y="438">Маяковская</text>
                                <text data-id={'Tverskaya'} x="563" y="486" className="ic r2 end">Тверская</text>
                                <text data-id={'Teatralnaya'} x="701" y="594.67" className="ic r2">Театральная</text>
                                <text data-id={'Novokuznetskaya'} x="768" y="704" className="ic r2 end">Новокузнецкая
                                </text>
                                <text data-id={'Alma-Atinskaya'} x="1048" y="1217">Алма-Атинская</text>
                            </g>
                            <g id="route3_stname">
                                <text data-id={"Pyatnitskoye_Shosse"} x="84" y="200">Пятницкое шоссе</text>
                                <text data-id={"Mitino"} x="84" y="230">Митино</text>
                                <text data-id={"Volokolamskaya"} x="84" y="260">Волоколамская</text>
                                <text data-id={"Myakinino"} x="84" y="298">Мякинино</text>
                                <text data-id={"Strogino"} x="84" y="328">Строгино</text>
                                <text data-id={"Krylatskoye"} x="84" y="358">Крылатское</text>
                                <text data-id={"Molodyozhnaya"} x="84" y="388">Молодёжная</text>
                                <text data-id={"Slavyansky_Bulvar"} x="150" y="605" className="end">Славянский
                                    <tspan data-id={"Slavyansky_Bulvar"} x="150" dy="13"> бульвар</tspan>
                                </text>
                                <g className="ic">
                                    <text data-id={"Park_Pobedy_3"} x="217" y="660" className="end">Парк Победы</text>
                                    <text data-id={"Arbatskaya_3"} x="580" y="622" className="end r3">Арбатская</text>

                                    <text data-id={"Kurskaya_3"} x="953" y="608">Курская</text>
                                    <text data-id={"Partizanskaya"} x="1122" y="431" className="r3">Партизанская</text>
                                </g>
                                <text data-id={"Izmaylovskaya"} x="1148" y="405">Измайловская</text>
                                <text data-id={"Pervomayskaya"} x="1178" y="375">Первомайская</text>
                                <text data-id={"Shchyolkovskaya"} x="1208" y="345">Щёлковская</text>
                                <text data-id={"Golyanovo"} x="1238" y="315" className="x i">Гольяново</text>
                            </g>
                            <g id="route4_stname">
                                <text data-id={"Mezhdunarodnaya"} x="315" y="505" className="ic r4">Международная</text>
                                <text data-id={"Vystavochnaya"} x="330" y="523" className="ic r4">Выставочная</text>
                                <text data-id={"Pionerskaya"} x="117" y="480">Пионерская</text>
                                <text data-id={"Filyovsky_Park"} x="144" y="500">Филёвский <tspan
                                    data-id={"Filyovsky_Park"}
                                    x="144"
                                    dy="13">парк</tspan>
                                </text>
                                <text data-id={"Fili"} x="197" y="560">Фили</text>
                                <text data-id={"Kutuzovskaya_4"} x="252" y="613" className="ic">Кутузовская</text>
                                <text data-id={"Aleksandrovsky_Sad"} transform="translate(598,605)scale(0.9,1)"
                                      className="ic r4 end">Александровский сад
                                </text>
                            </g>
                            <g id="route5_stname">
                                <g className="ic r5">
                                    <text data-id={"Dobryninskaya"} x="774" y="838">Добрынинская</text>

                                    <text data-id={"Krasnopresnenskaya"} x="446" y="508">Краснопресненская</text>
                                </g>
                            </g>
                            <g id="route6_stname">
                                <text data-id={'Babushkinskaya'} x="860" y="63">Бабушкинская</text>
                                <text data-id={'Sviblovo'} x="860" y="93">Свиблово</text>
                                <text data-id={'VDNKh'} x="860" y="209" className="ic r6">ВДНХ</text>
                                <text data-id={'Alekseyevskaya'} x="860" y="238">Алексеевская</text>
                                <text data-id={'Rizhskaya_6'} x="861" y="290" className="ic">Рижская</text>
                                <text data-id={'Prospekt_Mira_6'} x="861" y="345" className="ic">Проспект <tspan
                                    data-id={'Prospekt_Mira_6'} x="861" dy="15">Мира</tspan></text>
                                <text data-id={'Sukharevskaya'} x="836" y="395" className="end">Сухаревская</text>
                                <text data-id={'Kitay-Gorod_6a'} x="821" y="648" className="ic">Китай-город</text>
                                <text data-id={'Oktyabrskaya_6'} x="668" y="814" className="ic end">Октябрьская</text>
                                <text data-id={'Shabolovskaya'} x="647" y="866">Шаболовская</text>
                                <text data-id={'Leninsky_Prospekt'} x="621" y="892" className="ic r6">Ленинский проспект
                                </text>
                                <text data-id={'Akademicheskaya_6'} x="567" y="906" className="ic end">Академическая
                                </text>
                                <text data-id={'Profsoyuznaya'} x="557" y="956">Профсоюзная</text>
                                <text data-id={'Novye_Cheryomushki'} x="534" y="981">Новые Черёмушки</text>
                                <text data-id={'Kaluzhskaya'} x="533" y="1008" className="ic r6">Калужская</text>
                                <text data-id={'Belyayevo'} x="530" y="1051">Беляево</text>
                                <text data-id={'Konkovo'} x="530" y="1081">Коньково</text>
                                <text data-id={'Tyoply_Stan'} x="530" y="1111">Тёплый Стан</text>
                                <text data-id={'Yasenevo'} x="530" y="1141">Ясенево</text>
                                <text data-id={'Novoyasenevskaya'} x="504" y="1175" className="ic r6 end">Новоясеневская
                                </text>
                            </g>
                            <g id="route7_stname">
                                <g className="end">
                                    <text data-id={'Planernaya'} x="272" y="188">Планерная</text>
                                    <text data-id={'Skhodnenskaya'} x="272" y="218">Сходненская</text>
                                    <text data-id={'Tushinskaya'} x="272" y="248">Тушинская</text>
                                    <text data-id={'Polezhayevskaya'} x="363" y="386" className="ic r7">Полежаевская
                                    </text>
                                </g>
                                <text data-id={'Begovaya'} x="419" y="407">Беговая</text>
                                <text data-id={'Ulitsa_1905_Goda'} x="424" y="446" className="end">Улица
                                    <tspan data-id={'Ulitsa_1905_Goda'} x="424" dy="13"> 1905 года</tspan>
                                </text>
                                <text data-id={'Kuznetsky_Most'} x="718" y="502" className="ic r7 end">Кузнецкий
                                    <tspan data-id={'Kuznetsky_Most'} x="718" dy="12"> Мост</tspan>
                                </text>
                                <text data-id={'Taganskaya_7'} x="927" y="757" className="ic">Таганская</text>
                                <text data-id={'Tekstilshchiki_7'} x="1110" y="908" className="ic">Текстильщики</text>
                                <text data-id={'Kuzminki'} x="1218" y="873" className="end">Кузьминки</text>
                                <text data-id={'Ryazansky_Prospekt'} x="1237" y="873" dy="-13">Рязанский <tspan
                                    data-id={'Ryazansky_Prospekt'} x="1237" dy="13">проспект</tspan></text>
                                <text data-id={'Vykhino'} x="1288" y="930" className="end">Выхино</text>
                                <text data-id={'Lermontovsky_Prospekt'} x="1231" y="987"
                                      className="ic r7 end">Лермонтовский
                                    <tspan data-id={'Lermontovsky_Prospekt'} x="1231" dy="13"> проспект</tspan>
                                </text>
                                <text data-id={'Zhulebino'} x="1205" y="1019" className="end">Жулебино</text>
                                <text data-id={'Kotelniki'} x="1175" y="1049" className="end">Котельники</text>
                            </g>
                            <g id="route8_stname">
                                <g className="x">
                                    <text data-id={'Vnukovo_8'} x="86" y="1040">Внуково</text>
                                    <text data-id={'Pykhtino'} x="86" y="1010">Пыхтино</text>
                                </g>
                                <text data-id={'Rasskazovka'} x="86" y="980">Рассказовка</text>
                                <text data-id={'Novoperedelkino'} x="86" y="950">Новопеределкино</text>
                                <text data-id={'Borovskoye_Shosse'} x="97" y="918">Боровское шоссе</text>
                                <text data-id={'Solntsevo'} x="127" y="888">Солнцево</text>
                                <text data-id={'Govorovo'} x="157" y="858">Говорово</text>
                                <text data-id={'Ozyornaya'} x="187" y="828">Озёрная</text>
                                <text data-id={"Michurinsky_Prospekt_8"} x="250" y="788"
                                      className="ic">Мичуринский <tspan
                                    data-id={"Michurinsky_Prospekt_8"} x="260" dy="13">проспект</tspan>
                                </text>
                                <text data-id={'Ramenki'} x="239" y="755">Раменки</text>
                                <text data-id={'Plyushchikha'} x="542" y="693" className="end x ic">Плющиха</text>
                                <text data-id={'Ploshchad_Ilyicha'} x="1047" y="735" className="ic r8">Площадь <tspan
                                    data-id={'Ploshchad_Ilyicha'} x="1047" dy="13">Ильича</tspan>
                                </text>
                                <text data-id={'Shosse_Entuziastov_8'} x="1122" y="665" className="ic">Шоссе Энтузиастов
                                </text>
                                <text data-id={'Perovo'} x="1152" y="635">Перово</text>
                                <text data-id={'Novogireevo'} x="1182" y="605">Новогиреево</text>
                                <text data-id={'Novokosino'} x="1212" y="575">Новокосино</text>
                            </g>
                            <g id="route9_stname">
                                <text data-id={"Altufyevo"} x="699" y="22">Алтуфьево</text>
                                <text data-id={"Bibirevo"} x="699" y="57">Бибирево</text>
                                <text data-id={"Otradnoye"} x="684" y="95">Отрадное</text>
                                <text data-id={"Vladykino_9"} x="650" y="127" className="ic">Владыкино</text>
                                <text data-id={"Petrovsko-Razumovskaya_9"} x="618" y="155"
                                      className="ic">Петровско-Разумовская
                                </text>
                                <text data-id={"Timiryazevskaya"} x="563" y="197" className="end ic">Тимирязевская
                                </text>
                                <g className="ic r9">
                                    <text data-id={"Mendeleyevskaya"} x="583" y="297">Менделеевская</text>
                                    <text data-id={"Tsvetnoy_Bulvar"} x="664" y="406" className="end">Цветной
                                        <tspan data-id={"Tsvetnoy_Bulvar"} x="664" dy="15"> бульвар</tspan>
                                    </text>
                                    <text data-id={"Chekhovskaya"} x="628" y="486">Чеховская</text>
                                    <text data-id={"Serpukhovskaya"} x="774" y="860">Серпуховская</text>
                                </g>
                                <text data-id={"Polyanka"} x="698" y="774" className="end">Полянка</text>
                                <text data-id={"Tulskaya"} x="773" y="895">Тульская</text>
                                <text data-id={"Nagatinskaya"} x="773" y="932" className="ic r9">Нагатинская</text>
                                <text data-id={"Nagornaya"} x="773" y="962">Нагорная</text>
                                <text data-id={"Sevastopolskaya"} x="754" y="1013" className="ic r9 end">Севастопольская
                                </text>
                                <text data-id={"Chertanovskaya"} x="773" y="1081">Чертановская</text>
                                <text data-id={"Yuzhnaya"} x="760" y="1126">Южная</text>
                                <text data-id={"Prazhskaya"} x="735" y="1151">Пражская</text>
                                <text data-id={"Ulitsa_Akademika_Yangelya"} x="705" y="1176">Улица Академика <tspan
                                    x="705"
                                    dy="13">Янгеля</tspan>
                                </text>
                                <text data-id={"Annino"} x="675" y="1211">Аннино</text>
                                <text data-id={"Bulvar_Dmitriya_Donskogo"} x="644" y="1243" className="ic r9">Бульвар
                                    Дмитрия Донского
                                </text>
                            </g>
                            <g id="route10_stname">
                                <g className="end x">
                                    <text data-id={'Fiztekh'} x="571" y="-15">Физтех</text>
                                    <text data-id={'Lianozovo'} x="571" y="12">Лианозово</text>
                                    <text data-id={'Ulitsa_800_Letiya_Moskvy'} x="571" y="39">Улица 800-летия Москвы
                                    </text>
                                </g>
                                <text data-id={'Seligerskaya'} x="571" y="66" className="end">Селигерская</text>
                                <text data-id={'Verkhniye_Likhobory'} x="571" y="93" className="end">Верхние Лихоборы
                                </text>
                                <text data-id={'Fonvizinskaya'} x="648" y="177" className="ic r10">Фонвизинская</text>
                                <text data-id={'Butyrskaya'} x="678" y="210">Бутырская</text>
                                <text data-id={'Maryina_Roshcha_10'} x="708" y="245" className="ic">Марьина Роща</text>
                                <text data-id={'Dostoyevskaya'} x="717" y="296">Достоевская</text>
                                <g className="ic r10">
                                    <text data-id={'Trubnaya'} x="718" y="415">Трубная</text>
                                    <text data-id={'Sretensky_Bulvar'} x="823" y="528">Сретенский <tspan
                                        data-id={'Sretensky_Bulvar'} x="834" dy="13">бульвар</tspan></text>
                                    <text data-id={'Rimskaya'} x="1025" y="765">Римская</text>
                                    <text data-id={'Krestyanskaya_Zastava'} x="1025" y="798">Крестьянская <tspan
                                        data-id={'Krestyanskaya_Zastava'} x="1025" dy="13">застава</tspan></text>
                                </g>
                                <text data-id={'Dubrovka_10'} x="1000" y="860" className="end ic">Дубровка</text>
                                <text data-id={'Pechatniki_10'} x="1098" y="945" className="ic">Печатники</text>
                                <text data-id={'Bratislavskaya'} x="1047" y="1080">Братиславская</text>
                                <text data-id={'Marino'} x="1024" y="1109">Марьино</text>
                                <text data-id={'Borisovo'} x="1024" y="1139">Борисово</text>
                                <text data-id={'Shipilovskaya'} x="1024" y="1169">Шипиловская</text>
                                <text data-id={'Zyablikovo'} x="998" y="1209" className="ic r10 end">Зябликово</text>
                            </g>
                            <g id="route11_stname">
                                <text data-id={'Khoroshyovskaya'} x="363" y="414" className="ic r11 end">Хорошёвская
                                </text>
                                <text data-id={'CSKA'} x="442" y="372">ЦСКА</text>
                                <text data-id={'Savyolovskaya_9'} transform="translate(570,249)scale(1,1)"
                                      className="end ic">Савёловская
                                </text>
                                <g className="x">
                                    <g className="ic x">

                                    </g>
                                    <text data-id={'Zyuzino'} x="642" y="1046" className="mid">Зюзино</text>
                                    <text data-id={'Vorontsovskaya'} transform="translate(488,1038)scale(0.95,1)"
                                          className="ic end x">Воронцовская
                                    </text>
                                    <g className="end">
                                        <text data-id={"Aminyevskaya"} x="161"
                                              y="734">Аминьевская
                                        </text>
                                        <text data-id={"Davydkovo"} x="121" y="694">Давыдково</text>
                                    </g>
                                </g>

                                <text data-id={"Kakhovskaya_11"} x="775" y="1047" className="ic x">Каховская</text>
                            </g>
                            <g id="route12_stname">
                                <text data-id={"Bittsevsky_Park"} x="560" y="1175" className="ic r12">Битцевский парк
                                </text>
                                <text data-id={"Lesoparkovaya"} x="574" y="1223" className="end">Лесопарковая</text>
                                <text data-id={"Ulitsa_Starokachalovskaya"} x="625" y="1263" className="ic r12">Улица
                                    Старокачаловская
                                </text>
                                <text data-id={"Ulitsa_Skobelevskaya"} x="584" y="1289">Улица Скобелевская</text>
                                <g className="mid">
                                    <text data-id={"Bulvar_Admirala_Ushakova"} x="514" y="1289">Бульвар Адмирала
                                        <tspan data-id={"Bulvar_Admirala_Ushakova"} x="576" dy="0"></tspan>
                                        <tspan data-id={"Bulvar_Admirala_Ushakova"} x="514" dy="13">Ушакова</tspan>
                                    </text>
                                    <text data-id={"Ulitsa_Gorchakova"} x="434" y="1252">Улица Горчакова</text>
                                    <text data-id={"Buninskaya_Alleya"} x="354" y="1289">Бунинская аллея</text>

                                </g>
                            </g>
                            <g id="route15_stname">
                                <text data-id="Nizhegorodskaya_15" x="1170" y="755" className="ic">Нижегородская</text>
                                <text data-id="Stakhanovskaya" x="1219" y="797">Стахановская</text>
                                <text data-id="Yugo-Vostochnaya" x="1234" y="966" className="end">Юго-Восточная</text>
                                <text data-id="Kosino" x="1294" y="993" className="ic r15">Косино</text>
                                <g className="end">
                                    <text data-id="Ulitsa_Dmitriyevskogo" x="1308" y="1070">Улица
                                        <tspan data-id="Ulitsa_Dmitriyevskogo" x="1308" dy="12"> Дмитриевского</tspan>
                                    </text>
                                    <text data-id="Lukhmanovskaya" x="1308" y="1106">Лухмановская</text>
                                    <text data-id="Nekrasova" x="1308" y="1136">Некрасовка</text>
                                </g>
                            </g>
                            <g id="route16_stname" className="x">
                                <text data-id="Sevastopolski" transform="translate(700,954)scale(0.85,1)"
                                      className="ic mid">Севастопольский
                                    <tspan data-id="Sevastopolski" x="0" dy="13">проспект</tspan>
                                </text>
                                <text data-id="Universitet_Druzhby_Narodov" x="381" y="1056">Университет <tspan
                                    data-id="Universitet_Druzhby_Narodov" x="381" dy="13">Дружбы Народов</tspan></text>
                                <text data-id="Ulitsa_Generala_Tyuleneva"
                                      transform="translate(351,1092)scale(0.95,1)">Улица
                                    Генерала Тюленева
                                </text>
                                <text data-id="Tyutchevskaya" x="321" y="1122">Тютчевская</text>
                                <text data-id="Mamyri" x="291" y="1152">Мамыри</text>
                                <text data-id="Bachurinskaya" x="261" y="1182">Бачуринская</text>

                            </g>
                        </g>
                        <g className="small" id="terminalname">
                            <g id="route14_stname" className="r14_2">

                                <text data-id={"Khoroshyovo_14"} x="360" y="399" className="ic end">Хорошёво</text>
                                <text data-id={"Zorge"} x="375" y="352" className="ic">Зорге</text>
                                <text data-id={"Panfilovskaya"} x="375" y="329" className="ic">Панфиловская</text>
                                <text data-id={"Streshnevo"} x="375" y="295" className="ic">Стрешнево</text>
                                <text data-id={"Koptevo_14"} x="425" y="207">Коптево</text>
                                <text data-id={"Likhobory"} x="485" y="157">Лихоборы</text>
                                <text data-id={"Rostokino"} x="924" y="110">Ростокино</text>
                                <text data-id={"Belokamennaya_14"} x="985" y="158" className="end">Белокаменная</text>
                                <text data-id={"Lokomotiv"} x="1086" y="243" className="ic">Локомотив</text>
                                <text data-id={"Izmaylovo_14"} x="1124" y="418" className="ic">Измайлово</text>
                                <text data-id={"Sokolinaya_Gora_14"} x="1113" y="542">Соколиная Гора</text>
                                <text data-id={"Andronovka_14"} x="1132" y="686">Андроновка</text>
                                <text data-id={"Verkhnie_Kotly"} x="769" y="908" className="ic">Верхние Котлы</text>
                                <text data-id={"Krymskaya"} x="700" y="908" className="mid">Крымская</text>
                                <text data-id={"Ploshchad_Gagarina_14"} x="584" y="882" className="ic end">Площадь
                                    Гагарина
                                </text>
                            </g>
                            <g id="railway_stname">
                                <text data-id={"Leningradsky"} transform="translate(900,390)rotate(-45)">Ленинградский
                                </text>
                                <text data-id={"Yaroslavsky"} transform="translate(920,390)rotate(-45)">Ярославский
                                </text>
                                <text data-id={"Kazansky"} x="938" y="436">Казанский</text>
                                <text data-id={"Kursky"} x="978" y="627">Курский</text>
                                <text data-id={"Kiyevsky_Aeroexpress"} x="410" y="682" className="mid">Киевский</text>
                                <text data-id={"Belorusky_Aeroexpress"} x="478" y="388" className="end">Белорусский
                                </text>
                                <text data-id={"Savyolovsky"} x="608" y="255">Савёловский</text>
                                <text data-id={"Rizhsky"} x="815" y="282" className="end">Рижский</text>
                                <text data-id={"Vostochny"} x="1100" y="230">Восточный</text>
                            </g>
                            <g id="airport_stname">
                                <text data-id={"Sheremetyevo_Station"} x="545" y="-52" className="end">Шереметьево
                                    <tspan data-id={"Sheremetyevo_Station"} x="545" dy="12" className="ic"> SVO</tspan>
                                </text>
                                <text data-id="Vnukovo_Platform" x="87" y="1052">Внуково
                                    <tspan data-id="Vnukovo_Platform" x="87" dy="12" className="ic">VKO</tspan>
                                </text>
                                <text data-id={"Domodedovo_Platform"} x="893" y="1285" className="mid">Домодедово
                                    <tspan data-id={"Domodedovo_Platform"} x="893" dy="12" className="ic">DME</tspan>
                                </text>
                            </g>
                        </g>
                    </g>
                </g>
                <g id="river_name_group" className="rn st">
                    <text transform="translate(1120,1147)rotate(45)">Москва-река</text>
                    <g className="small">
                        <text transform="translate(304,40)rotate(90)">Канал имени Москвы</text>
                        <text transform="translate(905,183)rotate(45)">река Яуза</text>
                    </g>
                </g>

                <g id="linebox_group" transform="translate(30,1340)">
                    <rect x="0" y="0" width="1330" height="350" fill="#fff" stroke="none"/>
                    <clipPath id="clip3">
                        <path d="M 770,0 c -20,0 -20,-20 -40,-20 h -130 c -20,0 -20,20 -40,20"/>
                    </clipPath>


                </g>

            </svg>
        </>
    )
}

export default React.memo(MetroScheme)
