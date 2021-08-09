import { createTheme, makeStyles } from "@material-ui/core";
import { teal, orange } from '@material-ui/core/colors'

const theme = createTheme({
    typography: {
    useNextVariants: true,
    },
    palette: {
        primary: {
        light: '#52c7b8',
        main: '#009688',
        dark: '#00675b',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ffd95b',
        main: '#ffa726',
        dark: '#c77800',
        contrastText: '#000',
      },
        openTitle: teal['700'],
        protectedTitle: orange['700'],
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