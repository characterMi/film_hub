import { Box, Button, Modal, Typography } from "@mui/material"

const AlertBox = ({ setAlertBox, alertBox, theme }) => {
    const logout = () => {
        localStorage.clear();
        window.location.href = window.location.origin
    }
    return (
        <Modal
            closeAfterTransition
            open={alertBox}
            onClose={() => setAlertBox(false)}
            sx={{
                display: 'flex',
                justifyContent: "center",
                alignItems: 'center'
            }}
        >
            <Box
                sx={{
                    width: 'max-content',
                    p: 2,
                    backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#000',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    translate: "-50% -50%",
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    borderRadius: '10px'
                }}
            >
                <Typography variant="h6">Do you want to logout ?</Typography>
                <Box mt="10px">
                    <Button color={theme.palette.mode === 'light' ? 'primary' : 'error'} onClick={logout}>Yes</Button>
                    <Button color={theme.palette.mode === 'light' ? 'primary' : 'error'} onClick={() => setAlertBox(false)}>No</Button>
                </Box>
            </Box>
        </Modal>
    )
}

export default AlertBox