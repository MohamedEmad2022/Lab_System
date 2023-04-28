import React, { memo, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetUnitTypes, toggleSelect } from '../store/AdminActions/OrderSlice'
import { isAuthentication } from './isAuthentication'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTooth } from '@fortawesome/free-solid-svg-icons';
import { Col, Row } from 'antd'


const Units = ({edit}) => {

    const dispatch = useDispatch()
    const { selectedTooths, unitTypes } = useSelector(state => state.order)


    const token = isAuthentication().token

    useEffect(()=>{
        dispatch(GetUnitTypes(token))
    },[])



    const select = (id) => {

        dispatch(toggleSelect(id));

    }

    return (
        <>
            <Row>

                <Col style={{ transform: "rotateY(180deg)" }} span={12}>
                    {
                        unitTypes?.filter((unit, index) => {
                            return unit.level === "UPPER" && unit.direction === "RIGHT"
                        }).map((item, index) => (
                            <FontAwesomeIcon className={`tooth ${edit ? "" : "disabled"}`} onClick={() => select(item.id)}
                                key={index} icon={faTooth}
                                style={{ fontSize: `${40 - index * 3}px`, transform: "rotateX(180deg)", color: `${selectedTooths.indexOf(item.id) !== -1 ? "red" : ""}` }} />
                        ))
                    }
                </Col>
                <Col span={12}>
                    {
                        unitTypes?.filter((unit, index) => {
                            return unit.level === "UPPER" && unit.direction === "LEFT"
                        }).map((item, index) => (
                            <FontAwesomeIcon className={`tooth ${edit ? "" : "disabled"}`} onClick={() => select(item.id)}
                                key={index} icon={faTooth}
                                style={{ fontSize: `${40 - index * 3}px`, transform: "rotateX(180deg)", color: `${selectedTooths.indexOf(item.id) !== -1 ? "red" : ""}` }} />
                        ))
                    }
                </Col>

            </Row>
            <Row style={{ marginBottom: "50px" }}>

                <Col style={{ transform: "rotateY(180deg)" }} span={12}>
                    {
                        unitTypes?.filter((unit, index) => {
                            return unit.level === "LOWER" && unit.direction === "RIGHT"
                        }).map((item, index) => (
                            <FontAwesomeIcon className={`tooth ${edit ? "" : "disabled"}`} onClick={() => select(item.id)} key={index} icon={faTooth}
                                style={{ fontSize: `${40 - index * 3}px`, color: `${selectedTooths.indexOf(item.id) !== -1 ? "red" : ""}` }} />
                        ))
                    }
                </Col>
                <Col span={12}>
                    {
                        unitTypes?.filter((unit, index) => {
                            return unit.level === "LOWER" && unit.direction === "LEFT"
                        }).map((item, index) => (
                            <FontAwesomeIcon className={`tooth ${edit ? "" : "disabled"}`} onClick={() => select(item.id)} key={index} icon={faTooth}
                                style={{ fontSize: `${40 - index * 3}px`, color: `${selectedTooths.indexOf(item.id) !== -1 ? "red" : ""}` }} />
                        ))
                    }
                </Col>

            </Row>
        </>
    )
}

export default Units