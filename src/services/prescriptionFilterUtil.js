import axios from "axios";

const getUserData = async (id) => {
    let {data} = await axios.get("/users/" + id);
    return {currPrescriptionDoctorName: data};
}

const filterPrescriptionsByPatientOrDoctorName = async (data, filter) =>{
    let filterMetTracker = [];
    for(let currPrescription of data){
        let {data:currPrescriptionPatientName} = await axios.get("/users/" + currPrescription.patientId);
        let currPrescriptionDoctorName;

        if(currPrescription.doctorId){
            ({currPrescriptionDoctorName} = await getUserData(currPrescription.doctorId));
            currPrescriptionDoctorName = currPrescriptionDoctorName.name.firstName + " " + currPrescriptionDoctorName.name.lastName;
        }
        else{
            currPrescriptionDoctorName = "";
        }
        currPrescriptionPatientName = currPrescriptionPatientName.name.firstName + " " + currPrescriptionPatientName.name.lastName;
        
        if(currPrescriptionPatientName.startsWith(filter) || currPrescriptionDoctorName.startsWith(filter)) {filterMetTracker.push(true)} else {filterMetTracker.push(false)}
    }
    
    return filterMetTracker;
}

export default filterPrescriptionsByPatientOrDoctorName;