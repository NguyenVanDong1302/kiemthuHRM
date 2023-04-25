import React from 'react';
import { Nav } from 'rsuite';
import Info_Staff from './DetailStaff/Info_Staff';
import ContractStaff from './ContractStaff/ContractStaff';
import StaffAppoint from './StaffAppoint/StaffAppoint';
import TrainCourse from './TrainCourse/TrainCourse';
import StaffWorkExperience from './StaffWorkExp/StaffWorkExperience';
import RelativeList from './Relative/RelativeList';

const NavTabs = () => {
    const [active, setActive] = React.useState('1');
    const Navbar = ({ active, onSelect, appearance, ...props }: { active: any, onSelect: any, appearance: any }) => {
        return (
            <Nav {...props} activeKey={active} onSelect={onSelect}
                style={{
                    marginBottom: 0,
                    backgroundColor: '#ffffff'
                }}>
                <Nav.Item eventKey="1"> THÔNG TIN CHUNG </Nav.Item>
                <Nav.Item eventKey="2">HỢP ĐỒNG LAO ĐỘNG</Nav.Item>

            </Nav>
        );
    };

    const body = () => {
        if (active == '1') {
            return <>
                <Info_Staff />
                <RelativeList />
            </>
        } else if (active == '2') {
            return <ContractStaff />
        } else if (active == '3') {
            return <StaffAppoint />
        } else if (active == '4') {
            return <TrainCourse />
        } else if (active == '5') {
            return <StaffWorkExperience />
        }
    }
    return (
        <>
            <Navbar appearance="subtle" active={active} onSelect={setActive} />
            {body()}

        </>
    );
};

export default NavTabs