import React,{useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import Slider from '@material-ui/core/Slider'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import Button from '@material-ui/core/Button'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
const useStyles = makeStyles((theme) => ({
    root: {
        width: 320,
        backgroundColor: theme.palette.background.paper,
    },
    input: {
        marginRight: 10,
        marginLeft : 6,
        width:80
    },
    rightInput: { marginLeft: 10, marginBottom: 8,width:80 },
    slide: { top: 10 },
    apply: {
        width: '90%',
        position: 'absolute',
        left: 0,
        right: 0,
        marginLeft: 'auto',
        marginRight: 'auto',
        bottom: 30
    },
    reset:{
        width: '90%',
        position: 'absolute',
        left: 0,
        right: 0,
        marginLeft: 'auto',
        marginRight: 'auto',
        bottom: 75
    },
    select:{
       width:'90%',
       margin: '0 auto'
    }
}));
const FilterMenu = (props) => {
    const [value, setValue] = React.useState([0, 500]);
    const [sort, setSort] = React.useState('');
    const [open,setOpen] = React.useState(props.show);
    useEffect(()=>{
        setOpen(props.show)
    })
    const handleInputChange = (inputid) => (event) => {
        
        let val = (inputid===0)?1:0;
        let samp =[]
        samp[val]=value[val];
        samp[inputid]=(event.target.value === '') ? '' : Number(event.target.value)
        setValue(samp);
    };
    const resetFilters =()=>{
        setSort('')
        setValue([0,500])
    }
    const handleBlur = () => {
        if (value < 0) {
            setValue(0);
        } else if (value > 500) {
            setValue(500);
        }
    };
    const applyFilters = () => {
        props.apply(value[0], value[1],sort)
        props.close()
    }
    const toggleDrawer = () => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        props.close()
    }
    

    const handleSelectChange = (event) => {
        setSort(event.target.value);
    };
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const classes = useStyles();
    return (
        <Drawer anchor='right' open={open} onClose={toggleDrawer(false)}>
            <List subheader={<ListSubheader style={{ zIndex: 0 }}>Filters</ListSubheader>} className={classes.root}>
                <Divider />
                <ListSubheader>Price</ListSubheader>
                <ListItem>
                    <div className={classes.pricediv}>
                        <OutlinedInput
                            className={classes.input}
                            value={value[0]}
                            margin="dense"
                            placeholder='Min'
                            onChange={handleInputChange(0)}
                            onBlur={handleBlur}
                            inputProps={{
                                step: 5,
                                min: 0,
                                max: 500,
                                type: 'number',
                                'aria-labelledby': 'input-slider',
                            }}
                        />
                        <Slider className={classes.slide}
                            style={{ width: 100 }}
                            value={value}
                            max={500}
                            onChange={handleChange}
                            valueLabelDisplay='auto'
                            aria-labelledby="range-slider"
                        />
                        <OutlinedInput
                            className={classes.rightInput}
                            value={value[1]}
                            margin="dense"
                            placeholder='Max'
                            onChange={handleInputChange(1)}
                            onBlur={handleBlur}
                            inputProps={{
                                step: 5,
                                min: 0,
                                max: 500,
                                type: 'number',
                                'aria-labelledby': 'input-slider',
                            }}
                        />
                    </div>
                </ListItem><Divider />
                <ListSubheader>Sorting</ListSubheader>
                <ListItem>
                    <FormControl className={classes.select}>
                        <InputLabel id='sort-label' style={{marginLeft:16,top:-4}}>Sort</InputLabel>
                        <Select id="sort"
                            labelId='sort-label'
                            value={sort}
                            variant='outlined'
                            onChange={handleSelectChange}
                            label='Sort'
                        >
                            <MenuItem value={''}>None</MenuItem>
                            <MenuItem value={1}>Price Ascending</MenuItem>
                            <MenuItem value={2}>Price Descending</MenuItem>
                        </Select>
                    </FormControl>
                </ListItem>
            </List>
            <Button className={classes.reset} variant='outlined' color='primary' onClick={resetFilters}>Reset</Button>
            <Button className={classes.apply} variant='contained' color='primary' onClick={applyFilters}>Apply</Button>
        </Drawer>
    )

}

export default React.memo(FilterMenu);