import { Icon } from '@rsuite/icons'
import Avatar from 'components/Avatar'
import React, { useState } from 'react'
import { BiEditAlt } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import staff_service from 'services/Staff/staff_service'
import store from 'store/store'

function HRMComponent(dataRow: any) {
    dataRow = dataRow.dataRow
    const [data, setData] = useState([])
    const { OrgId } = store.getState().orgInfo
    return (
        <>
            <Avatar
                className="mr-2"
                circle
                src={dataRow.AvatarUrl ? dataRow.AvatarUrl : dataRow.AvatarUrl}
                text={`${dataRow.AvatarUrl ? dataRow.AvatarUrl : dataRow.StaffName
                    }`}
            />
            <Link to={`/${OrgId}/HRM/detail/${dataRow.StaffCode}`}>{dataRow.StaffName}</Link>
        </>
    )
}

export default HRMComponent
