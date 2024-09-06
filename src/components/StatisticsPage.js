import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const StatisticsPage = () => {
  const [data, setData] = useState([]);
  const [cuisineStats, setCuisineStats] = useState([]);
  const [ratingStats, setRatingStats] = useState([]);
  const [timeFilter, setTimeFilter] = useState("1w");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://swgy-7c041txo2-manjot-singhs-projects-ccfa2b65.vercel.app/data"
        );
        const result = await response.json();
        const restaurants =
          result.data.success.cards[1].gridWidget.gridElements.infoWithStyle
            .restaurants;

        let filteredRestaurants = [];
        if (timeFilter === "1d") {
          filteredRestaurants = restaurants.slice(0, 5); // Fetch less data
        } else if (timeFilter === "1w") {
          filteredRestaurants = restaurants.slice(0, 10); // Fetch more data
        } else if (timeFilter === "1m") {
          filteredRestaurants = restaurants; // Fetch all data
        }

        setData(filteredRestaurants);

        const cuisineCount = {};
        const ratingCount = { high: 0, mid: 0, low: 0 };

        filteredRestaurants.forEach((restaurant) => {
          restaurant.info.cuisines.forEach((cuisine) => {
            cuisineCount[cuisine] = (cuisineCount[cuisine] || 0) + 1;
          });

          const avgRating = parseFloat(restaurant.info.avgRating);
          if (avgRating >= 4) ratingCount.high += 1;
          else if (avgRating >= 3) ratingCount.mid += 1;
          else ratingCount.low += 1;
        });

        const cuisineStatsData = Object.keys(cuisineCount).map((key) => ({
          name: key,
          value: cuisineCount[key],
        }));
        setCuisineStats(cuisineStatsData);

        setRatingStats([
          { name: "4+ Stars", count: ratingCount.high },
          { name: "3-4 Stars", count: ratingCount.mid },
          { name: "Below 3 Stars", count: ratingCount.low },
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [timeFilter]);

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold mb-4">Statistics</h2>

      {/* Time Selector */}
      <div className="mb-4 flex justify-center">
        <select
          className="p-2 border border-black rounded-md"
          value={timeFilter}
          onChange={(e) => setTimeFilter(e.target.value)}
        >
          <option value="1d">Last 1 day</option>
          <option value="1w">Last 1 week</option>
          <option value="1m">Last 1 month</option>
        </select>
      </div>

      {/* Align Charts Side by Side */}
      <div className="flex justify-center gap-8">
        {/* Pie Chart for Cuisine Distribution */}
        <div className="chart-container">
          <h3 className="text-lg font-bold mb-2">Cuisine Distribution</h3>
          <ResponsiveContainer width={300} height={300}>
            <PieChart>
              <Pie
                data={cuisineStats}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {cuisineStats.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart for Rating Distribution */}
        <div className="chart-container">
          <h3 className="text-lg font-bold mb-2">Ratings Distribution</h3>
          <ResponsiveContainer width={400} height={300}>
            <BarChart data={ratingStats}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;
