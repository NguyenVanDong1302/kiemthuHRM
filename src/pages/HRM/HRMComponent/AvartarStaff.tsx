import { ShowError } from 'components/Dialogs/Dialogs'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Avatar, Message, Uploader, toaster } from 'rsuite'
import staff_service from 'services/Staff/staff_service'
import store from 'store/store'
import UploaderCp from './Uploader'
import { v4 as uuid } from 'uuid'

function AvatarStaff({ url, flag }: { url: any, flag: any }) {
    const body = () => {
        if (flag === 'detail') {
            return <Avatar
                style={{ width: "200px", height: "200px" }}
                className="mr-2 avatar-staff"
                circle
                size="lg"
                src={url}
            />
        } else {
            return <UploaderCp url={url} flag='avatar' uuid={uuid()} />
        }
    }
    return (
        <>{body()}</>
    )
}

export default AvatarStaff 
