import React, { useState } from 'react'
import FriendRequests from './FriendRequests'
import Requests from './Requests'

import SendIcon from '@mui/icons-material/Send';
import MailIcon from '@mui/icons-material/Mail';

import { Box, Container, Tab, Tabs, Typography } from "@mui/material";


import { capitalCase } from "change-case";


function RequestsPage() {
    const [currentTab, setCurrentTab] = useState("Requests");

    const REQUESTS_TABS = [
        {
            value: "Requests",
            icon: <SendIcon sx={{ fontSize: 30 }} />,
            component: <Requests />,
        },
        {
            value: "Friends_Requests",
            icon: <MailIcon sx={{ fontSize: 30 }} />,
            component: <FriendRequests />,
        },
    ];
    return (
        <Container>
            <Typography variant="h5" gutterBottom>
                Requests
            </Typography>
            <Tabs
                value={currentTab}
                scrollButtons="auto"
                variant="scrollable"
                allowScrollButtonsMobile
                onChange={(e, value) => setCurrentTab(value)}
            >
                {REQUESTS_TABS.map((tab) => (
                    <Tab
                        disableRipple
                        key={tab.value}
                        label={capitalCase(tab.value)}
                        icon={tab.icon}
                        value={tab.value}
                    />
                ))}
            </Tabs>

            <Box sx={{ mb: 5 }} />

            {REQUESTS_TABS.map((tab) => {
                const isMatched = tab.value === currentTab;
                return isMatched && <Box key={tab.value}>{tab.component}</Box>;
            })}
        </Container>
    )
}

export default RequestsPage