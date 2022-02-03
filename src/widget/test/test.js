/** @jsxImportSource @emotion/react */
import { Card, Stack, IconButton, Typography, Box } from '@mui/material';
import { css } from "@emotion/react";

const base = css({
    backgroundColor: "#eee",
    fontSize: "20px",
    padding: "15px"
});

export default function Test({ id }) {


    return (
        <Card>
            <Box sx={{ p: 3 }}>

                <div css={base}>
                    {id}
                </div>

            </Box>
        </Card>
    );
}
