import { Box, Modal, Typography } from '@mui/material'

const Trailer = ({ data, openModal, setOpenModal }) => (
    <Modal
        closeAfterTransition
        open={openModal}
        onClose={() => setOpenModal(false)}
        sx={{
            display: 'flex',
            justifyContent: "center",
            alignItems: 'center'
        }}
    >
        {data?.videos?.results?.length > 0
            ? (
                <>
                    <Typography onClick={() => setOpenModal(false)} variant="h3" color="#fff" sx={{ position: 'absolute', top: '1rem', right: '1rem', fontWeight: 'bolder', cursor: 'pointer', p: 2 }}>
                        X
                    </Typography>
                    <Box
                        component="iframe"
                        autoPlay
                        title='Trailer'
                        src={`https://www.youtube.com/embed/${data?.videos?.results[0].key}`}
                        allow="autoplay"
                        sx={{
                            width: '100%',
                            aspectRatio: '16/9',
                            border: 'none',
                            boxShadow: '0 0 30px #000',
                            background: "#000"
                        }}
                    />
                </>
            )
            : (
                <Typography 
                    color="#fff"
                    variant="h4"
                    align="center"
                    sx={{
                        background: '#000',
                        width: '100%',
                        p: 3
                    }}
                >
                    no Trailers yet
                </Typography>
            )
        }
    </Modal>
)

export default Trailer