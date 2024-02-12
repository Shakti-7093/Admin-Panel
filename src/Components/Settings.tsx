import React from "react";
import Sidebar from "./Sidebar";
import Profile from "./Settings/Profile";
import { Box, Tab } from "@mui/material";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { ContactPage, VerifiedUserTwoTone } from "@mui/icons-material";
import Contact from "./Settings/Contact";

const Settings: React.FC = () => {
    const [value, setValue] = React.useState('1');

    const handleChange = (event: { preventDefault: () => void; }, newValue: string) => {
        event.preventDefault();
        setValue(newValue);
    };

    return (
        <>
            <Sidebar />
            <div className="container">
                <div className="setting-box">
                    <TabContext value={value}>
                        <Box position='fixed' marginTop={'-450px'} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab label='Profile' value="1" icon={<VerifiedUserTwoTone />} />
                                <Tab label="Contact" value="2" icon={<ContactPage />} />
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            <Profile />
                        </TabPanel>
                        <TabPanel value="2">
                            <Contact />
                        </TabPanel>
                    </TabContext>
                </div>
            </div>
        </>
    );
};

export default Settings;