import useMediaQuery from '@mui/material/useMediaQuery';

const useResponsiveQueries = () => {
    const xlMatch = useMediaQuery('(min-width:1536px)');
    const lgMatch = useMediaQuery('(min-width:1200px)');
    const mdMatch = useMediaQuery('(min-width:900px)');
    const smMatch = useMediaQuery('(min-width:600px)');
    const xsMatch = useMediaQuery('(min-width:0px)');
    if(xlMatch){
        return 'auto';
    }
    if(lgMatch){
        return 'xl';
    }
    if(mdMatch){
        return 'lg';
    }
    if(smMatch){
        return 'md';
    }
    if(xsMatch){
        return 'sm';
    }
};

export default useResponsiveQueries;