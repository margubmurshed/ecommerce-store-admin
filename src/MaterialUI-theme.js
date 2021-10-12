import React from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

const MaterialUITheme = props => {
    const Theme = createTheme({
        palette:{
            primary: {
                main: '#3B82F6'
            },
            warning: {
                main: '#F50C14'
            }
        }
    })
    return (
        <ThemeProvider theme={Theme}>
            {props.children}
        </ThemeProvider>
    )
}

export default MaterialUITheme;
