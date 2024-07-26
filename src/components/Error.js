import { useRouteError } from "react-router-dom";

const Error=()=>{
    const err=useRouteError();
    return(
        <div>
            <h2>You landed to a wrong path</h2>
            <h3>{err.status+":"+err.statusText}</h3>
        </div>
    )
}
export default Error;