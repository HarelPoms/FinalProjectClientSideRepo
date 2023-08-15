import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import MedicineDetailsComponent from "../components/MedicineDetailsComponent"
import {validateEditMedicineParamsSchema} from "../validation/medicineEditValidation";
import LoadingAnimationComponent from "../components/LoadingAnimationComponent";
import { toast } from "react-toastify";

const FullDetailsMedicinePage = () => {
    const [inputState, setInputState] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        (async () => {
            try {
                const errors = validateEditMedicineParamsSchema({ id });
                if (errors) {
                    // there were errors = incorrect id
                    navigate("/");
                    return;
                }
                const { data } = await axios.get("/medicines/" + id);
                let newInputState = {
                ...data,
                };
                if (data.image && data.image.url) {
                newInputState.url = data.image.url;
                } else {
                newInputState.url = "";
                }
                if (data.image && data.image.alt) {
                newInputState.alt = data.image.alt;
                } else {
                newInputState.alt = "";
                }
                delete newInputState.__v;
                delete newInputState.image;
                delete newInputState.likes;
                delete newInputState.user_id;
                delete newInputState.createdAt;
                setInputState(newInputState);
            } catch (err) {
                toast.error("Failed to load card data from server");
            }
            })();
    }, [id]);

    if (!inputState) {
        return <LoadingAnimationComponent />;
    }
    return (
        <MedicineDetailsComponent {...inputState} />
    );
}

export default FullDetailsMedicinePage;