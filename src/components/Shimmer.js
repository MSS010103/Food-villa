const shimmer=()=>{
    return (<div className="restaurant-list flex flex-wrap justify-center gap-x-10 gap-y-6 mt-[105px]">
        {Array(20).fill("").map((e,index)=>  <div key={index} className="shimmer-card h-[200px] w-[200px]
        bg-gray-300"></div>)}
    
    </div>
    );
}
export default shimmer;