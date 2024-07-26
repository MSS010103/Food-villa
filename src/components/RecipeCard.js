import { img_cdn } from "/src/components/Config";

export const RecipeCard = ({
  name,
  category,
  imgUrl,
  instructions,
  // sla: { lastMileTravelString },
}) => {
  return (
    <div className="card w-52 transition-transform transform hover:scale-110 p-2 m-5 shadow-lg bg-pink-50 border-2 rounded-xl flex flex-col">
      <img
        className="w-full h-48  object-cover mb-2" // Adjust height as needed
        src={
          imgUrl
            ? imgUrl
            : "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmVjaXBlfGVufDB8fDB8fHww"
        }
        alt={name}
      />
      <h2 className="font-bold text-xl">{name}</h2>
      <h3 className="whitespace-normal break-words">{category}</h3>
      {/* <h4>{lastMileTravelString}</h4> */}
    </div>
  );
};
