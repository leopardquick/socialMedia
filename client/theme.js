import { createTheme, makeStyles } from "@material-ui/core";
import { pink } from "@material-ui/core/colors";

const theme = createTheme({
    typography: {
    useNextVariants: true,
    },
    palette: {
    primary: {
    light: '#5c67a3',
    main: '#3f4771',
    dark: '#2e355b',
    contrastText: '#fff',
    },
    secondary: {
    light: '#ff79b0',
    main: '#ff4081',
    dark: '#c60055',
    contrastText: '#000',
    },
    openTitle: '#3f4771',
    protectedTitle: pink['400'],
    type: 'light'
    }
   })

   
const useStyles = makeStyles(theme => ({
    card: {
    maxWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing(5)
    },
    title: {
    padding:`${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
    color: theme.palette.openTitle
    },
    media: {
    minHeight: 400
    },
    textField : {
        minWidth : 300
    },
    content : {
        marginLeft: 150,
        marginRight: 'auto',
        alignItems: 'center',
        padding:`${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
    },
    submit : {
        marginLeft: 280,
        marginRight: 'auto',
        alignItems: 'center',
    }
   }))
   export {theme,useStyles}