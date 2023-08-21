import { useEffect, useState } from "react";import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import axios from "axios";
import { toast } from "react-toastify";

const AddMedicineToPrescriptionDialogComponent = ({isDialogOpen, handleClickOpenFromFather, handleClickCancelFromFather, handleAddMedicineToPrescriptionFromFather}) => {

    const [allMedicinesState, setAllMedicinesState] = useState([]);
    const [medicineToAddState, setMedicineToAddState] = useState({medicineId: 0, medicineName: "", medicineUnits: 1, isActive: true});
    const unitsEnum = [{qtyChoice: 1},{qtyChoice: 2},{qtyChoice: 3}, {qtyChoice: 4}, {qtyChoice: 5} ];

    const handleClickOpen = () => {
        handleClickOpenFromFather();
    };

    const handleCancel = () => {
        handleClickCancelFromFather();
    };

    const handleAddMedicineToPrescription = () => {
        handleAddMedicineToPrescriptionFromFather(medicineToAddState);
    }

    const handleMedicineNameSelectChange = (ev) =>{
        let newInputState = JSON.parse(JSON.stringify(medicineToAddState));
        newInputState.medicineId = ev.target.value;
        newInputState.medicineName = ev.explicitOriginalTarget.innerText;
        setMedicineToAddState(newInputState);
        console.log(newInputState);
    }

    const handleMedicineUnitsSelectChange = (ev) => {
        let newInputState = JSON.parse(JSON.stringify(medicineToAddState));
        newInputState.medicineUnits = ev.target.value;
        setMedicineToAddState(newInputState);
        console.log(newInputState);
    }

    useEffect(() => {
        (async () => {
        try{
            let {data: allMedicines} = await axios.get("/medicines/");
            setAllMedicinesState(allMedicines);
            let newInputState = JSON.parse(JSON.stringify(medicineToAddState));
            newInputState.medicineName = allMedicines[0].title;
            newInputState.medicineId = allMedicines[0].medicineNumber;
            setMedicineToAddState(newInputState);
        }
        catch(err){
            toast.error("Failed to get medicines");
        }
        })();
        
    }, []);

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add another medicine to prescription
            </Button>
            <Dialog open={isDialogOpen} onClose={handleCancel}>
                <DialogTitle>Add Medicine to Prescription</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    To add a medicine to the prescription, fill in the following
                </DialogContentText>
                <FormControl fullWidth sx={{ mb: 1.5, mt:1.5 }}>
                    <InputLabel id="selectMedicine">Medicine</InputLabel>
                    <Select labelId="medicineLabel"
                            id="MedicineName"
                            value={medicineToAddState.medicineId}
                            label="Medicine Name"
                            onChange={handleMedicineNameSelectChange}
                    >
                        {allMedicinesState.map((med) => (
                            <MenuItem value={med.medicineNumber} name={med.title} key={med._id + Date.now()}>{med.title}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl>
                    <InputLabel id="selectMedicineQty">Amt?</InputLabel>
                    <Select labelId="medicineQtyLbl"
                            id="MedicineUnits"
                            value={medicineToAddState.medicineUnits}
                            label="Units of Medicine"
                            onChange={handleMedicineUnitsSelectChange}
                    >
                        
                        {unitsEnum.map((unitOption) => (
                            <MenuItem value={unitOption.qtyChoice} key={unitOption.qtyChoice + Date.now()}>{unitOption.qtyChoice}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button onClick={handleAddMedicineToPrescription}>Add Medicine to Prescription</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AddMedicineToPrescriptionDialogComponent