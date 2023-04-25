import { ShowError } from 'components/Dialogs/Dialogs'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Modal, Table } from 'rsuite'
import staff_service from 'services/Staff/staff_service'

function HistStaffList({ uuid }: { uuid: any }) {
  const [open, setOpen] = useState(false)
  const handleClose = () => {
    setOpen(false)
  }
  const [histStaff, setHistStaff] = useState()

  const { StaffCode } = useParams()

  const fetch = async () => {
    const resp = await staff_service.getHistoryStaffHistDate(StaffCode as string);
    if (resp.Success) {
      setHistStaff(resp.Data)
    } else {
      ShowError(resp.ErrorData);
    }
  };

  useEffect(() => {
    fetch();
  }, [StaffCode]);

  useEffect(() => {
    setOpen(true)
  }, [uuid])
  return (
    <>
      <Modal open={open} onClose={handleClose} size='md'>
        <Modal.Header>
          <Modal.Title>Lịch sử nhân viên</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table data={histStaff} width={700}>
            <Table.Column resizable width={120} align="center">
              <Table.HeaderCell>Ngày</Table.HeaderCell>
              <Table.Cell dataKey="HistDate" />
            </Table.Column>
            <Table.Column resizable width={120} align="center">
              <Table.HeaderCell>Trạng thái</Table.HeaderCell>
              <Table.Cell dataKey="StatusDesc" />
            </Table.Column>
            <Table.Column resizable width={150} align="center">
              <Table.HeaderCell>Lý do</Table.HeaderCell>
              <Table.Cell dataKey="ReasonDesc" />
            </Table.Column>
            <Table.Column resizable width={80} align="center">
              <Table.HeaderCell>Thời gian cập nhật</Table.HeaderCell>
              <Table.Cell dataKey="LogLUDTimeUTC" />
            </Table.Column>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} appearance="subtle">
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default HistStaffList
