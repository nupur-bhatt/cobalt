import { Grid, TextField, Button, Container } from '@mui/material';
import "../styles/Login.css";

export default function Login(){

    return(
        <Container className="loginContainer">
            <Grid container direction="column" spacing={2} className="loginGridContainer" >
                <Grid size={{xs:6, md:5, lg:4, xl:4 }}>
                    <TextField id="username" label="Username" variant="standard" fullWidth></TextField>
                </Grid>
                <Grid size={{xs:6, md:5, lg:4, xl:4 }}>
                    <TextField id="password" label="Password" variant="standard" fullWidth></TextField>
                </Grid>
                <Grid size={{xs:6, md:5, lg:4, xl:4 }}>
                    <Button id="login" variant="contained" size="large" fullWidth>Login</Button>
                </Grid>
                
            </Grid>
        </Container>
    );

}